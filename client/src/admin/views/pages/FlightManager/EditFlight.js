import React, { useState, useEffect } from 'react';
import './CreateFlight.css'; // Assuming this CSS is general for flight forms
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import flightApiService from '../../../../services/FlightApiService';
import airportApiService from '../../../../services/AirportApiService'; // For fetching airport names
import { Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import FlightForm from '../../../components/Flight/FlightForm'; // Import FlightForm
import { toDateInputFormat } from '../../../../utils/utils'; // May not be needed here if FlightForm handles it

const EditFlight = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialFlightData, setInitialFlightData] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const flight = await flightApiService.getFlightById(id);
                
                let fromName = flight.from;
                let toName = flight.to;

                try {
                    if (flight.from) {
                        const fromAirport = await airportApiService.getAirportByIATACode(flight.from);
                        if (fromAirport) fromName = `${fromAirport.name} (${fromAirport.IATACode}) - ${fromAirport.city}, ${fromAirport.country}`;
                    }
                    if (flight.to) {
                        const toAirport = await airportApiService.getAirportByIATACode(flight.to);
                        if (toAirport) toName = `${toAirport.name} (${toAirport.IATACode}) - ${toAirport.city}, ${toAirport.country}`;
                    }
                } catch (airportError) {
                    console.warn("Could not fetch full airport names for edit form", airportError);
                    // Fallback to IATA codes is handled by FlightForm if fromName/toName are just IATA
                }

                setInitialFlightData({
                    ...flight,
                    // FlightForm's useEffect will handle formatting for datetime-local inputs
                    // Ensure departureTime and arrivalTime are ISO strings if they exist
                    departureTime: flight.departureTime ? new Date(flight.departureTime).toISOString() : '',
                    arrivalTime: flight.arrivalTime ? new Date(flight.arrivalTime).toISOString() : '',
                    fromName: fromName, // Pass full name if fetched
                    toName: toName,     // Pass full name if fetched
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setErrorMessage('Không thể tải dữ liệu chuyến bay.');
                setIsLoading(false);
            }
        };

        fetchFlightDetails();
    }, [id]);

    const handleEditSubmit = async (formDataFromChild) => {
        setSuccessMessage('');
        setErrorMessage('');

        // Ensure departureTime and arrivalTime are ISO strings if they are part of formDataFromChild
        const payload = {
            ...formDataFromChild,
            departureTime: formDataFromChild.departureTime ? new Date(formDataFromChild.departureTime).toISOString() : null,
            arrivalTime: formDataFromChild.arrivalTime ? new Date(formDataFromChild.arrivalTime).toISOString() : null,
        };
        
        // The code field is disabled in FlightForm, so it won't be in formDataFromChild if not explicitly handled.
        // However, FlightForm's formData state includes 'code' initialized from initialData.
        // So, formDataFromChild.code should be correct.

        try {
            await flightApiService.updateFlight(id, payload);
            setSuccessMessage('Cập nhật chuyến bay thành công!');
            setTimeout(() => navigate('/admin/flights'), 1500); 
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || error.message || 'Cập nhật chuyến bay thất bại. Vui lòng thử lại.';
            setErrorMessage(errorMsg);
        }
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="form-container"><p>Loading flight data...</p></div>
                <Footer />
            </>
        );
    }
    
    if (!initialFlightData && !isLoading) {
         return (
            <>
                <Header />
                <div className="form-container">
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <p>Không tìm thấy dữ liệu chuyến bay.</p>
                </div>
                <Footer />
            </>
        );
    }


    return (
        <>
            <Header />
            {initialFlightData && (
                <FlightForm
                    subTitle="Chỉnh sửa chuyến bay"
                    initialData={initialFlightData}
                    onFormSubmit={handleEditSubmit}
                    isCodeEditable={false}
                    submitButtonText="Lưu thay đổi"
                    alertSuccess={successMessage}
                    alertError={errorMessage}
                />
            )}
            {!initialFlightData && errorMessage && ( // Show error if initial data failed to load
                 <div className="form-container">
                    <Alert variant="danger">{errorMessage}</Alert>
                 </div>
            )}
            <Footer />
        </>
    );
};

export default EditFlight;
