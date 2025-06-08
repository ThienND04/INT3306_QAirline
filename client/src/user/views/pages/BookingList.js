import React, { useState, useEffect } from "react";
import "./BookingList.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import bookingApiService from "../../../services/BookingApiService";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await bookingApiService.getMyBookings();
        setBookings(data);
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const handleCancel = async (idx) => {
  const booking = bookings[idx];
  if (!booking || booking.status === "Đã hủy") return;
  if (window.confirm("Bạn có chắc muốn hủy chuyến này?")) {
    try {
      await bookingApiService.cancelBooking(booking._id || booking.id);
      setBookings((prev) =>
        prev.map((b, i) =>
          i === idx ? { ...b, status: "Đã hủy" } : b
        )
      );
    } catch (error) {
      alert("Hủy chuyến thất bại. Vui lòng thử lại!");
    }
  }
};

  return (
    <div className="bookinglist-root">
      <Header />
      <div className="bookinglist-content">
        <div className="bookinglist-container">
          <div className="bookinglist-banner">
            <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="plane" className="bookinglist-plane-icon" />
          </div>
          <h2 className="bookinglist-title">Quản lý chuyến bay</h2>
          <div className="bookinglist-count">
            Tổng số chuyến: <b>{bookings.length}</b>
          </div>
          {loading ? (
            <div className="bookinglist-empty">Đang tải dữ liệu...</div>
          ) : bookings.length === 0 ? (
            <div className="bookinglist-empty">
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="empty" style={{width: 80, opacity: 0.6}} />
              <div>Bạn chưa có chuyến bay nào.</div>
            </div>
          ) : (
            <div className="bookinglist-card-list">
              {bookings.map((b, idx) => (
                <div className={`bookinglist-card${b.status === "Đã hủy" ? " cancelled" : ""}`} key={b._id || idx}>
                  <div className="bookinglist-card-header">
                    <div>
                      <span className="bookinglist-flight">{b.flightCode || b.flight}</span>
                      <span className="bookinglist-route">{b.departure || b.from} → {b.arrival || b.to}</span>
                    </div>
                    <div className="bookinglist-rescode">
                      <span>Mã đặt:</span> <b>{b._id || b.id}</b>
                    </div>
                  </div>
                  <div className="bookinglist-card-body">
                    <div className="bookinglist-card-row">
                      <div>
                        <div><b>Khởi hành:</b> {b.departureTime ? new Date(b.departureTime).toLocaleString() : `${b.date} ${b.time}`}</div>
                        <div><b>Đến:</b> {b.arrivalTime ? new Date(b.arrivalTime).toLocaleString() : b.arrive}</div>
                        <div><b>Hành khách:</b> {b.passenger || (b.userInfo && b.userInfo.fullName)}</div>
                        <div><b>eTicket:</b> {b.eticket || ""}</div>
                      </div>
                      <div>
                        <div><b>Máy bay:</b> {b.aircraft || (b.flightInfo && b.flightInfo.aircraft)}</div>
                        <div><b>Thời gian:</b> {b.duration || ""}</div>
                        <div><b>Hạng:</b> {b.class || b.cabin}</div>
                        <div>
                          <b>Trạng thái:</b>{" "}
                          <span className={`bookinglist-status-badge${b.status === "Đã hủy" ? " bookinglist-cancelled-badge" : ""}`}>
                            {b.status || "Đã đặt"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bookinglist-card-footer">
                    {b.status !== "Đã hủy" && (
                      <button
                        className="bookinglist-cancel-btn"
                        onClick={() => handleCancel(idx)}
                      >
                        Hủy chuyến
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookingList;