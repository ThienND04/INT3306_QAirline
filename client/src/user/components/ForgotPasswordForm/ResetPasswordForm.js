import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import userApiService from '../../../services/UserApiService';
import './ResetPasswordForm.css'; 

function ResetPasswordForm() {
    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        try {
            await userApiService.resetPassword({
                resetToken: location.state?.resetToken,
                newPassword: form.password,
            });

            alert('Mật khẩu đã được đặt lại thành công!');
            navigate('/login');
        } catch (error) {
            console.error('Lỗi đặt lại mật khẩu:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit} className="login-form text-center p-5 rounded">
                <div className="logo mb-3">🔒</div>
                <h2 className="mb-1 fw-bold">Đặt lại mật khẩu</h2>
                <p className="mb-4 text-muted">Nhập mật khẩu mới của bạn</p>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Mật khẩu mới"
                        value={form.password}
                        onChange={handleChange}
                        className="rounded-pill py-2 px-3"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận lại mật khẩu"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="rounded-pill py-2 px-3"
                        required
                    />
                </Form.Group>

                <Button type="submit" className="w-100 btn-dark rounded-pill py-2 fw-bold">
                    Xác nhận
                </Button>
            </Form>
        </Container>
    );
}

export default ResetPasswordForm;
