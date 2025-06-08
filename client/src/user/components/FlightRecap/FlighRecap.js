import React from "react";
import "../../views/pages/Booking/SearchResult.css";
import { FaUser } from "react-icons/fa";

const airportNames = {
  HAN: "Hà Nội",
  SGN: "TP. Hồ Chí Minh",
  // Add more airport codes and names if needed
};

const getWeekdayVN = (dateStr) => {
  const date = new Date(dateStr);
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return weekdays[date.getDay()];
};

const getDayVN = (dateStr) => {
  const date = new Date(dateStr);
  return `${getWeekdayVN(dateStr)}, ${date.getDate()} thg ${
    date.getMonth() + 1
  }`;
};

const FlightRecap = ({ from, to, date, passengers }) => {
  return (
    <div className="flight-recap-bar">
      <div className="flight-recap-left">
        <div className="flight-recap-airports">
          <div className="flight-recap-col">
            <div className="recap-airport-code">
              <strong>{from}</strong>
            </div>
            <div className="recap-airport-name">
              {airportNames[from] || from}
            </div>
          </div>
          <div className="recap-middle">
            <span className="recap-line">..................</span>
            <span className="recap-plane" role="img" aria-label="plane">
              ✈️
            </span>
          </div>
          <div className="flight-recap-col">
            <div className="recap-airport-code">
              <strong>{to}</strong>
            </div>
            <div className="recap-airport-name">{airportNames[to] || to}</div>
          </div>
        </div>
      </div>
      <div className="flight-recap-section recap-divider"></div>
      <div className="flight-recap-section recap-label">
        <div>
          <strong>Khởi hành</strong>
        </div>
        <div className="recap-desc">{getDayVN(date)}</div>
      </div>
      <div className="flight-recap-section recap-divider"></div>
      <div className="flight-recap-section recap-label">
        <div>
          <strong>Hành khách</strong>
        </div>
        <div className="recap-desc">
          {passengers} <FaUser style={{ marginLeft: 2 }} />
        </div>
      </div>
    </div>
  );
};

export default FlightRecap;
