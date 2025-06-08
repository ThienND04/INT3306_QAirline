import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import userApiService from '../../../services/UserApiService';
import './OtpVerificationForm.css';

function OtpVerificationForm() {
    const location = useLocation();
    const email = location.state?.email;
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(120); // đếm ngược từ 120s
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, '');
        if (!value) return;
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (index < 5) inputsRef.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            let newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join('');
        try {
            const response = await userApiService.verifyOtp({ email, otp: code });
            const resetToken = response.resetToken; 
            console.log('OTP verified successfully:', resetToken);
            alert('Xác minh thành công!');
            navigate('/reset-password', { state: { resetToken, email } });
        } catch (error) {
            alert('Mã OTP không hợp lệ hoặc đã hết hạn!');
        }
    };

    const handleResend = async () => {
        if (!email) {
            alert("Không tìm thấy địa chỉ email để gửi lại OTP.");
            return;
        }
        try {
            await userApiService.forgotPassword({ email });
            alert("Mã OTP mới đã được gửi lại vào email của bạn!");
            setTimeLeft(120); // reset lại timer
        } catch (error) {
            alert("Lỗi khi gửi lại mã OTP. Vui lòng thử lại.");
            console.error("Resend OTP error:", error);
        }
    };

    return (
        <div className="otp-container">
            <div className="otp-card">
                <img
                    src="https://www.oclc.org/content/marketing/publish/en_us/trust/security/jcr%3Acontent/hero_area/parsyscolumncontrol_/col0/parsyscolumncontrol/col0/parsyscolumncontrol/col1/image.img.png/1686837674374.png"
                    alt="OTP Verification"
                    className="otp-icon"
                />
                <h4 className="otp-title">XÁC THỰC OTP</h4>
                <p className="otp-instruction">
                    Vui lòng nhập mã số chúng tôi đã gửi cho bạn qua email<br />
                    <strong>{email}</strong><br />
                    Mã xác thực có giá trị trong <strong>{timeLeft}s</strong>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="otp-box"
                                value={digit}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => inputsRef.current[index] = el}
                            />
                        ))}
                    </div>
                    <button type="submit" className="otp-submit">Tiếp tục</button>
                    <div className="otp-resend">
                        Chưa nhận được mã? {" "}
                        {timeLeft === 0 ? (
                            <a href="#" onClick={(e) => { e.preventDefault(); handleResend(); }}>Gửi lại</a>
                        ) : (
                            <span style={{ color: "gray" }}>Chờ {timeLeft}s</span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OtpVerificationForm;
