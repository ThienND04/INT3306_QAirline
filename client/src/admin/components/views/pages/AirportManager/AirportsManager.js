import React, { useEffect, useState } from 'react';
import airportApiService from '../../../services/AirportApiService'; // bạn cần tạo service này
import './AirportManager.css'; // bạn có thể dùng chung style với FlightsManager nếu giống nhau
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

function AirportManager() {
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        fetchAirports();
    }, []);

    const fetchAirports = async () => {
        try {
            const data = await airportApiService.getAllAirports();
            setAirports(data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách sân bay:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sân bay này không?')) {
            try {
                await airportApiService.deleteAirport(id);
                fetchAirports();
            } catch (err) {
                console.error("Lỗi khi xóa sân bay:", err);
            }
        }
    };

    return (
        <div className="airport-manager-container">
            <Header />
            <main>
                <section className="airport-manager">
                    <h1>Quản lý sân bay</h1>
                    <p>Thêm, sửa, xóa sân bay trong hệ thống.</p>
                    <div className="actions">
                        <button onClick={() => window.location.href = 'add-airport'}>Thêm sân bay</button>
                    </div>

                    <table className="airports-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sân bay</th>
                                <th>Thành phố</th>
                                <th>Quốc gia</th>
                                <th>Mã IATA</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {airports.map((airport) => (
                                <tr key={airport._id}>
                                    <td>{airport.airportID}</td>
                                    <td>{airport.name}</td>
                                    <td>{airport.city}</td>
                                    <td>{airport.country}</td>
                                    <td>{airport.IATACode}</td>
                                    <td>
                                        <button onClick={() => window.location.href = `edit-airport/${airport._id}`}>Sửa</button>
                                        <button onClick={() => handleDelete(airport._id)} className="danger">Xóa</button>
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

export default AirportManager;
