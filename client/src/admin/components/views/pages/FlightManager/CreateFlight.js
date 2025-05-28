import React, { useState } from 'react';
import './CreateFlight.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import flightApiService from '../../../services/FlightApiService';
import { Alert } from 'react-bootstrap'; // sử dụng Alert của bootstrap

const CreateFlight = () => {
    const [formData, setFormData] = useState({
        code: '',
        aircraft: '',
        airline: '', 
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await flightApiService.createFlight(formData);
            setSuccessMessage('Tạo chuyến bay thành công!');
            setFormData({
                code: '',
                aircraft: '',
                airline: '', // Reset airline
                from: '',
                to: '',
                departureTime: '',
                arrivalTime: '',
            });
            window.location.href = `flights`;
        } catch (error) {
            console.error(error);
            setErrorMessage('Tạo chuyến bay thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">Tạo chuyến bay</p>
                </div>

                {/* Hiển thị thông báo thành công hoặc thất bại */}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Mã chuyến bay</label>
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mã máy bay</label>
                        <input
                            type="text"
                            name="aircraft"
                            className="form-control"
                            value={formData.aircraft}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3"> 
                        <label className="form-label">Hãng hàng không</label>
                        <input
                            type="text"
                            name="airline"
                            className="form-control"
                            value={formData.airline}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Điểm đi</label>
                        <input
                            type="text"
                            name="from"
                            className="form-control"
                            value={formData.from}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Điểm đến</label>
                        <input
                            type="text"
                            name="to"
                            className="form-control"
                            value={formData.to}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Thời gian khởi hành</label>
                        <input
                            type="datetime-local"
                            name="departureTime"
                            className="form-control"
                            value={formData.departureTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Thời gian đến</label>
                        <input
                            type="datetime-local"
                            name="arrivalTime"
                            className="form-control"
                            value={formData.arrivalTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-dark w-100">
                        Tạo chuyến bay
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateFlight;
