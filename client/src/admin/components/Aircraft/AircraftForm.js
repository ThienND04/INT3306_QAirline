import React from 'react';
import { Alert } from 'react-bootstrap';
import './AircraftForm.css';

const AircraftForm = ({ formData, handleChange, handleSubmit, successMessage, errorMessage, buttonText, isEditMode = false }) => {
    return (
        <form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="mb-3">
                <label className="form-label">Mã máy bay</label>
                <input 
                    type="text" 
                    name="aircraftID" 
                    className="form-control" 
                    value={formData.aircraftID} 
                    onChange={handleChange} 
                    required 
                    disabled={isEditMode} 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Mẫu máy bay</label>
                <input type="text" name="model" className="form-control" value={formData.model} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Hãng sản xuất</label>
                <input type="text" name="manufacturer" className="form-control" value={formData.manufacturer} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Số ghế hạng phổ thông</label>
                <input type="number" name="economyClassSeats" className="form-control" value={formData.economyClassSeats} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Số ghế hạng thương gia</label>
                <input type="number" name="businessClassSeats" className="form-control" value={formData.businessClassSeats} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Số ghế hạng nhất</label>
                <input type="number" name="firstClassSeats" className="form-control" value={formData.firstClassSeats} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Số ghế hạng cao cấp</label>
                <input type="number" name="premiumClassSeats" className="form-control" value={formData.premiumClassSeats} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Tầm bay (km)</label>
                <input type="number" name="rangeInKm" className="form-control" value={formData.rangeInKm} onChange={handleChange} />
            </div>

            <div className="mb-4">
                <label className="form-label">Mô tả</label>
                <textarea name="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn btn-dark w-100">{buttonText}</button>
        </form>
    );
};

export default AircraftForm;
