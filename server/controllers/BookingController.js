const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');
const { sendBookingConfirmationEmail, sendBookingCancellationEmail } = require('../utils/sendEmail');

async function processFlightLeg(flightInput, passengerCounts, existingFlightModel = null) {
    const { flightCode, bookingClass } = flightInput;
    const { adultCount, childCount, infantCount } = passengerCounts;
    const totalPassengers = adultCount + childCount + infantCount;

    const flight = existingFlightModel || await Flight.findOne({ code: flightCode });
    if (!flight) {
        throw new Error(`Không tìm thấy chuyến bay ${flightCode}.`);
    }

    const priceField = `${bookingClass.toLowerCase()}Price`;
    if (flight[priceField] == null) { 
        throw new Error(`Không tìm thấy thông tin giá vé cho hạng ${bookingClass} của chuyến bay ${flightCode} hoặc cấu trúc giá không đúng.`);
    }

    const adultPrice = flight[priceField];
    const childPrice = adultPrice * 0.75; // Assuming child price is 75% of adult
    const infantPrice = adultPrice * 0.10; // Assuming infant price is 10% of adult
    const legTotalPrice = (adultCount * adultPrice) + (childCount * childPrice) + (infantCount * infantPrice);

    const availableSeatsInClass = flight.seats.filter(s => s.class === bookingClass && !s.isBooked);
    if (availableSeatsInClass.length < totalPassengers) {
        throw new Error(`Không đủ ghế trống hạng ${bookingClass} cho chuyến bay ${flightCode}. Chỉ còn ${availableSeatsInClass.length} ghế.`);
    }

    const selectedSeats = availableSeatsInClass.slice(0, totalPassengers);
    const seatNumbersToBook = [];
    selectedSeats.forEach(seat => {
        const flightSeatToUpdate = flight.seats.find(s => s.seatNo === seat.seatNo);
        if (flightSeatToUpdate) {
            flightSeatToUpdate.isBooked = true;
            seatNumbersToBook.push(flightSeatToUpdate.seatNo);
        }
    });

    if (seatNumbersToBook.length !== totalPassengers) {
        throw new Error(`Lỗi hệ thống: Không thể chọn đủ số ghế (${totalPassengers}) cho chuyến bay ${flightCode}. Chỉ chọn được ${seatNumbersToBook.length}.`);
    }

    return {
        flightCode: flight.code,
        seatNo: seatNumbersToBook,
        class: bookingClass,
        price: legTotalPrice,
        departure: flight.from,
        arrival: flight.to,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        updatedFlight: flight 
    };
}

async function unbookFlightLegSeats(flightLegBookingDetails, flightInfoModel) {
    if (flightLegBookingDetails && flightInfoModel && Array.isArray(flightLegBookingDetails.seatNo)) {
        let seatsUpdated = false;
        flightLegBookingDetails.seatNo.forEach(bookedSeatNo => {
            const seatToUnbook = flightInfoModel.seats.find(seat => seat.seatNo === bookedSeatNo);
            if (seatToUnbook) {
                if (seatToUnbook.isBooked) {
                    seatToUnbook.isBooked = false;
                    seatsUpdated = true;
                }
            } else {
                console.warn(`Seat ${bookedSeatNo} for flight ${flightInfoModel.code} (booking leg) not found in flight details.`);
            }
        });
        if (seatsUpdated) {
            await flightInfoModel.save();
        }
        return seatsUpdated;
    }
    return false;
}


class BookingController {
    // [GET] /booking
    async getAllBookings(req, res) {
        try {
            const bookings = await Booking.find().populate('userInfo outboundFlightInfo returnFlightInfo');
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error getting bookings', error: error.message });
        }
    }

