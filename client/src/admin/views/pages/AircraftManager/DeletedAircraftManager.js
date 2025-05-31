import React, { useEffect, useState } from 'react';
import aircraftApiService from '../../../../services/AircraftApiService';
import './DeletedAircraftManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

function DeletedAircraftManager() {
    const [deletedAircrafts, setDeletedAircrafts] = useState([]);

    useEffect(() => {
        fetchDeletedAircrafts();
    }, []);

    const fetchDeletedAircrafts = async () => {
        try {
            const data = await aircraftApiService.getDeletedAircrafts();
            setDeletedAircrafts(data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách máy bay đã xóa:", err);
        }
    };

    const handleRestore = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn khôi phục máy bay này không?')) {
            try {
                await aircraftApiService.restoreAircraft(id);
                fetchDeletedAircrafts();
            } catch (err) {
                console.error("Lỗi khi khôi phục máy bay:", err);
            }
        }
    };

    const handleHardDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn máy bay này không?')) {
            try {
                await aircraftApiService.hardDeleteAircraft(id);
                fetchDeletedAircrafts();
            } catch (err) {
                console.error("Lỗi khi xóa vĩnh viễn máy bay:", err);
            }
        }
    }

    return (
        <div className="deleted-aircraft-container">
            <Header />
            <main>
                <section className="deleted-aircraft">
                    <h1>Máy bay đã xóa</h1>
                    <p>Danh sách các máy bay đã bị xóa.</p>

                    <div className="actions">
                        <button onClick={() => window.location.href = '/admin/aircrafts'}>Quay lại danh sách</button>
                    </div>

                    <table className="aircrafts-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Model</th>
                                <th>Hãng SX</th>
                                <th>Tổng ghế</th>
                                <th>Ghế phổ thông</th>
                                <th>Ghế thương gia</th>
                                <th>Ghế hạng nhất</th>
                                <th>Ghế hạng sang</th>
                                <th>Tầm bay (km)</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deletedAircrafts.length > 0 ? (
                                deletedAircrafts.map(aircraft => (
                                    <tr key={aircraft._id}>
                                        <td>{aircraft.aircraftID}</td>
                                        <td>{aircraft.model}</td>
                                        <td>{aircraft.manufacturer}</td>
                                        <td>{aircraft.economyClassSeats + aircraft.businessClassSeats + aircraft.firstClassSeats + aircraft.premiumClassSeats}</td>
                                        <td>{aircraft.economyClassSeats}</td>
                                        <td>{aircraft.businessClassSeats}</td>
                                        <td>{aircraft.firstClassSeats}</td>
                                        <td>{aircraft.premiumClassSeats}</td>
                                        <td>{aircraft.rangeInKm ?? '—'}</td>
                                        <td>
                                            <button onClick={() => handleRestore(aircraft._id)} className="restore">
                                                Khôi phục
                                            </button>
                                            <button onClick={() => handleHardDelete(aircraft._id)} className="danger">
                                                Xóa vĩnh viễn
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        Không có máy bay nào đã xóa.
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

export default DeletedAircraftManager;
