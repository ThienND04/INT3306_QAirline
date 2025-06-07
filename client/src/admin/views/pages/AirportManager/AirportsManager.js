import React, { useEffect, useState } from 'react';
import airportApiService from '../../../../services/AirportApiService';
import './AirportManager.css'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AirportsTable from '../../../components/Airport/AirportsTable'; // Import the new component

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

    const tableHeaders = ["Mã IATA", "Tên sân bay", "Thành phố", "Quốc gia", "Hành động"];

    const renderAirportActions = (airport) => (
        <>
            <button onClick={() => navigate(`edit-airport/${airport._id}`)}>Sửa</button>
            <button onClick={() => handleDelete(airport._id)} className="danger">Xóa</button>
        </>
    );

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

                    <AirportsTable
                        airports={airports}
                        headers={tableHeaders}
                        renderActions={renderAirportActions}
                        noDataMessage="Không có sân bay nào trong danh sách."
                    />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AirportManager;