    // [GET] /bookings/:id
    async getBookingById(req, res) {
        try {
            const booking = await Booking.findById(req.params.id)
                .populate('userInfo outboundFlightInfo returnFlightInfo');
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ message: 'Error getting booking', error: error.message });
        }
    }

    // [GET] /bookings/user/:userId
    async getBookingsByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const bookings = await Booking.find({ userId })
                .sort({ bookedAt: -1 })
                .populate('userInfo outboundFlightInfo returnFlightInfo');
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error getting bookings for user', error: error.message });
        }
    }

    // [GET] /bookings/flight/:flightCode
    async getBookingsByFlightCode(req, res) {
        try {
            const { flightCode } = req.params;
            const bookings = await Booking.find({
                $or: [
                    { 'outbound.flightCode': flightCode },
                    { 'returnFlight.flightCode': flightCode }
                ]
            }).populate('userInfo outboundFlightInfo returnFlightInfo');

            if (!bookings || bookings.length === 0) {
                return res.status(404).json({ message: 'No bookings found for this flight code' });
            }
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error getting bookings by flight code', error: error.message });
        }
    }

    // [PUT] /bookings/:id
    async updateBooking(req, res) {
        try {
            const bookingId = req.params.id;
            const updates = req.body;

            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            Object.assign(booking, updates);
            const updatedBooking = await booking.save();
            const populatedBooking = await Booking.findById(updatedBooking._id)
                .populate('userInfo outboundFlightInfo returnFlightInfo');

            res.status(200).json(populatedBooking);
        } catch (error) {
            res.status(500).json({ message: 'Error updating booking', error: error.message });
        }
    }

    // [POST] /bookings/book
    async bookTickets(req, res) {
        try {
            const userId = req.user.id; 
            const {
                outbound: outboundInput, // Expected: { flightCode, bookingClass }
                returnFlight: returnInput, // Optional: { flightCode, bookingClass }
                adultCount,
                childCount,
                infantCount
            } = req.body;

            if (!userId || !outboundInput || !outboundInput.flightCode || !outboundInput.bookingClass ||
                adultCount == null || childCount == null || infantCount == null) {
                return res.status(400).json({ message: 'Thiếu thông tin cần thiết để đặt vé (userId, outbound details, passenger counts).' });
            }

            if (adultCount < 0 || childCount < 0 || infantCount < 0) {
                return res.status(400).json({ message: 'Số lượng hành khách không hợp lệ.' });
            }
            const totalPassengers = adultCount + childCount + infantCount;
            if (totalPassengers === 0) {
                return res.status(400).json({ message: 'Phải có ít nhất một hành khách.' });
            }
            if (totalPassengers > 9) { // Example limit
                return res.status(400).json({ message: 'Số lượng hành khách tối đa cho một lần đặt là 9.' });
            }


            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            const passengerCounts = { adultCount, childCount, infantCount };
            let outboundBookingLeg, returnBookingLeg;
            let finalOutboundFlight, finalReturnFlight;

            // Process Outbound Flight
            try {
                const outboundResult = await processFlightLeg(outboundInput, passengerCounts);
                outboundBookingLeg = { ...outboundResult };
                finalOutboundFlight = outboundResult.updatedFlight;
                delete outboundBookingLeg.updatedFlight;
            } catch (error) {
                return res.status(400).json({ message: `Lỗi xử lý chuyến bay đi: ${error.message}` });
            }

            if (returnInput && returnInput.flightCode && returnInput.bookingClass) {
                if (returnInput.flightCode === outboundInput.flightCode) {
                }
                try {
                    const returnResult = await processFlightLeg(returnInput, passengerCounts);
                    returnBookingLeg = { ...returnResult };
                    finalReturnFlight = returnResult.updatedFlight;
                    delete returnBookingLeg.updatedFlight;
                } catch (error) {
                    return res.status(400).json({ message: `Lỗi xử lý chuyến bay về: ${error.message}` });
                }
            }

            const newBookingData = {
                userId,
                outbound: outboundBookingLeg,
                adultCount,
                childCount,
                infantCount,
            };
            if (returnBookingLeg) {
                newBookingData.returnFlight = returnBookingLeg;
            }

            const newBooking = new Booking(newBookingData);
            await newBooking.save();

            await finalOutboundFlight.save();
            if (finalReturnFlight) {
                await finalReturnFlight.save();
            }
            
            const populatedBooking = await Booking.findById(newBooking._id)
                .populate('userInfo outboundFlightInfo returnFlightInfo');

            console.log("email", user.email);
            sendBookingConfirmationEmail(user.email, populatedBooking); 

            res.status(201).json({
                message: 'Đặt vé thành công',
                booking: populatedBooking
            });

        } catch (error) {
            console.error('Lỗi đặt vé:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: 'Lỗi xác thực dữ liệu đặt vé.', error: error.message });
            }
            res.status(500).json({ message: 'Lỗi hệ thống khi đặt vé', error: error.message });
        }
    }

    // [POST] /bookings/fake-booking
    async fakeBooking(req, res) {
        try {
            const userId = req.user.id; 
            const {
                outbound: outboundInput, // Expected: { flightCode, bookingClass }
                returnFlight: returnInput, // Optional: { flightCode, bookingClass }
                adultCount,
                childCount,
                infantCount
            } = req.body;

            if (!userId || !outboundInput || !outboundInput.flightCode || !outboundInput.bookingClass ||
                adultCount == null || childCount == null || infantCount == null) {
                return res.status(400).json({ message: 'Thiếu thông tin cần thiết để đặt vé (userId, outbound details, passenger counts).' });
            }

            if (adultCount < 0 || childCount < 0 || infantCount < 0) {
                return res.status(400).json({ message: 'Số lượng hành khách không hợp lệ.' });
            }
            const totalPassengers = adultCount + childCount + infantCount;
            if (totalPassengers === 0) {
                return res.status(400).json({ message: 'Phải có ít nhất một hành khách.' });
            }
            if (totalPassengers > 9) { // Example limit
                return res.status(400).json({ message: 'Số lượng hành khách tối đa cho một lần đặt là 9.' });
            }


            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            const passengerCounts = { adultCount, childCount, infantCount };
            let outboundBookingLeg, returnBookingLeg;
            let finalOutboundFlight, finalReturnFlight;

            try {
                const outboundResult = await processFlightLeg(outboundInput, passengerCounts);
                outboundBookingLeg = { ...outboundResult };
                finalOutboundFlight = outboundResult.updatedFlight;
                delete outboundBookingLeg.updatedFlight;
            } catch (error) {
                return res.status(400).json({ message: `Lỗi xử lý chuyến bay đi: ${error.message}` });
            }

            if (returnInput && returnInput.flightCode && returnInput.bookingClass) {
                if (returnInput.flightCode === outboundInput.flightCode) {
                }
                try {
                    const returnResult = await processFlightLeg(returnInput, passengerCounts);
                    returnBookingLeg = { ...returnResult };
                    finalReturnFlight = returnResult.updatedFlight;
                    delete returnBookingLeg.updatedFlight;
                } catch (error) {
                    return res.status(400).json({ message: `Lỗi xử lý chuyến bay về: ${error.message}` });
                }
            }

            const newBookingData = {
                userId,
                outbound: outboundBookingLeg,
                adultCount,
                childCount,
                infantCount,
            };
            if (returnBookingLeg) {
                newBookingData.returnFlight = returnBookingLeg;
            }

            const newBooking = new Booking(newBookingData);
            // console.log("newBooking", newBooking);

            res.status(201).json({
                message: 'Đặt vé thành công',
                booking: newBooking
            });

        } catch (error) {
            console.error('Lỗi đặt vé:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: 'Lỗi xác thực dữ liệu đặt vé.', error: error.message });
            }
            res.status(500).json({ message: 'Lỗi hệ thống khi đặt vé', error: error.message });
        }
    }

    // [DELETE] /bookings/cancel/:id
    async cancelBooking(req, res) {
        try {
            const id = req.params.id;
            const booking = await Booking.findById(id)
                .populate('userInfo outboundFlightInfo returnFlightInfo');

            if (!booking) {
                return res.status(404).json({ message: 'Booking not found.' });
            }

            let outboundSeatsFreed = false;
            let returnSeatsFreed = false;

            // Unbook outbound flight seats
            if (booking.outbound && booking.outboundFlightInfo) {
                outboundSeatsFreed = await unbookFlightLegSeats(booking.outbound, booking.outboundFlightInfo);
            } else if (booking.outbound) {
                console.warn(`Outbound flight details for booking ${id} found, but flightInfo (Flight document) could not be populated. Outbound seat statuses might not have been changed if flight was deleted.`);
            }

            // Unbook return flight seats
            if (booking.returnFlight && booking.returnFlightInfo) {
                console.log("returnFlightInfo", booking.returnFlightInfo);
                returnSeatsFreed = await unbookFlightLegSeats(booking.returnFlight, booking.returnFlightInfo);
            } else if (booking.returnFlight) {
                console.warn(`Return flight details for booking ${id} found, but flightInfo (Flight document) could not be populated. Return seat statuses might not have been changed if flight was deleted.`);
            }
            
            if (booking.userInfo) {
                sendBookingCancellationEmail(booking.userInfo.email, booking); // Ensure this email utility is updated
            }

            await Booking.deleteOne({ _id: id });

            res.status(200).json({ 
                message: 'Booking cancelled successfully.',
                outboundSeatsFreed,
                returnSeatsFreed 
            });
        } catch (error) {
            console.error('Error cancelling booking:', error);
            res.status(500).json({ message: 'Error cancelling booking', error: error.message });
        }
    }

    // [GET] /bookings/statistics
    async getBookingStatistics(req, res) {
        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setMonth(endDate.getMonth() - 5); // Last 6 months including current
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);

            endDate.setHours(23, 59, 59, 999);

            const bookings = await Booking.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            });

            const monthlyStatistics = {};

            let tempDate = new Date(startDate);
            while (tempDate <= endDate) {
                const year = tempDate.getFullYear();
                const month = String(tempDate.getMonth() + 1).padStart(2, '0');
                const monthYearKey = `${year}-${month}`;

                if (!monthlyStatistics[monthYearKey]) {
                    monthlyStatistics[monthYearKey] = {
                        month: monthYearKey,
                        totalBookings: 0,
                        totalAdults: 0,
                        totalChildren: 0,
                        totalInfants: 0,
                        classCount: {
                            Economy: 0,
                            Business: 0,
                            First: 0,
                            Premium: 0, // Added Premium
                        },
                    };
                }
                // Move to the first day of the next month
                tempDate.setMonth(tempDate.getMonth() + 1);
                tempDate.setDate(1);
            }


            bookings.forEach(booking => {
                const bookingDate = new Date(booking.createdAt);
                const year = bookingDate.getFullYear();
                const month = String(bookingDate.getMonth() + 1).padStart(2, '0');
                const monthYearKey = `${year}-${month}`;

                if (monthlyStatistics[monthYearKey]) {
                    const stats = monthlyStatistics[monthYearKey];
                    stats.totalBookings++;
                    stats.totalAdults += booking.adultCount || 0;
                    stats.totalChildren += booking.childCount || 0;
                    stats.totalInfants += booking.infantCount || 0;

                    // Statistics based on outbound flight class
                    if (booking.outbound && booking.outbound.bookingClass) {
                        if (stats.classCount.hasOwnProperty(booking.outbound.bookingClass)) {
                            stats.classCount[booking.outbound.bookingClass]++;
                        }
                    }
                }
            });

            const result = Object.values(monthlyStatistics).sort((a, b) => {
                return new Date(a.month + '-01') - new Date(b.month + '-01');
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Lỗi khi lấy thống kê:', error);
            res.status(500).json({ message: 'Lỗi khi lấy thống kê đặt vé', error: error.message });
        }
    }
}

module.exports = new BookingController();