import React from 'react'
import { Form, Button } from 'react-bootstrap'
import userApiService from '../../services/UserApiService'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

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
        console.log(form)

        userApiService.loginUser(form)
            .then((response) => {
                console.log('Đăng nhập thành công:', response.data)
                alert('Đăng nhập thành công!')
            })
            .catch((error) => {
                console.error('Lỗi khi đăng nhập:', error.response?.data || error.message)
                alert('Đăng nhập thất bại!')
            })
    }
    return (
        <Form onSubmit={handleSubmit} className="container mt-5">
            <div className="col-md-6">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label>Password</label>
                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mt-2 mb-2">
                <a
                    href="#nothing"
                    style={{ fontSize: '0.9rem' }}
                    onClick={e => {
                        e.preventDefault()
                        navigate('/forgot-password')
                    }}
                >
                    Forgot password?
                </a>
            </div>
            <Button variant="btn btn-primary mt-4" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LoginForm;