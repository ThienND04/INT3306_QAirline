import React, { useState } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import airportApiService from '../../../../services/AirportApiService';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AirportForm from '../../../components/Airport/AirportForm'; 
import '../../../components/Airport/AirportForm.css'; 

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

        const dataToSubmit = { ...formData };
        delete dataToSubmit.airportID; 

        try {
            await airportApiService.createAirport(dataToSubmit);
            setSuccessMessage('Tạo sân bay thành công!');
            setFormData({
                airportID: '',
                name: '',
                city: '',
                country: '',
                IATACode: ''
            });
            setTimeout(() => navigate('/admin/airports'), 1500);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Tạo sân bay thất bại. Mã IATA có thể đã tồn tại hoặc dữ liệu không hợp lệ.');
            }
        }
    };

    return (
        <>
            <Header />
            {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible className="mt-3 mb-0">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible className="mt-3 mb-0">{errorMessage}</Alert>}
            <AirportForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitButtonText="Tạo sân bay"
                formTitle="QAirline"
                formSubtitle="Tạo sân bay mới"
            />
            <Footer />
        </>
    );
};

export default CreateAirport;
