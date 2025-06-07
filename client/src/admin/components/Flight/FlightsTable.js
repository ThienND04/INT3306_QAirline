import React from 'react';
import './FlightsTable.css';

function FlightsTable({ flights, airportMap, renderActions, noFlightsMessage }) {
    if (!flights || flights.length === 0) {
        return (
            <table className="flights-table">
                <thead>
                    <tr>
                        <th>Mã chuyến</th>
                        <th>Điểm đi</th>
                        <th>Điểm đến</th>
                        <th>Khởi hành</th>
                        <th>Đến nơi</th>
                        <th>Hãng bay</th>
                        <th>Giá vé Phổ thông</th>
                        <th>Giá vé Thương gia</th>
                        <th>Giá vé Hạng nhất</th>
                        <th>Giá vé Phổ thông đặc biệt</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="11" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                            {noFlightsMessage || "Không có dữ liệu chuyến bay."}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table className="flights-table">
            <thead>
                <tr>
                    <th>Mã chuyến</th>
                    <th>Điểm đi</th>
                    <th>Điểm đến</th>
                    <th>Khởi hành</th>
                    <th>Đến nơi</th>
                    <th>Hãng bay</th>
                    <th>Giá vé Phổ thông</th>
                    <th>Giá vé Thương gia</th>
                    <th>Giá vé Hạng nhất</th>
                    <th>Giá vé Phổ thông đặc biệt</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {flights.map(flight => (
                    <tr key={flight._id}>
                        <td>{flight.code}</td>
                        <td>{airportMap[flight.from] || flight.from}</td>
                        <td>{airportMap[flight.to] || flight.to}</td>
                        <td>{new Date(flight.departureTime).toLocaleString()}</td>
                        <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                        <td>{flight.airline}</td>
                        <td>{flight.economyPrice != null ? `${flight.economyPrice.toLocaleString('fr-FR')} VND` : ''}</td>
                        <td>{flight.businessPrice != null ? `${flight.businessPrice.toLocaleString('fr-FR')} VND` : ''}</td>
                        <td>{flight.firstPrice != null ? `${flight.firstPrice.toLocaleString('fr-FR')} VND` : ''}</td>
                        <td>{flight.premiumPrice != null ? `${flight.premiumPrice.toLocaleString('fr-FR')} VND` : ''}</td>
                        <td>{renderActions(flight)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FlightsTable;
