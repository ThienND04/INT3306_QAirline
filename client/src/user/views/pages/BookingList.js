import React, { useState } from "react";
import "./BookingList.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const mockBookings = [
  {
    id: "DQNKSR",
    flight: "VN0611",
    from: "HAN",
    to: "BKK",
    date: "2025-11-28",
    time: "09:05",
    arrive: "11:20",
    passenger: "Nguyễn Văn A",
    eticket: "7382434125184",
    status: "Đã đặt",
    aircraft: "AIRBUS INDUSTRIE A321 JET",
    duration: "2h15m",
    cabin: "Economy",
  },
  {
    id: "DQNKSR",
    flight: "VN0614",
    from: "BKK",
    to: "HAN",
    date: "2025-12-03",
    time: "15:55",
    arrive: "17:55",
    passenger: "Nguyễn Văn A",
    eticket: "7382434125185",
    status: "Đã đặt",
    aircraft: "AIRBUS INDUSTRIE A321 JET",
    duration: "2h0m",
    cabin: "Economy",
  },
];

function BookingList() {
  const [bookings, setBookings] = useState(mockBookings);

  const handleCancel = (idx) => {
    if (window.confirm("Bạn có chắc muốn hủy chuyến này?")) {
      setBookings((prev) =>
        prev.map((b, i) =>
          i === idx ? { ...b, status: "Đã hủy" } : b
        )
      );
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
          {bookings.length === 0 ? (
            <div className="bookinglist-empty">
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="empty" style={{width: 80, opacity: 0.6}} />
              <div>Bạn chưa có chuyến bay nào.</div>
            </div>
          ) : (
            <div className="bookinglist-card-list">
              {bookings.map((b, idx) => (
                <div className={`bookinglist-card${b.status === "Đã hủy" ? " cancelled" : ""}`} key={idx}>
                  <div className="bookinglist-card-header">
                    <div>
                      <span className="bookinglist-flight">{b.flight}</span>
                      <span className="bookinglist-route">{b.from} → {b.to}</span>
                    </div>
                    <div className="bookinglist-rescode">
                      <span>Mã đặt:</span> <b>{b.id}</b>
                    </div>
                  </div>
                  <div className="bookinglist-card-body">
                    <div className="bookinglist-card-row">
                      <div>
                        <div><b>Khởi hành:</b> {b.date} {b.time}</div>
                        <div><b>Đến:</b> {b.arrive}</div>
                        <div><b>Hành khách:</b> {b.passenger}</div>
                        <div><b>eTicket:</b> {b.eticket}</div>
                      </div>
                      <div>
                        <div><b>Máy bay:</b> {b.aircraft}</div>
                        <div><b>Thời gian:</b> {b.duration}</div>
                        <div><b>Hạng:</b> {b.cabin}</div>
                        <div>
                          <b>Trạng thái:</b>{" "}
                          <span className={`bookinglist-status-badge${b.status === "Đã hủy" ? " bookinglist-cancelled-badge" : ""}`}>
                            {b.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bookinglist-card-footer">
                    {b.status === "Đã đặt" && (
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