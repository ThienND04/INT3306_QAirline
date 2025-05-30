import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import userApiService from '../../../services/UserApiService';
import './RegisterForm.css';

function RegisterForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        lastName: '',
        middleAndFirstName: '',
        displayOrder: 1,
        displayName: '',
        gender: 'Nam',
        birthDateStr: '',
        nationality: '',
        language: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [day, month, year] = form.birthDateStr.split('/');
        const birthDate = { day, month, year };

        try {
            const response = await userApiService.createUser({ ...form, birthDate });
            console.log('Đăng ký thành công:', response.data);
            alert('Đăng ký thành công!');
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error.response?.data || error.message);
            alert('Đăng ký thất bại!');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="container login-container d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="login-form text-center p-5 rounded">
                <div className="logo mb-3">✈️</div>
                <h2 className="mb-1 fw-bold">Đăng ký QAirline</h2>
                <p className="mb-4 text-muted">Trải nghiệm chuyến bay thông minh</p>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control rounded-pill" name="lastName" placeholder="Họ" value={form.lastName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control rounded-pill" name="middleAndFirstName" placeholder="Tên đệm và tên" value={form.middleAndFirstName} onChange={handleChange} required />
                    </div>
                </div>

                <input type="text" className="form-control rounded-pill mb-3" name="displayName" placeholder="Tên hiển thị" value={form.displayName} onChange={handleChange} required />

                <input type="email" className="form-control rounded-pill mb-3" name="email" placeholder="name@framer.com" value={form.email} onChange={handleChange} required />

                <input type="text" className="form-control rounded-pill mb-3" name="phoneNumber" placeholder="Số điện thoại" value={form.phoneNumber} onChange={handleChange} required />

                <input type="password" className="form-control rounded-pill mb-3" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />

                <input type="text" className="form-control rounded-pill mb-3" name="address" placeholder="Địa chỉ" value={form.address} onChange={handleChange} required />

                <select className="form-control rounded-pill mb-3" name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>

                <input type="text" className="form-control rounded-pill mb-3" name="birthDateStr" placeholder="dd/mm/yyyy" value={form.birthDateStr} onChange={handleChange} pattern="\\d{2}/\\d{2}/\\d{4}" required />

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control rounded-pill" name="nationality" placeholder="Quốc tịch" value={form.nationality} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control rounded-pill" name="language" placeholder="Ngôn ngữ" value={form.language} onChange={handleChange} required />
                    </div>
                </div>

                <button className="btn btn-dark w-100 rounded-pill py-2 fw-bold mt-2" type="submit">Đăng ký</button>
                <div className="mt-3">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            navigate('/login')
                        }}
                        style={{ fontSize: '0.9rem' }}
                    >
                        Đăng nhập
                    </a>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
