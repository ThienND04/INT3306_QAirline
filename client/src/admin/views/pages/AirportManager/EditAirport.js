import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import airportApiService from '../../../../services/AirportApiService';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AirportForm from '../../../components/Airport/AirportForm'; 
import '../../../components/Airport/AirportForm.css'; 

const EditAirport = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        airportID: '',
        name: '',
        city: '',
        country: '',
        IATACode: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAirport = async () => {
            try {
                const airport = await airportApiService.getAirportById(id);
                setFormData(airport);
            } catch (error) {
                console.error(error);
                setErrorMessage('Không thể tải dữ liệu sân bay.');
            }
        };
        fetchAirport();
    }, [id]);

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
        const { airportID, ...dataToUpdate } = formData; 


        try {
            await airportApiService.updateAirport(id, dataToUpdate); 
            setSuccessMessage('Cập nhật sân bay thành công!');
            setTimeout(() => navigate('/admin/airports'), 1500); 
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Cập nhật sân bay thất bại. Vui lòng thử lại.');
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
                isCodeEditMode={true}
                submitButtonText="Cập nhật sân bay"
                formTitle="QAirline"
                formSubtitle="Chỉnh sửa sân bay"
            />
            <Footer />
        </>
    );
};

export default EditAirport;
