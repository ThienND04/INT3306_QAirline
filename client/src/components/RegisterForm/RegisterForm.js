import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import userApiService  from '../../services/UserApiService';

function RegisterForm() {
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
        birthDate: { day: '', month: '', year: '' },
        nationality: '',
        language: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["day", "month", "year"].includes(name)) {
            setForm({
                ...form,
                birthDate: { ...form.birthDate, [name]: value },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        try {
            const response = userApiService.createUser(form);
            console.log('Đăng ký thành công:', response.data);
            alert('Đăng ký thành công!');
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error.response?.data || error.message);
            alert('Đăng ký thất bại!');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Đăng ký tài khoản QAirline</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <label>Họ</label>
                        <input type="text" className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-4">
                        <label>Tên đệm và tên</label>
                        <input type="text" className="form-control" name="middleAndFirstName" value={form.middleAndFirstName} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <label>Thứ tự hiển thị tên</label>
                        <select className="form-control" name="displayOrder" value={form.displayOrder} onChange={handleChange}>
                            <option value={1}>Họ + Tên đệm và tên</option>
                            <option value={2}>Tên đệm và tên + Họ</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Tên hiển thị</label>
                        <input type="text" className="form-control" name="displayName" value={form.displayName} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Số điện thoại</label>
                        <input type="text" className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Mật khẩu</label>
                        <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Địa chỉ</label>
                        <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <label>Giới tính</label>
                        <select className="form-control" name="gender" value={form.gender} onChange={handleChange}>
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label>Ngày sinh</label>
                        <div className="d-flex">
                            <input type="number" placeholder="Ngày" name="day" className="form-control me-1" value={form.birthDate.day} onChange={handleChange} required />
                            <input type="number" placeholder="Tháng" name="month" className="form-control me-1" value={form.birthDate.month} onChange={handleChange} required />
                            <input type="number" placeholder="Năm" name="year" className="form-control" value={form.birthDate.year} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-3">
                        <label>Quốc tịch</label>
                        <input type="text" className="form-control" name="nationality" value={form.nationality} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <label>Ngôn ngữ</label>
                        <input type="text" className="form-control" name="language" value={form.language} onChange={handleChange} required />
                    </div>
                </div>

                <button className="btn btn-primary mt-4" type="submit">Đăng ký</button>
            </form>
        </div>
    );
}

export default RegisterForm;
