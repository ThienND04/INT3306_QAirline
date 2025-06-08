import React, { useState, useEffect } from 'react';
import './FlightForm.css';
import airportApiService from '../../../services/AirportApiService';
import aircraftApiService from '../../../services/AircraftApiService';
import { Alert } from 'react-bootstrap';
import { toDateInputFormat } from '../../../utils/utils';

const FlightForm = ({
    subTitle = "SubTitle",
    onFormSubmit,
    initialData,
    isCodeEditable = true,
    submitButtonText = "Submit",
    alertSuccess,
    alertError,
}) => {
    const [formData, setFormData] = useState({
        code: '',
        aircraft: '',
        airline: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        economyPrice: '',
        businessPrice: '',
        firstPrice: '',
        premiumPrice: '',
    });

    const [aircraftOptions, setAircraftOptions] = useState([]);

    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);

    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');

    const [departureTimeValue, setDepartureTimeValue] = useState('');
    const [arrivalTimeValue, setArrivalTimeValue] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                code: initialData.code || '',
                aircraft: initialData.aircraft || '',
                airline: initialData.airline || '',
                from: initialData.from || '',
                to: initialData.to || '',
                departureTime: initialData.departureTime || '', // Should be ISO string
                arrivalTime: initialData.arrivalTime || '',     // Should be ISO string
                economyPrice: initialData.economyPrice || '',
                businessPrice: initialData.businessPrice || '',
                firstPrice: initialData.firstPrice || '',
                premiumPrice: initialData.premiumPrice || '',
            });
            setSearchFrom(initialData.fromName || initialData.from || '');
            setSearchTo(initialData.toName || initialData.to || '');
            setDepartureTimeValue(initialData.departureTime ? toDateInputFormat(initialData.departureTime) : '');
            setArrivalTimeValue(initialData.arrivalTime ? toDateInputFormat(initialData.arrivalTime) : '');
        } else {
            setFormData({ code: '', aircraft: '', airline: '', from: '', to: '', departureTime: '', arrivalTime: '', economyPrice: '', businessPrice: '', firstPrice: '', premiumPrice: '' });
            setSearchFrom('');
            setSearchTo('');
            setDepartureTimeValue('');
            setArrivalTimeValue('');
        }
        aircraftApiService.getAllAircrafts().then(data => setAircraftOptions(data)).catch(console.error);
    }, [initialData]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'from') {
            setSearchFrom(value);
            if (value) {
                airportApiService.searchAirport(value).then(setFromSuggestions);
            } else {
                setFromSuggestions([]);
                setFormData(prev => ({ ...prev, from: '' }));
            }
        } else if (name === 'to') {
            setSearchTo(value);
            if (value) {
                airportApiService.searchAirport(value).then(setToSuggestions);
            } else {
                setToSuggestions([]);
                setFormData(prev => ({ ...prev, to: '' }));
            }
        } else if (name === 'departureTime') {
            setDepartureTimeValue(value);
            const date = new Date(value);
            // console.log('Selected departure time:', date.toISOString());
            setFormData(prev => ({ ...prev, departureTime: date.toISOString() }));
        } else if (name === 'arrivalTime') {
            setArrivalTimeValue(value);
            const date = new Date(value);
            setFormData(prev => ({ ...prev, arrivalTime: date.toISOString() }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFromSelect = (airport) => {
        setFormData(prev => ({ ...prev, from: airport.IATACode }));
        setSearchFrom(`${airport.name} (${airport.IATACode}) - ${airport.city}, ${airport.country}`);
        setFromSuggestions([]);
    };

    const handleToSelect = (airport) => {
        setFormData(prev => ({ ...prev, to: airport.IATACode }));
        setSearchTo(`${airport.name} (${airport.IATACode}) - ${airport.city}, ${airport.country}`);
        setToSuggestions([]);
    };

    const handleSubmitInternal = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
    };

    return (
        <>
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">{subTitle}</p>
                </div>

                {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}
                {alertError && <Alert variant="danger">{alertError}</Alert>}

                <form onSubmit={handleSubmitInternal}>
                    <div className="mb-3">
                        <label className="form-label">Mã chuyến bay</label>
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            value={formData.code}
                            onChange={handleInputChange}
                            required
                            disabled={!isCodeEditable}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Máy bay</label>
                        <select
                            name="aircraft"
                            className="form-control"
                            value={formData.aircraft}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Chọn máy bay --</option>
                            {aircraftOptions.map(ac => (
                                <option key={ac._id} value={ac.aircraftID}>
                                    {ac.aircraftID} - {ac.model}
                                </option>
                            ))}
                        </select>
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
                            value={departureTimeValue}
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
                            value={arrivalTimeValue}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Price Fields */}
                    <div className="mb-3">
                        <label className="form-label">Giá vé hạng phổ thông</label>
                        <input
                            type="number"
                            name="economyPrice"
                            className="form-control"
                            value={formData.economyPrice}
                            onChange={handleInputChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Giá vé hạng thương gia</label>
                        <input
                            type="number"
                            name="businessPrice"
                            className="form-control"
                            value={formData.businessPrice}
                            onChange={handleInputChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Giá vé hạng nhất</label>
                        <input
                            type="number"
                            name="firstPrice"
                            className="form-control"
                            value={formData.firstPrice}
                            onChange={handleInputChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Giá vé hạng phổ thông đặc biệt</label>
                        <input
                            type="number"
                            name="premiumPrice"
                            className="form-control"
                            value={formData.premiumPrice}
                            onChange={handleInputChange}
                            required
                            min="0"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark w-100">
                        {submitButtonText}
                    </button>
                </form>
            </div>
        </>
    );
};

export default FlightForm;
