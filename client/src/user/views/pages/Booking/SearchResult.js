import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchResult.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import flightApiService from "../../../../services/FlightApiService";
import FlightRecap from "../../../components/FlightRecap/FlighRecap";
import DayPriceChart from "../../../components/DayPriceChart/DayPriceChart";

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function calcDuration(departure, arrival) {
  const start = new Date(departure);
  const end = new Date(arrival);
  const diff = Math.max(0, Math.floor((end - start) / 60000)); // minutes
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h}h ${m}min`;
}

function formatPrice(price) {
  if (!price) return "-";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const SearchResult = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(useSearchParams()[0].entries())
  );
  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line
  }, []);

  const fetchFlights = async () => {
    var searchedFlights = await flightApiService.searchFlights(searchParams);
    setFlights(searchedFlights);
  };

  const handleDateChange = useCallback((newDate) => {
    setSearchParams((prev) => ({
      ...prev,
      date: newDate,
    }));
    // Không cần fetchFlights ở đây, effect phía trên sẽ tự chạy khi searchParams đổi
  }, []);

  return (
    <>
      <Header />
      <FlightRecap
        from={searchParams.from}
        to={searchParams.to}
        date={searchParams.date}
        passengers={searchParams.adult ? Number(searchParams.adult) : 1}
      />
      <div className="search-bg-banner">
        <div className="search-banner-centerbox">
          <h2 className="search-banner-title">Chọn chuyến bay</h2>
          <div className="search-banner-desc">
            {searchParams.from} đến {searchParams.to}
          </div>
        </div>
      </div>
      <DayPriceChart
        searchParams={searchParams}
        onDateChange={handleDateChange}
      />

      <div className="search-result-container">
        {flights.length === 0 && (
          <div className="flight-empty">Không tìm thấy chuyến bay phù hợp.</div>
        )}
        {flights.map((f) => (
          <div className="flight-card" key={f._id}>
            <div className="flight-main">
              <div className="flight-route">
                <div className="flight-time">
                  <span className="flight-hour">
                    {formatTime(f.departureTime)}
                  </span>
                  <span className="flight-place">{f.from}</span>
                  <div className="flight-terminal">Nhà ga 1</div>
                </div>
                <div className="flight-line">
                  <span className="flight-direct">Bay thẳng</span>
                </div>
                <div className="flight-time">
                  <span className="flight-hour">
                    {formatTime(f.arrivalTime)}
                  </span>
                  <span className="flight-place">{f.to}</span>
                  <div className="flight-terminal">Nhà ga 1</div>
                </div>
              </div>
              <div className="flight-main-divider"></div>
              <div className="flight-info">
                <div className="flight-duration">
                  <span role="img" aria-label="clock">
                    ⏱️
                  </span>{" "}
                  Thời gian bay {calcDuration(f.departureTime, f.arrivalTime)}
                </div>
                <div className="flight-airline">
                  <span role="img" aria-label="plane">
                    ✈️
                  </span>
                  {f.code} được QAirline khai thác.
                </div>
              </div>
            </div>
            <div className="flight-fare-group">
              <div className="flight-fare economy">
                {f.remainingSeats?.economy > 0 && (
                  <div className="fare-seat">
                    {f.remainingSeats.economy} chỗ còn lại
                  </div>
                )}
                <div className="fare-type">Economy</div>
                <div className="fare-label">từ</div>
                <div className="fare-price">{formatPrice(f.economyPrice)}</div>
                <div className="fare-currency">VND</div>
              </div>
              <div className="flight-fare business">
                <div className="fare-type">Business</div>
                <div className="fare-label">từ</div>
                <div className="fare-price">{formatPrice(f.businessPrice)}</div>
                <div className="fare-currency">VND</div>
                {f.remainingSeats?.business > 0 && (
                  <div className="fare-seat">
                    {f.remainingSeats.business} chỗ còn lại
                  </div>
                )}
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
