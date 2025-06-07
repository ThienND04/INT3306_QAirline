import React, { useState, useEffect } from 'react';
import '../../../components/Aircraft/AircraftForm.css'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import aircraftApiService from '../../../../services/AircraftApiService';
import { useParams, useNavigate } from 'react-router-dom';
import AircraftForm from '../../../components/Aircraft/AircraftForm'; 

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

                <AircraftForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    buttonText="Cập nhật máy bay"
                    isEditMode={true}
                />
            </div>
            <Footer />
        </>
    );
};

export default EditAircraft;
