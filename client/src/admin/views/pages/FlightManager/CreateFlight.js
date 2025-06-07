import React, { useState } from 'react';
import './CreateFlight.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import flightApiService from '../../../../services/FlightApiService';
import { useNavigate } from 'react-router-dom';
import FlightForm from '../../../components/Flight/FlightForm';

const CreateFlight = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateSubmit = async (formDataFromChild) => {
        setSuccessMessage('');
        setErrorMessage('');

        const payload = {
            ...formDataFromChild,
            departureTime: formDataFromChild.departureTime ? new Date(formDataFromChild.departureTime).toISOString() : null,
            arrivalTime: formDataFromChild.arrivalTime ? new Date(formDataFromChild.arrivalTime).toISOString() : null,
        };

        try {
            await flightApiService.createFlight(payload);
            setSuccessMessage('Tạo chuyến bay thành công!');
            setTimeout(() => navigate('/admin/flights'), 1500);
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || error.message || 'Tạo chuyến bay thất bại. Vui lòng thử lại.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <>
            <Header />
            <FlightForm 
                subTitle="Tạo chuyến bay mới"
                onFormSubmit={handleCreateSubmit}
                submitButtonText="Tạo chuyến bay"
                alertSuccess={successMessage}
                alertError={errorMessage}
            />
            <Footer />
        </>
    );
};

export default CreateFlight;
