import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user && user.role === 'admin') {
			setUserRole('admin');
		}
	}, []);

	return (
		<header className="header">
			<div className="header-container">
				<div className="header-left">
					<Link to="/admin" className="logo">QAirline</Link>
					<nav className="admin-nav">
						<Link to="/admin/flights" className="nav-item">Quản lý chuyến bay</Link>
						<Link to="/admin/airports" className="nav-item">Quản lý sân bay</Link>
						<Link to="/admin/aircrafts" className="nav-item">Quản lý máy bay</Link>
						<Link to="/admin/stats" className="nav-item">Thống kê</Link>
					</nav>
				</div>

				<div className="header-right">

					{userRole === 'admin' ? (
						<div className="user-info">
							<img
								src="/admin-avatar.png"
								alt="Admin avatar"
								className="avatar"
							/>
						</div>
					) : (
						<div className="auth-buttons">
							<Link to="/login" className="login-button">Đăng nhập</Link>
						</div>
					)}
				</div>
			</div>
		</header >
	);
};

export default Header;
