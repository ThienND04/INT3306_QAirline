import React, { useState, useRef } from "react";
import "./SearchTab.css";
import airportApiService from "../../../services/AirportApiService";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FaExchangeAlt, FaTimes, FaPlus, FaMinus } from "react-icons/fa";

function SearchTab() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = React.useState({
    from: "",
    to: "",
    date: "",
    adult: 1,
    child: 0,
    infant: 0,
  });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [showPaxDropdown, setShowPaxDropdown] = useState(false);

  const paxRef = useRef();

  // Handle click outside to close pax dropdown
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (paxRef.current && !paxRef.current.contains(event.target)) {
        setShowPaxDropdown(false);
      }
    }
    if (showPaxDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPaxDropdown]);

  // Swap fields for "exchange" icon
  const handleSwap = () => {
    setSearchForm((prev) => ({
      ...prev,
      from: searchForm.to,
      to: searchForm.from,
    }));
    setSearchFrom(searchTo);
    setSearchTo(searchFrom);
  };

  const handleInputChange = (e) => {
    try {
      console.log(e.target.value);
      const { name, value } = e.target;
      if (name === "from") {
        setSearchFrom(value);
        setSearchForm((prev) => ({ ...prev, from: "" })); // reset IATA
        airportApiService.searchAirport(value).then(setFromSuggestions);
      } else if (name === "to") {
        setSearchTo(value);
        setSearchForm((prev) => ({ ...prev, to: "" })); // reset IATA
        airportApiService.searchAirport(value).then(setToSuggestions);
      } else if (name === "departureTime") {
        setSearchDate(value);
        const date = new Date(value);
        setSearchForm((prev) => ({ ...prev, date: date.toISOString() }));
      }
    } catch (error) {
      console.error("Error handling input change:", error);
    }
  };

  const handleFromSelect = (airport) => {
    setSearchForm((prev) => ({ ...prev, from: airport.IATACode }));
    setSearchFrom(airport.city || airport.name || airport.IATACode);
    setFromSuggestions([]);
  };

  const handleToSelect = (airport) => {
    setSearchForm((prev) => ({ ...prev, to: airport.IATACode }));
    setSearchTo(airport.city || airport.name || airport.IATACode);
    setToSuggestions([]);
  };

  const handleClearFrom = () => {
    setSearchForm((prev) => ({ ...prev, from: "" }));
    setSearchFrom("");
  };
  const handleClearTo = () => {
    setSearchForm((prev) => ({ ...prev, to: "" }));
    setSearchTo("");
  };

  // Passenger dropdown handlers
  const handlePaxChange = (type, delta) => {
    setSearchForm((prev) => {
      const newValue = Math.max(0, prev[type] + delta);
      // Người lớn min 1
      if (type === "adult" && newValue < 1) return prev;
      // Tổng hành khách max 9 (tuỳ yêu cầu)
      const total =
        (type === "adult" ? newValue : prev.adult) +
        (type === "child" ? newValue : prev.child) +
        (type === "infant" ? newValue : prev.infant);
      if (total > 9) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  const totalPax = searchForm.adult + searchForm.child + searchForm.infant;

  const handleSearch = () => {
    // Tùy backend, bạn có thể cần đổi params
    const params = new URLSearchParams({
      from: searchForm.from,
      to: searchForm.to,
      date: searchForm.date,
      adult: searchForm.adult,
      child: searchForm.child,
      infant: searchForm.infant,
    });
    navigate(`/search-result?${params.toString()}`);
  };

  return (
    <div className="flight-search-box">
      <Form className="flight-search-form-custom">
        <div className="flight-search-row">
          {/* From */}
          <div className="flight-search-col from-col">
            <div className="label">TỪ</div>
            <div className="input-group-custom">
              {/* <span className="city-name">{searchFrom || "}</span> */}
              {searchForm.from && (
                <span className="iata-chip">
                  {searchForm.from}
                  <FaTimes className="clear-icon" onClick={handleClearFrom} />
                </span>
              )}
              <input
                type="text"
                name="from"
                className="airport-input"
                value={searchFrom}
                onChange={handleInputChange}
                autoComplete="off"
                // placeholder="Nhập nơi đi"
              />
              {fromSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {fromSuggestions.map((airport) => (
                    <li
                      key={airport.IATACode}
                      onClick={() => handleFromSelect(airport)}
                    >
                      {airport.city || airport.name}{" "}
                      <span className="iata-chip">{airport.IATACode}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Exchange Icon */}
          <div className="flight-search-col exchange-col">
            <button
              type="button"
              className="swap-btn"
              title="Đổi chiều"
              onClick={handleSwap}
            >
              <FaExchangeAlt />
            </button>
          </div>
          {/* To */}
          <div className="flight-search-col to-col">
            <div className="label">TỚI</div>
            <div className="input-group-custom">
              {searchForm.to && (
                <span className="iata-chip">
                  {searchForm.to}
                  <FaTimes className="clear-icon" onClick={handleClearTo} />
                </span>
              )}
              <input
                type="text"
                name="to"
                className="airport-input"
                value={searchTo}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Nhập nơi đến"
              />
              {toSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {toSuggestions.map((airport) => (
                    <li
                      key={airport.IATACode}
                      onClick={() => handleToSelect(airport)}
                    >
                      {airport.city || airport.name}{" "}
                      <span className="iata-chip">{airport.IATACode}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Departure Date */}
          <div className="flight-search-col date-col">
            <div className="label">NGÀY ĐI</div>
            <input
              type="date"
              name="departureTime"
              className="date-input"
              value={searchDate}
              onChange={handleInputChange}
            />
          </div>
          {/* Passengers */}
          <div className="flight-search-col pax-col" ref={paxRef}>
            <div className="label">HÀNH KHÁCH</div>
            <div
              className="pax-display"
              tabIndex={0}
              onClick={() => setShowPaxDropdown((v) => !v)}
            >
              {totalPax}
            </div>
            {showPaxDropdown && (
              <div className="pax-dropdown">
                <div className="pax-row">
                  <button
                    type="button"
                    className="pax-btn"
                    onClick={() => handlePaxChange("adult", -1)}
                  >
                    <FaMinus />
                  </button>
                  <div className="pax-count">{searchForm.adult}</div>
                  <button
                    type="button"
                    className="pax-btn"
                    onClick={() => handlePaxChange("adult", 1)}
                  >
                    <FaPlus />
                  </button>
                  <div className="pax-label">
                    Người Lớn
                    <div className="pax-desc"> </div>
                  </div>
                </div>
                <div className="pax-row">
                  <button
                    type="button"
                    className="pax-btn"
                    onClick={() => handlePaxChange("child", -1)}
                  >
                    <FaMinus />
                  </button>
                  <div className="pax-count">{searchForm.child}</div>
                  <button
                    type="button"
                    className="pax-btn"
                    onClick={() => handlePaxChange("child", 1)}
                  >
                    <FaPlus />
                  </button>
                  <div className="pax-label">
                    Trẻ Em
                    <div className="pax-desc">2-11 Tuổi</div>
                  </div>
                </div>
                <div className="pax-row">
                  <button
                    type="button"
                    className="pax-btn"
                    onClick={() => handlePaxChange("infant", -1)}
                  >
                    <FaMinus />
                  </button>
                  <div className="pax-count">{searchForm.infant}</div>
                  <button
                    type="button"
                    className="pax-btn"
                    onClick={() => handlePaxChange("infant", 1)}
                  >
                    <FaPlus />
                  </button>
                  <div className="pax-label">
                    Trẻ Sơ Sinh
                    <div className="pax-desc">0-2 Tuổi</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Search Button */}
          <div className="flight-search-col search-btn-col">
            <button className="search-btn" type="button" onClick={handleSearch}>
              Tìm Chuyến Bay
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SearchTab;
