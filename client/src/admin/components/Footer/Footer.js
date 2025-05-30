import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="qa-footer">
      <div className="footer-section">
        <h5>QAirline</h5>
        <ul>
          <li>Trang chủ</li>
          <li>Đặt vé</li>
          <li>Liên hệ</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Dịch vụ</h5>
        <ul>
          <li>Hủy vé</li>
          <li>Đổi lịch</li>
          <li>Hoàn tiền</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Hỗ trợ</h5>
        <ul>
          <li>Câu hỏi thường gặp</li>
          <li>Chính sách</li>
          <li>Bảo mật</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Hợp tác</h5>
        <ul>
          <li>Đại lý</li>
          <li>Liên kết</li>
          <li>Tuyển dụng</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Thông tin</h5>
        <ul>
          <li>Về QAirline</li>
          <li>Điều khoản</li>
          <li>Bản quyền</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
