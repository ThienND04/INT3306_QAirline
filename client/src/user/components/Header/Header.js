import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

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

  // Đóng dropdown khi click ra ngoài
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.qa-avatar-dropdown')) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="qa-header">
      <div className="qa-logo">QAirline</div>
      <nav className="qa-nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/booking">Đặt vé</Link>
        <a href="#events" onClick={e => handleNavScroll(e, 'events')}>Khuyến mãi</a>
        <a href="#faq" onClick={e => handleNavScroll(e, 'faq')}>Hỗ trợ</a>
      </nav>
      <div className="qa-auth">
        {!user || !token ? (
          <>
            <Link to="/login" className="qa-btn">Đăng nhập</Link>
            <Link to="/register" className="qa-btn">Đăng ký</Link>
          </>
        ) : (
          <div className="qa-avatar-dropdown">
            <img
              src={user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
              alt="Avatar"
              className="qa-avatar"
              onClick={() => {
                setShowDropdown((v) => !v);
                console.log('Avatar clicked', user);
              }}
              style={{ cursor: 'pointer' }}
            />
            {showDropdown && ( 
          
              <div className="qa-dropdown-menu">
                <div className="qa-dropdown-user">
                  <img src={user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt="Avatar" className="dropdown-avatar" />
                  <div>
                    <div className="dropdown-name">{user.fullName || 'User Name'}</div>
                    <div className="dropdown-email">{user.email || 'user@email.com'}</div>
                  </div>
                </div>
                <Link to="/profile" className="qa-dropdown-item">
                  <span className="header-material-icon">person</span> Hồ sơ cá nhân
                </Link>
                <div className="dropdown-divider"></div>
                <button className="qa-dropdown-item logout" onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/');
                  }}>
                  <span className="header-material-icon">logout</span> Đăng xuất
                </button>
              </div>
            )} 
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;