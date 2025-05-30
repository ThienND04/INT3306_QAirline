import React, { useEffect, useState } from 'react';
import flightApiService from '../../../../services/FlightApiService';
import './FlightsManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

function FlightsManager() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        const data = await flightApiService.getAllFlights();
        setFlights(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa chuyến bay này không?')) {
            await flightApiService.deleteFlight(id);
            fetchFlights();
        }
    };

    return (
        <div className="flight-manager-container">
            <Header />
            <main>
                <section className="flight-manager">
                    <h1>Quản lý chuyến bay</h1>
                    <p>Theo dõi – chỉnh sửa dễ dàng.</p>
                    <div className="actions">
                        <button onClick={() => window.location.href = 'add-flight'}>Thêm chuyến bay</button>
                    </div>

                    <table className="flights-table">
                        <thead>
                            <tr>
                                <th>Mã chuyến</th>
                                <th>Điểm đi</th>
                                <th>Điểm đến</th>
                                <th>Khởi hành</th>
                                <th>Đến nơi</th>
                                {/* <th>Giá vé</th> */}
                                <th>Hãng bay</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map(flight => (
                                <tr key={flight._id}>
                                    <td>{flight.code}</td>
                                    <td>{flight.from}</td>
                                    <td>{flight.to}</td>
                                    <td>{new Date(flight.departureTime).toLocaleString()}</td>
                                    <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                                    {/* <td>{flight.price.toLocaleString()} VND</td> */}
                                    <td>{flight.airline}</td>
                                    <td>
                                        <button onClick={() => window.location.href = `edit-flight/${flight._id}`}>Sửa</button>
                                        <button onClick={() => handleDelete(flight._id)} className="danger">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default FlightsManager;
