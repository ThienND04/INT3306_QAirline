import React, { useEffect, useState } from 'react';
import flightApiService from '../../../../services/FlightApiService';
import airportApiService from '../../../../services/AirportApiService';
import './FlightsManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

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
                            {flights.length > 0 ? (
                                flights.map(flight => (
                                    <tr key={flight._id}>
                                        <td>{flight.code}</td>
                                        <td>{airportMap[flight.from] || flight.from}</td>
                                        <td>{airportMap[flight.to] || flight.to}</td>
                                        <td>{new Date(flight.departureTime).toLocaleString()}</td>
                                        <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                                        <td>{flight.airline}</td>
                                        <td>
                                            <button onClick={() => navigate(`edit-flight/${flight._id}`)}>Sửa</button>
                                            <button onClick={() => handleDelete(flight._id)} className="danger">Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        Không có chuyến bay nào trong danh sách.
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

export default FlightsManager;
