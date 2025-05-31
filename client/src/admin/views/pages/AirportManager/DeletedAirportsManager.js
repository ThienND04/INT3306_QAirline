import React, { useEffect, useState } from 'react';
import airportApiService from '../../../../services/AirportApiService';
import './AirportManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

function DeletedAirportsManager() {
    const [deletedAirports, setDeletedAirports] = useState([]);

    useEffect(() => {
        fetchDeletedAirports();
    }, []);

    const fetchDeletedAirports = async () => {
        try {
            const data = await airportApiService.getDeletedAirports();
            setDeletedAirports(data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách sân bay đã xóa:", err);
        }
    };

    const handleRestore = async (id) => {
        if (window.confirm('Bạn có muốn khôi phục sân bay này không?')) {
            try {
                await airportApiService.restoreAirport(id);
                fetchDeletedAirports();
            } catch (err) {
                console.error("Lỗi khi khôi phục sân bay:", err);
            }
        }
    };

    const handleHardDelete = async (id) => {
        if (window.confirm('Xóa vĩnh viễn sân bay này?')) {
            try {
                await airportApiService.hardDeleteAirport(id);
                fetchDeletedAirports();
            } catch (err) {
                console.error("Lỗi khi xóa vĩnh viễn sân bay:", err);
            }
        }
    };

    return (
        <div className="airport-manager-container">
            <Header />
            <main>
                <section className="airport-manager">
                    <h1>Sân bay đã xóa</h1>
                    <p>Khôi phục hoặc xóa vĩnh viễn sân bay.</p>
                    <div className="actions">
                        <button onClick={() => window.location.href = '/admin/airports'}>Quay lại danh sách</button>
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
                            {deletedAirports.length > 0 ? (deletedAirports.map((airport) => (
                                <tr key={airport._id}>
                                    <td>{airport.airportID}</td>
                                    <td>{airport.name}</td>
                                    <td>{airport.city}</td>
                                    <td>{airport.country}</td>
                                    <td>{airport.IATACode}</td>
                                    <td>
                                        <button onClick={() => handleRestore(airport._id)}>Khôi phục</button>
                                        <button onClick={() => handleHardDelete(airport._id)} className="danger">Xóa vĩnh viễn</button>
                                    </td>
                                </tr>
                            ))) : (
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

export default DeletedAirportsManager;
