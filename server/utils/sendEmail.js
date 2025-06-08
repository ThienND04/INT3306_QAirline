const nodemailer = require('nodemailer');

async function sendOtpEmail (toEmail, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
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
};

async function sendBookingConfirmationEmail (toEmail, bookingDetails) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Xác nhận đặt vé" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Xác nhận đặt vé thành công',
        text: `Xin chào,

            Cảm ơn bạn đã đặt vé với QAirline. Dưới đây là chi tiết đặt vé của bạn:

            Mã đặt vé: ${bookingDetails._id}
            Mã chuyến bay: ${bookingDetails.flightCode}
            Hành trình: Từ ${bookingDetails.departure} đến ${bookingDetails.arrival}
            Thời gian khởi hành: ${new Date(bookingDetails.departureTime).toLocaleString('vi-VN')}
            Thời gian đến: ${new Date(bookingDetails.arrivalTime).toLocaleString('vi-VN')}
            Số ghế: ${Array.isArray(bookingDetails.seatNo) ? bookingDetails.seatNo.join(', ') : bookingDetails.seatNo}
            Hạng vé: ${bookingDetails.class}
            Tổng giá: ${bookingDetails.price.toLocaleString('vi-VN')} VND
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
};

async function sendBookingCancellationEmail (toEmail, bookingDetails) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Thông báo hủy vé" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Thông báo hủy đặt vé thành công',
        text: `Xin chào,

            Chúng tôi rất tiếc phải thông báo rằng đặt vé của bạn đã được hủy thành công theo yêu cầu.

            Dưới đây là chi tiết vé đã hủy:
            Mã đặt vé: ${bookingDetails._id}
            Mã chuyến bay: ${bookingDetails.flightCode}
            Hành trình: Từ ${bookingDetails.departure} đến ${bookingDetails.arrival}
            Thời gian khởi hành: ${new Date(bookingDetails.departureTime).toLocaleString('vi-VN')}

            Nếu bạn không thực hiện yêu cầu hủy vé này hoặc có bất kỳ thắc mắc nào, vui lòng liên hệ ngay với bộ phận hỗ trợ của chúng tôi.

            Trân trọng,
            Đội ngũ QAirline`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {sendOtpEmail, sendBookingConfirmationEmail, sendBookingCancellationEmail};
