import React, { useEffect, useState } from 'react';
import airportApiService from '../../../../services/AirportApiService';
import './AirportManager.css'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function AirportManager() {
    const [airports, setAirports] = useState([]);
    const navigate = useNavigate();

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
                        <button onClick={() => navigate("add-airport")}>Thêm sân bay</button>
                        <button onClick={() => navigate("deleted")}>Thùng rác</button>
                    </div>

                    <table className="airports-table">
                        <thead>
                            <tr>
                                <th>Mã IATA</th>
                                <th>Tên sân bay</th>
                                <th>Thành phố</th>
                                <th>Quốc gia</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {airports.length > 0 ? (
                                airports.map((airport) => (
                                    <tr key={airport._id}>
                                        <td>{airport.IATACode}</td>
                                        <td>{airport.name}</td>
                                        <td>{airport.city}</td>
                                        <td>{airport.country}</td>
                                        <td>
                                            <button onClick={() => window.location.href = `edit-airport/${airport._id}`}>Sửa</button>
                                            <button onClick={() => handleDelete(airport._id)} className="danger">Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        Không có sân bay nào trong danh sách.
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

export default AirportManager;
