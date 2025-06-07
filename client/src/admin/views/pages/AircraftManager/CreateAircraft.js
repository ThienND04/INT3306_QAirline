import React, { useState } from 'react';
import '../../../components/Aircraft/AircraftForm.css'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import aircraftApiService from '../../../../services/AircraftApiService';
import { useNavigate } from 'react-router-dom';
import AircraftForm from '../../../components/Aircraft/AircraftForm'; 

const CreateAircraft = () => {
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
    const navigate = useNavigate();

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
            await aircraftApiService.createAircraft(formData);
            setSuccessMessage('Tạo máy bay thành công!');
            setFormData({
                aircraftID: '',
                model: '',
                manufacturer: '',
                economyClassSeats: 0,
                businessClassSeats: 0,
                firstClassSeats: 0,
                premiumClassSeats: 0,
                totalSeats: 0,
                rangeInKm: '',
                description: ''
            });
            navigate('/admin/aircrafts');
        } catch (error) {
            console.error(error);
            setErrorMessage('Tạo máy bay thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="text-center mb-4">
                    <h2 className="form-title">QAirline</h2>
                    <p className="form-subtitle">Tạo máy bay mới</p>
                </div>

                <AircraftForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    buttonText="Tạo máy bay"
                />
            </div>
            <Footer />
        </>
    );
};

export default CreateAircraft;
