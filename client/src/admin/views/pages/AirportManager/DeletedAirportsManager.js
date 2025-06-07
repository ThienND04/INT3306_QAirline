import React, { useEffect, useState } from 'react';
import airportApiService from '../../../../services/AirportApiService';
import './DeletedAirportsManager.css'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AirportsTable from '../../../components/Airport/AirportsTable';

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

    const tableHeaders = ["Mã IATA", "Tên sân bay", "Thành phố", "Quốc gia", "Hành động"];

    const renderDeletedAirportActions = (airport) => (
        <>
            <button onClick={() => handleRestore(airport._id)}>Khôi phục</button>
            <button onClick={() => handleHardDelete(airport._id)} className="danger">Xóa vĩnh viễn</button>
        </>
    );

    return (
        <div className="airport-manager-container">
            <Header />
            <main>
                <section className="airport-manager"> {/* Consider renaming class if styles diverge significantly */}
                    <h1>Sân bay đã xóa</h1>
                    <p>Khôi phục hoặc xóa vĩnh viễn sân bay.</p>
                    <div className="actions">
                        <button onClick={() => window.location.href = '/admin/airports'}>Quay lại danh sách</button>
                    </div>

                    <AirportsTable
                        airports={deletedAirports}
                        headers={tableHeaders}
                        renderActions={renderDeletedAirportActions}
                        noDataMessage="Không có sân bay nào trong danh sách."
                    />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default DeletedAirportsManager;
