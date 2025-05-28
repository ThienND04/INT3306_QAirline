import React, { useState, useEffect } from 'react';
import './CreateFlight.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import flightApiService from '../../../services/FlightApiService';
import { Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditFlight = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    // Load dữ liệu chuyến bay cần chỉnh sửa
    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const flight = await flightApiService.getFlightById(id); 
                setFormData({
                    ...flight, 
                    departureTime: flight.departureTime ? new Date(flight.departureTime).toISOString().slice(0, 16) : '',
                    arrivalTime: flight.arrivalTime ? new Date(flight.arrivalTime).toISOString().slice(0, 16) : '',
                });
            } catch (error) {
                console.error(error);
                setErrorMessage('Không thể tải dữ liệu chuyến bay.');
            }
        };

        fetchFlight();
    } , [id]);

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
            await flightApiService.updateFlight(id, formData); // cập nhật chuyến bay
            setSuccessMessage('Cập nhật chuyến bay thành công!');
            setTimeout(() => navigate('/admin/flights'), 1500); 
        } catch (error) {
            console.error(error);
            setErrorMessage('Cập nhật chuyến bay thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">Chỉnh sửa chuyến bay</p>
                </div>

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
                            disabled
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
                        Lưu thay đổi
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default EditFlight;
