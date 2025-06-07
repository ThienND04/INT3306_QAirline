// controllers/TicketController.js
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

class BookingController {
    // [GET] /booking
    async getAllBookings(req, res) {
        try {
            const tickets = await Booking.find().populate('flightInfo userInfo');
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets', error });
        }
    }

    // [GET] /bookings/:id
    async getBookingById(req, res) {
        try {
            const ticket = await Booking.findById(req.params.id).populate('flightInfo userInfo');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error getting ticket', error: error.message });
        }
    }

    // [GET] /bookings/flight/:flightCode
    async getBookingsByFlightCode(req, res) {
        try {
            const { flightCode } = req.params;
            const tickets = await Booking.find({ flightCode: flightCode }).populate('flightInfo userInfo');

            if (!tickets || tickets.length === 0) {
                return res.status(404).json({ message: 'No tickets found for this flight code' });
            }

            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets by flight code', error: error.message });
        }
    }

    // [PUT] /bookings/:id
    async updateBooking(req, res) {
        try {
            const ticket = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error updating ticket', error });
        }
    }

    // [POST] /bookings/book
    async bookTickets(req, res) {
        try {
            const { 
                flightCode, 
                userId, 
                bookingClass, 
                adultCount, 
                childCount, 
                infantCount 
            } = req.body;

            if (!flightCode || !userId || !bookingClass || 
                adultCount == null || childCount == null || infantCount == null) {
                return res.status(400).json({ message: 'Thiếu thông tin cần thiết để đặt vé.' });
            }

            if (adultCount < 0 || childCount < 0 || infantCount < 0) {
                return res.status(400).json({ message: 'Số lượng hành khách không hợp lệ.' });
            }
            
            const totalPassengers = adultCount + childCount + infantCount;
            if (totalPassengers === 0) {
                return res.status(400).json({ message: 'Phải có ít nhất một hành khách.' });
            }

            const flight = await Flight.findOne({ code: flightCode });
            if (!flight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay.' });
            }

            if (!flight[`${bookingClass.toLowerCase()}Price`]) {
                return res.status(500).json({ message: `Không tìm thấy thông tin giá vé cho hạng ${bookingClass} của chuyến bay này hoặc cấu trúc giá không đúng.` });
            }

            // Calculate total price
            const adultPrice = flight[`${bookingClass.toLowerCase()}Price`];
            const childPrice = adultPrice * 0.75;
            const infantPrice = adultPrice * 0.10;
            const totalPrice = (adultCount * adultPrice) + (childCount * childPrice) + (infantCount * infantPrice);

            console.log('totalPrice:', totalPrice);

            const availableSeatsInClass = flight.seats.filter(s => s.class === bookingClass && !s.isBooked);
            
            if (availableSeatsInClass.length < totalPassengers) {
                return res.status(400).json({ message: `Không đủ ghế trống hạng ${bookingClass} cho ${totalPassengers} hành khách. Chỉ còn ${availableSeatsInClass.length} ghế.` });
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
                console.error("Mismatch in seats booked vs passengers. Rolling back or investigate.");
                return res.status(500).json({ message: 'Lỗi hệ thống: Không thể chọn đủ số ghế.' });
            }

            const newBooking = new Booking({
                flightCode,
                userId,
                seatNo: seatNumbersToBook, 
                class: bookingClass,
                price: totalPrice, 
                departure: flight.from,
                arrival: flight.to,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                adultCount,
                childCount,
                infantCount,
            });

            await newBooking.save();
            await flight.save(); 

            res.status(201).json({
                message: 'Đặt vé thành công',
                ticket: newBooking
            });
        } catch (error) {
            console.error('Lỗi đặt vé:', error);
            if (error.name === 'ValidationError') {
                 return res.status(400).json({ message: 'Lỗi xác thực dữ liệu đặt vé.', error: error.message });
            }
            res.status(500).json({ message: 'Lỗi hệ thống khi đặt vé', error: error.message });
        }
    }

    // [DELETE] /bookings/:id
    async cancelBooking(req, res) {
        try {
            const id = req.params.id;

            const ticket = await Booking.findById(id).populate('flightInfo');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found.' });
            }

            if (ticket.flightInfo && ticket.flightInfo.seats && Array.isArray(ticket.seatNo)) {
                let seatsUpdated = false;
                ticket.seatNo.forEach(bookedSeatNo => {
                    const seatToUnbook = ticket.flightInfo.seats.find(seat => seat.seatNo === bookedSeatNo);
                    if (seatToUnbook) {
                        seatToUnbook.isBooked = false;
                        seatsUpdated = true;
                    } else {
                        console.warn(`Seat ${bookedSeatNo} for ticket ${id} not found in flight ${ticket.flightInfo.code}.`);
                    }
                });
                if (seatsUpdated) {
                    await ticket.flightInfo.save();
                }
            } else {
                console.warn(`Flight info for ticket ${id} not found, or flight was deleted, or seatNo is not an array. Seat statuses not changed.`);
            }

            // await ticket.delete(); // If using mongoose-delete, this will soft delete
            await Booking.deleteOne({ _id: id }); // Or use deleteOne for hard delete


            res.status(200).json({ message: 'Ticket cancelled successfully.' });
        } catch (error) {
            console.error('Error cancelling ticket:', error);
            res.status(500).json({ message: 'Error cancelling ticket', error: error.message });
        }
    }
}

module.exports = new BookingController();