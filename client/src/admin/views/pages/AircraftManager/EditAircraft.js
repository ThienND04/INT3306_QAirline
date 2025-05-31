import React, { useState, useEffect } from 'react';
import './CreateAircraft.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import aircraftApiService from '../../../../services/AircraftApiService';
import { Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditAircraft = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        aircraftID: '',
        model: '',
        manufacturer: '',
        economyClassSeats: 0,
        businessClassSeats: 0,
        firstClassSeats: 0,
        premiumClassSeats: 0,
        rangeInKm: '',
        description: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAircraft = async () => {
            try {
                const aircraft = await aircraftApiService.getAircraftById(id);
                console.log('Aircraft data loaded:', aircraft);
                setFormData(aircraft);
            } catch (error) {
                console.error(error);
                setErrorMessage('Không thể tải dữ liệu máy bay.');
            }
        };
        fetchAircraft();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name.includes('Seats') || name === 'rangeInKm'  ? Number(value) : value
        }));
        if (name.includes('Seats') || name === 'rangeInKm') {
            e.target.value = value ? Number(value) : 0;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await aircraftApiService.updateAircraft(id, formData);
            setSuccessMessage('Cập nhật máy bay thành công!');
            navigate('/admin/aircrafts');
        } catch (error) {
            console.error(error);
            setErrorMessage('Cập nhật thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">Chỉnh sửa thông tin máy bay</p>
                </div>

                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Mã máy bay</label>
                        <input type="text" name="aircraftID" className="form-control" value={formData.aircraftID} onChange={handleChange} disabled />
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

                    <button type="submit" className="btn btn-dark w-100">Cập nhật máy bay</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default EditAircraft;
