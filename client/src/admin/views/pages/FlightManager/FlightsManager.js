import React, { useEffect, useState } from 'react';
import flightApiService from '../../../../services/FlightApiService';
import airportApiService from '../../../../services/AirportApiService';
import './FlightsManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import FlightsTable from '../../../components/Flight/FlightsTable'; // Import the new component

function FlightsManager() {
    const [flights, setFlights] = useState([]);
    const [airportMap, setAirportMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const [flightsData, airportsData] = await Promise.all([
                flightApiService.getAllFlights(),
                airportApiService.getAllAirports()
            ]);

            const map = {};
            airportsData.forEach((airport) => {
                map[airport.IATACode] = airport.name;
            });

            setFlights(flightsData);
            setAirportMap(map);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa chuyến bay này không?')) {
            try {
                await flightApiService.deleteFlight(id);
                fetchFlights();
            } catch (err) {
                console.error("Lỗi khi xóa chuyến bay:", err);
            }
        }
    };

    const renderFlightActions = (flight) => (
        <>
            <button onClick={() => navigate(`edit-flight/${flight._id}`)}>Sửa</button>
            <button onClick={() => handleDelete(flight._id)} className="danger">Xóa</button>
        </>
    );

    return (
        <div className="flight-manager-container">
            <Header />
            <main>
                <section className="flight-manager">
                    <h1>Quản lý chuyến bay</h1>
                    <p>Thêm, sửa, xóa chuyến bay trong hệ thống.</p>
                    <div className="actions">
                        <button onClick={() => navigate('add-flight')}>Thêm chuyến bay</button>
                        <button onClick={() => navigate('deleted')}>Thùng rác</button>
                    </div>

                    <FlightsTable
                        flights={flights}
                        airportMap={airportMap}
                        renderActions={renderFlightActions}
                        noFlightsMessage="Không có chuyến bay nào trong danh sách."
                    />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default FlightsManager;
