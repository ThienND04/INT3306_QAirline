import React, { useState } from "react";
import "./SearchTab.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import airportApiService from "../../../services/AirportApiService";
import { useNavigate } from "react-router-dom";

function SearchTab() {
    const navigate = useNavigate();
    const [searchForm, setSearchForm] = React.useState({
		from: "",
		to: "",
		date: "",
		numberTickets: 1
	});

	const [fromSuggestions, setFromSuggestions] = useState([]);
	const [toSuggestions, setToSuggestions] = useState([]);
	const [searchFrom, setSearchFrom] = useState('');
	const [searchTo, setSearchTo] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === 'from') {
			setSearchFrom(value);
			airportApiService.searchAirport(value).then(setFromSuggestions);
		} else if (name === 'to') {
			setSearchTo(value);
			airportApiService.searchAirport(value).then(setToSuggestions);
		} else {
			setSearchForm(prev => ({ ...prev, [name]: value }));
		}
	};

	const handleFromSelect = (airport) => {
		setSearchForm(prev => ({ ...prev, from: airport.IATACode }));
		setSearchFrom(`${airport.name} - ${airport.city}, ${airport.country}`);
		setFromSuggestions([]);
	};

	const handleToSelect = (airport) => {
		setSearchForm(prev => ({ ...prev, to: airport.IATACode }));
		setSearchTo(`${airport.name} - ${airport.city}, ${airport.country}`);
		setToSuggestions([]);
	};

    const handleSubmit = () => {
        console.log("Searching for flights with form data:", searchForm);
        navigate("/search-result", { state: searchForm });
    }

    return (
        <Form className="flight-search-form d-flex flex-wrap justify-content-between p-3 rounded shadow">
            <Form.Group className="mb-3 position-relative" style={{ flex: "1 1 200px" }}>
                <Form.Label>Điểm đi</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập nơi đi"
                    name="from"
                    value={searchFrom}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                {fromSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {fromSuggestions.map((airport) => (
                            <li key={airport.IATACode} onClick={() => handleFromSelect(airport)}>
                                {airport.name} – {airport.city}, {airport.country}
                            </li>
                        ))}
                    </ul>
                )}
            </Form.Group>

            <Form.Group className="mb-3 position-relative" style={{ flex: "1 1 200px" }}>
                <Form.Label>Điểm đến</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập nơi đến"
                    name="to"
                    value={searchTo}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                {toSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {toSuggestions.map((airport) => (
                            <li key={airport.IATACode} onClick={() => handleToSelect(airport)}>
                                {airport.name} – {airport.city}, {airport.country}
                            </li>
                        ))}
                    </ul>
                )}
            </Form.Group>

            <Form.Group className="mb-3" style={{ flex: "1 1 150px" }}>
                <Form.Label>Ngày đi</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={searchForm.date}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" style={{ flex: "1 1 120px" }}>
                <Form.Label>Hành khách</Form.Label>
                <Form.Control
                    type="number"
                    name="numberTickets"
                    min={1}
                    value={searchForm.numberTickets}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Button variant="primary" className="mt-4">Tìm chuyến bay</Button>
        </Form>
    )
}

export default SearchTab;