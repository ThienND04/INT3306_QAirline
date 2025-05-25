import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Home() {
	return (
		<>
			<Header />

			<div className="home-container">
				<section className="hero">
					<h1>Đặt vé máy bay.</h1>
					<h2>Nhanh chóng. Giá tốt nhất.</h2>
					<img
						className="homepage-hero-image"
						src="https://www.vietnamairlines.com/~/media/39741D2492774DB0981EA1F7F100977C.ashx"
						alt="Vietnam Airlines Banner"
					/>
				</section>

				<section className="cta">
					<h3>Sẵn sàng cho một chuyến bay mới?</h3>
					<p>Đặt vé ngay để nhận ưu đãi hấp dẫn.</p>
					<button className="btn-black">Đặt ngay</button>
				</section>

				<section className="features">
					<div className="feature-card">
						<div className="icon placeholder square" />
						<h4>Đa dạng chuyến bay.</h4>
						<p>Tìm kiếm và chọn lựa giữa nhiều hãng hàng không và thời gian linh hoạt.</p>
					</div>
					<div className="feature-card">
						<div className="icon placeholder circle" />
						<h4>Thanh toán an toàn.</h4>
						<p>Hỗ trợ nhiều phương thức, đảm bảo mọi giao dịch đều an toàn.</p>
					</div>
					<div className="feature-card">
						<div className="icon placeholder triangle" />
						<h4>Hỗ trợ 24/7.</h4>
						<p>Đội ngũ tư vấn luôn sẵn sàng giải đáp mọi thắc mắc mọi lúc.</p>
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
}

export default Home;
