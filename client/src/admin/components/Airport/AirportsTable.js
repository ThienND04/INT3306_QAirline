import React from 'react';
import './AirportsTable.css';

function AirportsTable({ airports, headers, renderActions, noDataMessage }) {
    return (
        <table className="airports-table">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
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
                            <td>{renderActions(airport)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headers.length} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                            {noDataMessage}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default AirportsTable;
