import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import userApiService from '../../../services/UserApiService';
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'

function LoginForm() {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await userApiService.loginUser(form);
            alert('Đăng nhập thành công!');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            alert('Đăng nhập thất bại!');
            console.error('Lỗi đăng nhập:', error);
        }
    }

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit} className="login-form text-center p-5 rounded">
                <div className="logo mb-3">✈️</div>
                <h2 className="mb-1 fw-bold">Đăng nhập QAirline</h2>
                <p className="mb-4 text-muted">Tận hưởng chuyến bay dễ dàng</p>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="name@framer.com"
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-pill py-2 px-3"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                        className="rounded-pill py-2 px-3"
                        required
                    />
                </Form.Group>

                <Button type="submit" className="w-100 btn-dark rounded-pill py-2 fw-bold">
                    Đăng nhập
                </Button>

                <div className="mt-3">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            navigate('/forgot-password')
                        }}
                        style={{ fontSize: '0.9rem' }}
                    >
                        Quên mật khẩu?
                    </a>
                </div>
            </Form>
        </Container>
    )
}

export default LoginForm
