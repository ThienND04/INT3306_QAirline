import React, { useEffect, useState } from 'react';
import aircraftApiService from '../../../../services/AircraftApiService'; // cần tạo service tương tự
import './AircraftManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function AircraftManager() {
    const [aircrafts, setAircrafts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAircrafts();
    }, []);

    const fetchAircrafts = async () => {
        try {
            const data = await aircraftApiService.getAllAircrafts();
            setAircrafts(data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách máy bay:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa máy bay này không?')) {
            try {
                await aircraftApiService.deleteAircraft(id);
                fetchAircrafts();
            } catch (err) {
                console.error("Lỗi khi xóa máy bay:", err);
            }
        }
    };

    return (
        <div className="aircraft-manager-container">
            <Header />
            <main>
                <section className="aircraft-manager">
                    <h1>Quản lý máy bay</h1>
                    <p>Theo dõi – chỉnh sửa thông tin máy bay.</p>
                    <div className="actions">
                        <button onClick={() => navigate('add-aircraft')}>Thêm máy bay</button>
                        <button onClick={() => navigate('deleted')}>Thùng rác</button>
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
                            {aircrafts.length > 0 ? (
                                aircrafts.map(aircraft => (
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
                                            <button onClick={() => navigate(`edit-aircraft/${aircraft._id}`)}>Sửa</button>
                                            <button onClick={() => handleDelete(aircraft._id)} className="danger">Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        Không có máy bay nào trong danh sách.
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

export default AircraftManager;
