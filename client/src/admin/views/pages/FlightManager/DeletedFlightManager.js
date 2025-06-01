import React, { useEffect, useState } from 'react';
import flightApiService from '../../../../services/FlightApiService';
import airportApiService from '../../../../services/AirportApiService';
import './FlightsManager.css'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function DeletedFlightsManager() {
    const [deletedFlights, setDeletedFlights] = useState([]);
    const [airportMap, setAirportMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeletedFlights();
    }, []);

    const fetchDeletedFlights = async () => {
        try {
            const [deletedFlightsData, airportsData] = await Promise.all([
                flightApiService.getDeletedFlights(),
                airportApiService.getAllAirports() // Fetch airports
            ]);

            const map = {};
            airportsData.forEach((airport) => {
                map[airport.IATACode] = airport.name;
            });

            setDeletedFlights(deletedFlightsData);
            setAirportMap(map); // Set airportMap
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu:", err);
        }
    };

    const handleRestore = async (id) => {
        if (window.confirm('Khôi phục chuyến bay này?')) {
            try {
                await flightApiService.restoreFlight(id);
                fetchDeletedFlights();
            } catch (err) {
                console.error("Lỗi khi khôi phục chuyến bay:", err);
            }
        }
    };

    const handlePermanentDelete = async (id) => {
        if (window.confirm('Xóa vĩnh viễn chuyến bay này?')) {
            try {
                await flightApiService.hardDeleteFlight(id);
                fetchDeletedFlights();
            } catch (err) {
                console.error("Lỗi khi xóa vĩnh viễn chuyến bay:", err);
            }
        }
    };

    return (
        <div className="flight-manager-container">
            <Header />
            <main>
                <section className="flight-manager">
                    <h1>Thùng rác chuyến bay</h1>
                    <p>Khôi phục hoặc xóa vĩnh viễn các chuyến bay đã bị xóa.</p>
                    <div className="actions">
                        <button onClick={() => navigate(-1)}>Quay lại</button>
                    </div>

                    <table className="flights-table">
                        <thead>
                            <tr>
                                <th>Mã chuyến</th>
                                <th>Điểm đi</th>
                                <th>Điểm đến</th>
                                <th>Khởi hành</th>
                                <th>Đến nơi</th>
                                <th>Hãng bay</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deletedFlights.length > 0 ? (
                                deletedFlights.map(flight => (
                                    <tr key={flight._id}>
                                        <td>{flight.code}</td>
                                        <td>{airportMap[flight.from] || flight.from}</td>
                                        <td>{airportMap[flight.to] || flight.to}</td>
                                        <td>{new Date(flight.departureTime).toLocaleString()}</td>
                                        <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                                        <td>{flight.airline}</td>
                                        <td>
                                            <button onClick={() => handleRestore(flight._id)}>Khôi phục</button>
                                            <button onClick={() => handlePermanentDelete(flight._id)} className="danger">Xóa vĩnh viễn</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        Không có chuyến bay nào trong thùng rác.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default DeletedFlightsManager;
