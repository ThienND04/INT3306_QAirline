import React from 'react';
import './AdminHome.css';
import Header from '../../components/Header/Header';

export default function AdminHome() {
	return (
		<div className="admin-home">
			<Header />
			{/* Hero Section */}
			<section className="admin-hero">
				<h1>Bảng điều khiển admin.</h1>
				<h2>Quản lý vé máy bay, chuyến bay và sân bay.</h2>
				<button className="admin-button">Xem chuyến bay</button>
			</section>

			{/* Features Section */}
			<section className="admin-features">
				<div className="feature-card" onClick={() => window.location.href = '/admin/flights'}>
					<img src="https://vlink.vn/wp-content/uploads/2024/05/datvemaybayvietnamairlines.jpg" alt="Quản lý chuyen bay" className="icon-placeholder" />
					<h3>Quản lý chuyến bay</h3>
					<p>Xem, tạo, chỉnh sửa và xóa các chuyến bay dễ dàng.</p>
				</div>
				<div className="feature-card" onClick = {() => window.location.href = '/admin/airports'}>
					<img src="https://nextbrand.com.vn/wp-content/uploads/2021/06/danh-sach-san-bay-tai-viet-nam-dang-hoat-dong.jpg.webp" alt="Quản lý san bay" className="icon-placeholder" />
					<h3>Quản lý sân bay</h3>
					<p>Thêm, cập nhật hoặc loại bỏ thông tin các sân bay.</p>
				</div>
				<div className="feature-card" onClick={() => window.location.href = '/admin/aircrafts'}>
					<img src="https://vlink.vn/wp-content/uploads/2024/05/datvemaybayvietnamairlines.jpg" alt="Quản lý chuyen bay" className="icon-placeholder" />
					<h3>Quản lý máy bay</h3>
					<p>Quản lý thông tin máy bay, bao gồm loại máy bay và số lượng ghế.</p>
				</div>
				<div className="feature-card" onClick={() => window.location.href = '/admin/stats'}>
					<img src="https://image3.luatvietnam.vn/uploaded/images/original/2024/11/16/da-co-che-do-bao-cao-thong-ke-nganh-thong-ke-tu-ngay-01-01-2025-1_1611195945.jpg" alt="Bao cao thong ke" className="icon-placeholder" />
					<h3>Báo cáo thống kê</h3>
					<p>Theo dõi dữ liệu bán vé, tình trạng chuyến bay trực tiếp.</p>
				</div>
				<div className="feature-card" onClick={() => window.location.href = '/admin/news'}>
					<img src="https://image.talentnetwork.vn/cdytedongnai///news/2023/03/08/1678270264_news-dice.jpg" alt="Tin tuc" className="icon-placeholder" />
					<h3>Tin tức</h3>
					<p>Cập nhật các tin tức mới nhất về ngành hàng không và QAirline.</p>
				</div>
			</section>

			{/* Call-to-Action Section */}
			<section className="admin-cta">
				<h2>Quản lý hệ thống nhanh chóng.</h2>
				<p>Hãy khám phá các tính năng nâng cao dành cho admin QAirline.</p>
				<button className="admin-button">Truy cập quản lý</button>
			</section>

			{/* Footer */}
			<footer className="admin-footer">
				<div className="footer-column">
					<h4>Chức năng</h4>
					<p>Chuyến bay</p>
					<p>Sân bay</p>
					<p>Thống kê</p>
				</div>
				<div className="footer-column">
					<h4>Hỗ trợ</h4>
					<p>Liên hệ</p>
					<p>Trợ giúp</p>
					<p>FAQ</p>
				</div>
				<div className="footer-column">
					<h4>Tài khoản</h4>
					<p>Thông tin cá nhân</p>
					<p>Đổi mật khẩu</p>
					<p>Đăng xuất</p>
				</div>
				<div className="footer-column">
					<h4>QAirline</h4>
					<p>Về chúng tôi</p>
					<p>Điều khoản</p>
					<p>Chính sách</p>
				</div>
			</footer>
		</div>
	);
}
