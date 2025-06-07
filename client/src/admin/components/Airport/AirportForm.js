import React from 'react';
import './AirportForm.css'; 

const AirportForm = ({ formData, handleChange, handleSubmit, isCodeEditMode = false, submitButtonText, formTitle, formSubtitle }) => {
    return (
        <div className="form-container">
            <div className="text-center mb-4">
                <h2 className="form-title">{formTitle}</h2>
                <p className="form-subtitle">{formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                        <label className="form-label">Mã IATA</label>
                        <input
                            type="text"
                            name="IATACode"
                            className="form-control"
                            value={formData.IATACode || ''}
                            onChange={handleChange}
                            required
                            disabled={isCodeEditMode}
                        />
                    </div>

                <div className="mb-3">
                    <label className="form-label">Tên sân bay</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name || ''}
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
                        value={formData.city || ''}
                        onChange={handleChange}
                        required
                        placeholder="Hà Nội"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Quốc gia</label>
                    <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={formData.country || ''}
                        onChange={handleChange}
                        required
                        placeholder="Việt Nam"
                    />
                </div>

                <button type="submit" className={`btn ${isCodeEditMode ? 'btn-primary' : 'btn-dark'} w-100`}>
                    {submitButtonText}
                </button>
            </form>
        </div>
    );
};

export default AirportForm;
