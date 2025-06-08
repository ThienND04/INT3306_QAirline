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
				console.log("Bookings data:", data);
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
							<img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="empty" style={{ width: 80, opacity: 0.6 }} />
							<div>Bạn chưa có chuyến bay nào.</div>
						</div>
					) : (
						<div className="bookinglist-card-list">
							{bookings.map((b, idx) => (
								<div className={`bookinglist-card${b.status === "Đã hủy" ? " cancelled" : ""}`} key={b._id || idx}>
									<div className="bookinglist-card-header">
										<div>
											<span className="bookinglist-flight">{b.outbound?.flightCode}</span>
											<span className="bookinglist-route">{b.outbound?.departure} → {b.outbound?.arrival}</span>
										</div>
										<div className="bookinglist-rescode">
											<span>Mã đặt:</span> <b>{b._id || b.id}</b>
										</div>
									</div>
									<div className="bookinglist-card-body">
										{/* Outbound Flight */}
										<div className="bookinglist-card-row">
											<div>
												<div><b>Khởi hành:</b> {new Date(b.outbound?.departureTime).toLocaleString()}</div>
												<div><b>Đến:</b> {new Date(b.outbound?.arrivalTime).toLocaleString()}</div>
												<div><b>Hành khách:</b> {b.userInfo?.middleAndFirstName} {b.userInfo?.lastName}</div>
												<div><b>Ghế:</b> {b.outbound?.seatNo?.join(", ")}</div>
											</div>
											<div>
												<div><b>Máy bay:</b> {b.outboundFlightInfo?.aircraft}</div>
												<div><b>Hạng:</b> {b.outbound?.bookingClass}</div>
												<div><b>Giá:</b> {b.outbound?.price.toLocaleString()} VND</div>
												<div>
													<b>Trạng thái:</b>{" "}
													<span className={`bookinglist-status-badge${b.status === "Đã hủy" ? " bookinglist-cancelled-badge" : ""}`}>
														{b.status || "Đã đặt"}
													</span>
												</div>
											</div>
										</div>

										{/* Return Flight (if available) */}
										{(b.returnFlight && b.returnFlight.flightCode) && (
											<>
												<hr />
												<div className="bookinglist-card-row">
													<div>
														<div><b>Khởi hành (khứ hồi):</b> {new Date(b.returnFlight?.departureTime).toLocaleString()}</div>
														<div><b>Đến:</b> {new Date(b.returnFlight?.arrivalTime).toLocaleString()}</div>
														<div><b>Ghế:</b> {b.returnFlight?.seatNo?.join(", ")}</div>
													</div>
													<div>
														<div><b>Máy bay:</b> {b.returnFlightInfo?.aircraft}</div>
														<div><b>Giá:</b> {b.returnFlight?.price.toLocaleString()} VND</div>
													</div>
												</div>
											</>
										)}
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
