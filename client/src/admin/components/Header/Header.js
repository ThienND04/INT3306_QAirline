import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const [userRole, setUserRole] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user && user.role === 'admin') {
			setUserRole('admin');
		}
	}, []);

	return (
		<header className="qa-header">
			<div className="qa-logo" onClick={() => navigate('/admin')}>
				QAirline
			</div>
			<nav className="qa-nav">
				<Link to="/admin/flights" className="qa-nav-item">Quản lý chuyến bay</Link>
				<Link to="/admin/airports" className="qa-nav-item">Quản lý sân bay</Link>
				<Link to="/admin/aircrafts" className="qa-nav-item">Quản lý máy bay</Link>
				<Link to="/admin/stats" className="qa-nav-item">Thống kê</Link>
			</nav>
			<div className="qa-auth">
				{userRole === 'admin' ? (
					<div className="qa-user-info">
						<img
							src="/admin-avatar.png"
							alt="Admin avatar"
							className="qa-avatar"
						/>
					</div>
				) : (
					<div className="qa-auth-buttons">
						<Link to="/login" className="qa-btn">Đăng nhập</Link>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
