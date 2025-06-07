import React, { useEffect, useState } from 'react';
import aircraftApiService from '../../../../services/AircraftApiService';
import './DeletedAircraftManager.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AircraftsTable from '../../../components/Aircraft/AircraftsTable'; 
import { useNavigate } from 'react-router-dom'; 

function DeletedAircraftManager() {
    const [deletedAircrafts, setDeletedAircrafts] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchDeletedAircrafts();
    }, []);

    const fetchDeletedAircrafts = async () => {
        try {
            const data = await aircraftApiService.getDeletedAircrafts();
            setDeletedAircrafts(data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách máy bay đã xóa:", err);
            setDeletedAircrafts([]);
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
    };

    const renderDeletedAircraftActions = (aircraft) => (
        <>
            <button onClick={() => handleRestore(aircraft._id)} className="restore">
                Khôi phục
            </button>
            <button onClick={() => handleHardDelete(aircraft._id)} className="danger">
                Xóa vĩnh viễn
            </button>
        </>
    );

    return (
        <div className="deleted-aircraft-container">
            <Header />
            <main>
                <section className="deleted-aircraft">
                    <h1>Máy bay đã xóa</h1>
                    <p>Danh sách các máy bay đã bị xóa.</p>

                    <div className="actions">
                        <button onClick={() => navigate('/admin/aircrafts')}>Quay lại danh sách</button>
                    </div>

                    <AircraftsTable
                        aircrafts={deletedAircrafts}
                        renderActions={renderDeletedAircraftActions}
                        noDataMessage="Không có máy bay nào đã xóa."
                    />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default DeletedAircraftManager;
