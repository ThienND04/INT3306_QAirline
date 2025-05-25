import { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function FlightSearch() {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [flights, setFlights] = useState([]);

	const handleSearch = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API}/flights`, {
			params: { from, to }
		});
		setFlights(res.data);
	};

	return (
		<Container>
			<h2 className="mt-4">Tìm chuyến bay</h2>
			<Form className="mb-3">
				<Row>
					<Col>
						<Form.Control placeholder="Điểm đi" onChange={e => setFrom(e.target.value)} />
					</Col>
					<Col>
						<Form.Control placeholder="Điểm đến" onChange={e => setTo(e.target.value)} />
					</Col>
					<Col>
						<Button onClick={handleSearch}>Tìm</Button>
					</Col>
				</Row>
			</Form>

			{flights.map(flight => (
				<Card key={flight._id} className="mb-3">
					<Card.Body>
						<Card.Title>{flight.code}</Card.Title>
						<Card.Text>Giờ khởi hành: {new Date(flight.departureTime).toLocaleString()}</Card.Text>
						<Button variant="success">Đặt vé</Button>
					</Card.Body>
				</Card>
			))}
		</Container>
	);
}

export default FlightSearch;
