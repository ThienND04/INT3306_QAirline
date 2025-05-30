import React from 'react';
import userApiService from '../../services/UserApiService';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


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

        userApiService.forgotPassword(form)
            .then((response) => {
                console.log('Email sent successfully:', response.data);
                alert('Email sent successfully!');
                navigate('/otp-auth');
            })
            .catch((error) => {
                console.error('Error sending email:', error.response?.data || error.message);
                alert('Error sending email!');
            });
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h1 className="mb-4 text-center">Quen mat khau</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;