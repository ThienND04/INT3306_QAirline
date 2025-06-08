import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavScroll = (e,sectionId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToSection: sectionId } });
    }
  };

  return (
    <header className="qa-header">
      <div className="qa-logo">QAirline</div>
      <nav className="qa-nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/booking">Đặt vé</Link>
        <a href="#events" onClick={e => handleNavScroll(e,'events')}>Khuyến mãi</a>
        <a href="#faq" onClick={e => handleNavScroll(e,'faq')}>Hỗ trợ</a>
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