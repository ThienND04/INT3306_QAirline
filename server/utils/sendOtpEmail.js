const nodemailer = require('nodemailer');

const sendOtpEmail = async (toEmail, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // dùng SSL
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

module.exports = sendOtpEmail;
