import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import flightApiService from "../../../../services/FlightApiService";
import "./BookingPage.css";

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Lấy params từ location.state (nếu dùng navigate truyền sang)
function useBookingParams() {
  const location = useLocation();
  // Có thể nhận cả từ state hoặc query
  const params = location.state || {};
  return params;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const {
    flightCode,
    bookingClass,
    adultCount,
    childCount,
    infantCount,
    from,
    to,
    departureTime,
    arrivalTime,
    code,
    economyPrice,
    businessPrice,
  } = useBookingParams();

  // Tự động chuyển về search nếu thiếu thông tin
  if (!flightCode || !bookingClass) {
    navigate("/");
    return null;
  }

  // Form state
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [children, setChildren] = useState(
    Array(Number(childCount) || 0).fill({ name: "", dob: "" })
  );
  const [infants, setInfants] = useState(
    Array(Number(infantCount) || 0).fill({ name: "", dob: "" })
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleChildChange = (idx, field, value) => {
    setChildren(
      children.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );
  };
  const handleInfantChange = (idx, field, value) => {
    setInfants(
      infants.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      // Gọi API đặt vé
      const res = await flightApiService.bookTickets({
        flightCode,
        userId: contact.email || "guest", // Có thể là email hoặc chuỗi "guest"
        bookingClass,
        adultCount: Number(adultCount),
        childCount: Number(childCount),
        infantCount: Number(infantCount),
        // Có thể gửi thêm contact, children, infants nếu backend cần
      });
      setResult(res.ticket);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Lỗi hệ thống. Vui lòng thử lại."
      );
    }
    setLoading(false);
  };

  // Hiển thị recap chuyến bay, loại vé, giá
  const price = bookingClass === "Economy" ? economyPrice : businessPrice;

  if (result) {
    // Hiển thị thông tin vé sau khi đặt thành công
    return (
      <div className="booking-success">
        <h2>Đặt vé thành công!</h2>
        <div>
          <b>Mã vé:</b> {result._id}
        </div>
        <div>
          <b>Chuyến bay:</b> {result.flightCode} ({from} → {to})
        </div>
        <div>
          <b>Khởi hành:</b> {formatTime(result.departureTime)}
        </div>
        <div>
          <b>Giờ đến:</b> {formatTime(result.arrivalTime)}
        </div>
        <div>
          <b>Loại vé:</b> {result.class}
        </div>
        <div>
          <b>Số ghế:</b> {result.seatNo?.join(", ")}
        </div>
        <div>
          <b>Giá:</b> {result.price?.toLocaleString("vi-VN")} VND
        </div>
        <button onClick={() => navigate("/")}>Về trang chủ</button>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <h2>Điền thông tin hành khách</h2>
      <div className="flight-recap">
        <div>
          <b>Chuyến bay:</b> {code} ({from} → {to})
        </div>
        <div>
          <b>Khởi hành:</b> {formatTime(departureTime)}
        </div>
        <div>
          <b>Giờ đến:</b> {formatTime(arrivalTime)}
        </div>
        <div>
          <b>Loại vé:</b> {bookingClass}
        </div>
        <div>
          <b>Giá vé:</b> {Number(price)?.toLocaleString("vi-VN")} VND
        </div>
        <div>
          <b>Hành khách:</b> {adultCount} người lớn, {childCount} trẻ em,{" "}
          {infantCount} em bé
        </div>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <h3>Thông tin người liên hệ</h3>
        <input
          name="fullName"
          placeholder="Họ tên"
          value={contact.fullName}
          onChange={handleContactChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleContactChange}
          required
        />
        <input
          name="phone"
          placeholder="Số điện thoại"
          value={contact.phone}
          onChange={handleContactChange}
          required
        />
        {children.length > 0 && <h3>Trẻ em</h3>}
        {children.map((c, i) => (
          <div key={i} className="child-info-row">
            <input
              placeholder={`Tên trẻ em #${i + 1}`}
              value={c.name}
              onChange={(e) => handleChildChange(i, "name", e.target.value)}
              required
            />
            <input
              type="date"
              value={c.dob}
              onChange={(e) => handleChildChange(i, "dob", e.target.value)}
              required
            />
          </div>
        ))}
        {infants.length > 0 && <h3>Em bé (dưới 2 tuổi)</h3>}
        {infants.map((c, i) => (
          <div key={i} className="child-info-row">
            <input
              placeholder={`Tên em bé #${i + 1}`}
              value={c.name}
              onChange={(e) => handleInfantChange(i, "name", e.target.value)}
              required
            />
            <input
              type="date"
              value={c.dob}
              onChange={(e) => handleInfantChange(i, "dob", e.target.value)}
              required
            />
          </div>
        ))}
        {error && <div className="booking-error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Đang đặt vé..." : "Đặt vé"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
