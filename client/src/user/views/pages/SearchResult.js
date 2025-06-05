import React from "react";
import "./SearchResult.css";

const flights = [
    {
        id: 1,
        from: "HAN",
        to: "SGN",
        departure: "06:15",
        arrival: "08:25",
        duration: "2h 10m",
        airline: "Bamboo Airways",
        economy: 2127500,
        business: 4914500,
        first: 7150000,
        premium: 3600000,
        remaining: {
            economy: 5,
            business: 2,
            first: 1,
            premium: 3
        }
    }
];

const SearchResult = () => {
    return (
        <div className="search-result-container">
            <div className="date-bar">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`date-item ${i === 5 ? "active" : ""}`}>
                        <div>2.127.500 VND</div>
                        <div>Th {i + 3}</div>
                    </div>
                ))}
            </div>

            {flights.map((flight) => (
                <div key={flight.id} className="flight-card">
                    <div className="flight-info">
                        <div>
                            <strong>{flight.departure}</strong> ({flight.from}) → <strong>{flight.arrival}</strong> ({flight.to})
                        </div>
                        <div>{flight.duration} · {flight.airline}</div>
                    </div>

                    <div className="fare-options">
                        <div className="fare economy">
                            <div>Economy</div>
                            <div>từ {flight.economy.toLocaleString()} VND</div>
                            <div>{flight.remaining.economy} chỗ còn lại</div>
                        </div>
                        <div className="fare premium">
                            <div>Premium</div>
                            <div>từ {flight.premium.toLocaleString()} VND</div>
                            <div>{flight.remaining.premium} chỗ còn lại</div>
                        </div>
                        <div className="fare business">
                            <div>Business</div>
                            <div>từ {flight.business.toLocaleString()} VND</div>
                            <div>{flight.remaining.business} chỗ còn lại</div>
                        </div>
                        <div className="fare first">
                            <div>First</div>
                            <div>từ {flight.first.toLocaleString()} VND</div>
                            <div>{flight.remaining.first} chỗ còn lại</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResult;
