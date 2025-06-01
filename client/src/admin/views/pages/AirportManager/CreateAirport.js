import React, { useState } from 'react';
import './CreateAirport.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import airportApiService from '../../../../services/AirportApiService';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateAirport = () => {
    const [formData, setFormData] = useState({
        airportID: '',
        name: '',
        city: '',
        country: '',
        IATACode: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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
            await airportApiService.createAirport(formData);
            setSuccessMessage('Tạo sân bay thành công!');
            setFormData({
                name: '',
                city: '',
                country: '',
                IATACode: ''
            });
            navigate('/admin/airports');
        } catch (error) {
            console.error(error);
            setErrorMessage('Tạo sân bay thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">Tạo sân bay mới</p>
                </div>

                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="btn btn-dark w-100">
                        Tạo sân bay
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateAirport;
