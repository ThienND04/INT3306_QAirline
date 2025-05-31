import React, { useEffect, useState } from 'react';
import flightApiService from '../../../../services/FlightApiService';
import './FlightsManager.css'; // Reuse existing CSS
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function DeletedFlightsManager() {
    const [deletedFlights, setDeletedFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeletedFlights();
    }, []);

    const fetchDeletedFlights = async () => {
        try {
            const data = await flightApiService.getDeletedFlights();
            setDeletedFlights(data);
        } catch (err) {
            console.error("Lỗi khi tải chuyến bay đã xóa:", err);
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
                                        <td>{flight.from}</td>
                                        <td>{flight.to}</td>
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
