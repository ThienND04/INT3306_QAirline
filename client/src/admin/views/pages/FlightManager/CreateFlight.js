import React, { useState } from 'react';
import './CreateFlight.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import flightApiService from '../../../../services/FlightApiService';
import airportApiService from '../../../../services/AirportApiService'; // Giả sử bạn có file này
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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

    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);

    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'from') {
            setSearchFrom(value);
            airportApiService.searchAirport(value).then(setFromSuggestions);
        } else if (name === 'to') {
            setSearchTo(value);
            airportApiService.searchAirport(value).then(setToSuggestions);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFromSelect = (airport) => {
        setFormData(prev => ({ ...prev, from: airport.IATACode }));
        setSearchFrom(`${airport.name} - ${airport.city}, ${airport.country}`);
        setFromSuggestions([]);
    };

    const handleToSelect = (airport) => {
        setFormData(prev => ({ ...prev, to: airport.IATACode }));
        setSearchTo(`${airport.name} - ${airport.city}, ${airport.country}`);
        setToSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await flightApiService.createFlight(formData);
            setSuccessMessage('Tạo chuyến bay thành công!');
            navigate('/admin/flights');
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* From Airport */}
                    <div className="mb-3 position-relative">
                        <label className="form-label">Điểm đi</label>
                        <input
                            type="text"
                            name="from"
                            className="form-control"
                            value={searchFrom}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                        />
                        {fromSuggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {fromSuggestions.map((airport) => (
                                    <li key={airport._id} onClick={() => handleFromSelect(airport)}>
                                        {airport.name} ({airport.IATACode}) - {airport.city}, {airport.country}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* To Airport */}
                    <div className="mb-3 position-relative">
                        <label className="form-label">Điểm đến</label>
                        <input
                            type="text"
                            name="to"
                            className="form-control"
                            value={searchTo}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                        />
                        {toSuggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {toSuggestions.map((airport) => (
                                    <li key={airport._id} onClick={() => handleToSelect(airport)}>
                                        {airport.name} ({airport.IATACode}) - {airport.city}, {airport.country}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Thời gian khởi hành</label>
                        <input
                            type="datetime-local"
                            name="departureTime"
                            className="form-control"
                            value={formData.departureTime}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
