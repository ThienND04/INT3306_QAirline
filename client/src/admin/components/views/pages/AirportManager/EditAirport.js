import React, { useState, useEffect } from 'react';
import './EditAirport.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import airportApiService from '../../../services/AirportApiService';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditAirport = () => {
    const { id } = useParams(); // ID sân bay truyền qua URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        airportID: '',
        name: '',
        city: '',
        country: '',
        IATACode: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAirport = async () => {
            try {
                const airport = await airportApiService.getAirportById(id);
                setFormData(airport);
            } catch (error) {
                console.error(error);
                setErrorMessage('Không thể tải dữ liệu sân bay.');
            }
        };
        fetchAirport();
    }, [id]);

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
            await airportApiService.updateAirport(id, formData);
            setSuccessMessage('Cập nhật sân bay thành công!');
            setTimeout(() => navigate('/admin/airports'), 1500); 
        } catch (error) {
            console.error(error);
            setErrorMessage('Cập nhật sân bay thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">Chỉnh sửa sân bay</p>
                </div>

                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Mã sân bay (không thể thay đổi)</label>
                        <input
                            type="text"
                            name="airportID"
                            className="form-control"
                            value={formData.airportID}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tên sân bay</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Thành phố</label>
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quốc gia</label>
                        <input
                            type="text"
                            name="country"
                            className="form-control"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Mã IATA</label>
                        <input
                            type="text"
                            name="IATACode"
                            className="form-control"
                            value={formData.IATACode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Cập nhật sân bay
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default EditAirport;
