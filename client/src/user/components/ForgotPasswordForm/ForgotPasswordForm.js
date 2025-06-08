import React from 'react';
import userApiService from '../../../services/UserApiService';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import './ForgotPasswordForm.css'; 


function ForgotPasswordForm() {
    const [form, setForm] = React.useState({
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log('handleChange', e.target);
        const { name, value } = e.target;
        console.log(name, value);
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        try {
            const response = await userApiService.forgotPassword(form);
            console.log('Email sent successfully:', response.data);
            alert('Email đã được gửi thành công! Vui lòng kiểm tra hộp thư của bạn.');
            navigate(`/otp-auth`, { state: { email: form.email } });
        } catch (error) {
            console.error('Error sending email:', error.response?.data || error.message);
            alert('Lỗi gửi email. Vui lòng thử lại.');
        }
    }

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit} className="login-form text-center p-5 rounded">
                <div className="logo mb-3">🔑</div> 
                <h2 className="mb-1 fw-bold">Quên mật khẩu</h2>
                <p className="mb-4 text-muted">Nhập email để lấy lại mật khẩu</p>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="ten@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-pill py-2 px-3"
                        required
                    />
                </Form.Group>

                <Button type="submit" className="w-100 btn-dark rounded-pill py-2 fw-bold">
                    Quên mật khẩu
                </Button>

                <div className="mt-3">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/login'); 
                        }}
                        style={{ fontSize: '0.9rem' }}
                    >
                        Quay lại Đăng nhập
                    </a>
                </div>
            </Form>
        </Container>
    );
}

export default ForgotPasswordForm;