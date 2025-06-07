import React from 'react';
import './AircraftsTable.css';

function AircraftsTable({ aircrafts, renderActions, noDataMessage = "Không có dữ liệu." }) {
    if (!aircrafts || aircrafts.length === 0) {
        return (
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
                    <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                            {noDataMessage}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
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
                {aircrafts.map(aircraft => (
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
                        <td>{renderActions(aircraft)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AircraftsTable;
