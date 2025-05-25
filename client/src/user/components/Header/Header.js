import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  return (
    <header className="qa-header">
      <div className="qa-logo">QAirline</div>
      <nav className="qa-nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/booking">Đặt vé</Link>
        <Link to="/promotions">Khuyến mãi</Link>
      </nav>
      <div className="qa-auth">
        {!user || !token ? (
          <>
            <Link to="/login" className="qa-btn">Đăng nhập</Link>
            <Link to="/register" className="qa-btn">Đăng ký</Link>
          </>
        ) : (
          <img src={user.avatar || 'https://via.placeholder.com/40'} alt="Avatar" className="qa-avatar" />
        )}
      </div>
    </header>
  );
}

export default Header;