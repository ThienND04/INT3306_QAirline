import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchResult.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import flightApiService from "../../../services/FlightApiService";

const SearchResult = () => {
  const searchParams = Object.fromEntries(useSearchParams()[0].entries());
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    console.log("Search params:", searchParams);
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    var searchedFlights = await flightApiService.searchFlights(searchParams);
    console.log("Fetched flights:", searchedFlights);

    // searchedFlights = searchedFlights.map(flight => ({
    //     ...flight,
    //     remaining: {
    //         economy: flight.remainingSeats.economy,
    //         premium: flight.remainingSeats.premium,
    //         business: flight.remainingSeats.business,
    //         first: flight.remainingSeats.first
    //     }
    // }));
    setFlights(searchedFlights);
  };

  return (
    <>
      <Header />
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
                <strong>{flight.departure}</strong> ({flight.from}) →{" "}
                <strong>{flight.arrival}</strong> ({flight.to})
              </div>
              <div>
                {flight.duration} · {flight.airline}
              </div>
            </div>

            <div className="fare-options">
              <div className="fare economy">
                <div>Economy</div>
                <div>từ {flight.economyPrice.toLocaleString()} VND</div>
                <div>{flight.remainingSeats.economy} chỗ còn lại</div>
              </div>
              <div className="fare premium">
                <div>Premium</div>
                <div>từ {flight.premiumPrice.toLocaleString()} VND</div>
                <div>{flight.remainingSeats.premium} chỗ còn lại</div>
              </div>
              <div className="fare business">
                <div>Business</div>
                <div>từ {flight.businessPrice.toLocaleString()} VND</div>
                <div>{flight.remainingSeats.business} chỗ còn lại</div>
              </div>
              <div className="fare first">
                <div>First</div>
                <div>từ {flight.firstPrice.toLocaleString()} VND</div>
                <div>{flight.remainingSeats.first} chỗ còn lại</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
