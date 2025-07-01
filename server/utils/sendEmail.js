const nodemailer = require('nodemailer');

async function sendOtpEmail(toEmail, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Hỗ trợ người dùng" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Mã xác thực đặt lại mật khẩu',
        text: `Xin chào,
      
            Bạn (hoặc ai đó) vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình.
            
            Mã xác thực (OTP) của bạn là: ${otp}
            
            Mã này có hiệu lực trong vòng 10 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.
            
            Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.
            
            Trân trọng,
            Đội ngũ hỗ trợ`,
    };

    await transporter.sendMail(mailOptions);
}

async function sendBookingConfirmationEmail(toEmail, bookingDetails) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let flightDetailsText = `
            CHI TIẾT CHUYẾN BAY ĐI:
            Mã chuyến bay: ${bookingDetails.outbound.flightCode}
            Hành trình: Từ ${bookingDetails.outbound.departure} đến ${bookingDetails.outbound.arrival}
            Thời gian khởi hành: ${new Date(bookingDetails.outbound.departureTime).toLocaleString('vi-VN')}
            Thời gian đến: ${new Date(bookingDetails.outbound.arrivalTime).toLocaleString('vi-VN')}
            Số ghế: ${Array.isArray(bookingDetails.outbound.seatNo) ? bookingDetails.outbound.seatNo.join(', ') : bookingDetails.outbound.seatNo}
            Hạng vé: ${bookingDetails.outbound.bookingClass}
            Giá vé chiều đi: ${bookingDetails.outbound.price.toLocaleString('vi-VN')} VND
    `;

    let totalPrice = bookingDetails.outbound.price;

    if (bookingDetails.returnFlight && bookingDetails.returnFlight.flightCode) {
        flightDetailsText += `

            CHI TIẾT CHUYẾN BAY VỀ:
            Mã chuyến bay: ${bookingDetails.returnFlight.flightCode}
            Hành trình: Từ ${bookingDetails.returnFlight.departure} đến ${bookingDetails.returnFlight.arrival}
            Thời gian khởi hành: ${new Date(bookingDetails.returnFlight.departureTime).toLocaleString('vi-VN')}
            Thời gian đến: ${new Date(bookingDetails.returnFlight.arrivalTime).toLocaleString('vi-VN')}
            Số ghế: ${Array.isArray(bookingDetails.returnFlight.seatNo) ? bookingDetails.returnFlight.seatNo.join(', ') : bookingDetails.returnFlight.seatNo}
            Hạng vé: ${bookingDetails.returnFlight.bookingClass}
            Giá vé chiều về: ${bookingDetails.returnFlight.price.toLocaleString('vi-VN')} VND
        `;
        totalPrice += bookingDetails.returnFlight.price;
    }

    const mailOptions = {
        from: `"Xác nhận đặt vé" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Xác nhận đặt vé thành công',
        text: `Xin chào,

            Cảm ơn bạn đã đặt vé với QAirline. Dưới đây là chi tiết đặt vé của bạn:

            Mã đặt vé: ${bookingDetails._id}
            ${flightDetailsText}

            Tổng giá vé: ${totalPrice.toLocaleString('vi-VN')} VND
            Số lượng hành khách:
              - Người lớn: ${bookingDetails.adultCount}
              - Trẻ em: ${bookingDetails.childCount}
              - Em bé: ${bookingDetails.infantCount}

            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.

            Chúc bạn có một chuyến bay tốt đẹp!

            Trân trọng,
            Đội ngũ QAirline`,
    };

    await transporter.sendMail(mailOptions);
}

async function sendBookingCancellationEmail(toEmail, bookingDetails) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let flightDetailsText = `
            CHI TIẾT CHUYẾN BAY ĐI ĐÃ HỦY:
            Mã chuyến bay: ${bookingDetails.outbound.flightCode}
            Hành trình: Từ ${bookingDetails.outbound.departure} đến ${bookingDetails.outbound.arrival}
            Thời gian khởi hành: ${new Date(bookingDetails.outbound.departureTime).toLocaleString('vi-VN')}
    `;

    if (bookingDetails.returnFlight && bookingDetails.returnFlight.flightCode) {
        flightDetailsText += `

            CHI TIẾT CHUYẾN BAY VỀ ĐÃ HỦY:
            Mã chuyến bay: ${bookingDetails.returnFlight.flightCode}
            Hành trình: Từ ${bookingDetails.returnFlight.departure} đến ${bookingDetails.returnFlight.arrival}
            Thời gian khởi hành: ${new Date(bookingDetails.returnFlight.departureTime).toLocaleString('vi-VN')}
        `;
    }

    const mailOptions = {
        from: `"Thông báo hủy vé" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Thông báo hủy đặt vé thành công',
        text: `Xin chào,

            Chúng tôi xác nhận yêu cầu hủy đặt vé của bạn đã được xử lý thành công.

            Dưới đây là chi tiết vé đã hủy:
            Mã đặt vé: ${bookingDetails._id}
            ${flightDetailsText}

            Nếu bạn không thực hiện yêu cầu hủy vé này hoặc có bất kỳ thắc mắc nào, vui lòng liên hệ ngay với bộ phận hỗ trợ của chúng tôi.

            Trân trọng,
            Đội ngũ QAirline`,
    };

    await transporter.sendMail(mailOptions);
}

async function sendFlightDelayNotificationEmail(toEmail, delayDetails) {
    console.log('Sending flight delay notification email to:', toEmail);
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Thông báo thay đổi lịch bay" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `Thông báo về việc thay đổi lịch bay cho chuyến bay ${delayDetails.flightNo}`,
        text: `Xin chào,

Chúng tôi rất tiếc phải thông báo về sự thay đổi lịch trình của chuyến bay ${delayDetails.flightNo} từ ${delayDetails.departureCity} đến ${delayDetails.arrivalCity}.

Chi tiết thay đổi như sau:
- Thời gian khởi hành dự kiến ban đầu: ${new Date(delayDetails.originalDepartureTime).toLocaleString('vi-VN')}
- Thời gian khởi hành mới: ${new Date(delayDetails.newDepartureTime).toLocaleString('vi-VN')}
- Thời gian đến dự kiến mới: ${new Date(delayDetails.newArrivalTime).toLocaleString('vi-VN')}
- Lý do thay đổi: ${delayDetails.delayReason}

Chúng tôi thành thật xin lỗi vì sự bất tiện này và mong nhận được sự thông cảm của quý khách.
Vui lòng kiểm tra email thường xuyên để cập nhật thông tin mới nhất hoặc liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào.

Trân trọng,
Đội ngũ QAirline`,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendOtpEmail,
    sendBookingConfirmationEmail,
    sendBookingCancellationEmail,
    sendFlightDelayNotificationEmail,
};
