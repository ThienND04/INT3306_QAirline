import React, { useEffect, useState } from 'react';
import aircraftApiService from '../../../../services/AircraftApiService'; 
import './AircraftManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AircraftsTable from '../../../components/Aircraft/AircraftsTable'; 

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
            setAircrafts([]); 
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

    const renderAircraftActions = (aircraft) => (
        <>
            <button onClick={() => navigate(`edit-aircraft/${aircraft._id}`)}>Sửa</button>
            <button onClick={() => handleDelete(aircraft._id)} className="danger">Xóa</button>
        </>
    );

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

                    <AircraftsTable
                        aircrafts={aircrafts}
                        renderActions={renderAircraftActions}
                        noDataMessage="Không có máy bay nào trong danh sách."
                    />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AircraftManager;
