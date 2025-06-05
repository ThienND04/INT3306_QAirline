import React from "react";
import "./Home.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchTab from "../../components/Home/SearchTab";

function Home() {
	return (
		<>
			<Header />
			<div className="home-wrapper">
				<div className="hero-section">
					<Container>
						<h1 className="hero-title">
							<span className="brand">QAirline</span> – Hành trình của bạn, niềm vui của chúng tôi.
						</h1>
						<div className="hero-buttons mb-3">
							<Button variant="success" className="me-2">Xem tất cả các chuyến bay</Button>
							<Button variant="outline-primary" className="me-2">Một chiều</Button>
							<Button variant="outline-secondary">Khứ hồi</Button>
						</div>
						<SearchTab />
					</Container>
				</div>

				<div className="featured-destinations py-5">
					<Container>
						<div className="d-flex justify-content-between align-items-center mb-4">
							<h2>Khám phá chuyến bay ưu đãi</h2>
							<a href="#!" className="text-primary">Xem thêm</a>
						</div>
						<Row>
							{[
								{
									city: "Hà Nội",
									desc: "Thủ đô ngàn năm văn hiến. Khám phá ẩm thực, đường phố, danh lam thắng cảnh độc đáo.",
									image: "https://images.unsplash.com/photo-1589008595049-29b5035b6b7a"
								},
								{
									city: "Đà Nẵng",
									desc: "Thành phố biển sôi động. Thăm Bà Nà, cầu Rồng, trải nghiệm Trung bộ.",
									image: "https://images.unsplash.com/photo-1580717564841-fb58d35fa17e"
								},
								{
									city: "Đà Lạt",
									desc: "Thành phố ngàn hoa. Khám phá khí hậu mát mẻ, đồi thông, vườn hoa.",
									image: "https://images.unsplash.com/photo-1618828669762-99c894c61a9b"
								}
							].map((item, idx) => (
								<Col md={4} className="mb-4" key={idx}>
									<div className="destination-card" style={{ backgroundImage: `url(${item.image})` }}>
										<div className="overlay">
											<h4>{item.city}</h4>
											<p>{item.desc}</p>
											<Button variant="light" size="sm">Đặt vé bay ngay</Button>
										</div>
									</div>
								</Col>
							))}
						</Row>
					</Container>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;
