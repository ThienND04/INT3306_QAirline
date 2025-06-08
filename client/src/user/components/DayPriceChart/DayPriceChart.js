import React, { useEffect, useState, useRef } from "react";
import flightApiService from "../../../services/FlightApiService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./DayPriceChart.css";

// Format: 1.234.000
function formatPrice(price) {
	if (price === undefined || price === null) return "";
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Format: Th 2 9
function formatDayVN(dateString) {
	const weekdays = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
	const date = new Date(dateString);
	return `${weekdays[date.getDay()]} ${date.getDate()}`;
}

const MAX_VISIBLE = 9; // Số ngày hiển thị cùng lúc, tối đa
const CHART_HEIGHT_PX = 190;

const DayPriceChart = ({ searchParams, onDateChange }) => {
	const [data, setData] = useState([]);
	const [visibleStart, setVisibleStart] = useState(0);
	const [showChart, setShowChart] = useState(true);
	const chartRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res =
					(await flightApiService.searchRecentFlights?.(searchParams)) || [];
				const fixed = res.map((item) => ({
					date: item.date || item._id || "",
					minEconomyPrice:
						item.minEconomyPrice !== undefined
							? item.minEconomyPrice
							: item.price || 0,
					from: item.from,
					to: item.to,
				}));
				setData(fixed);

				// focus vào ngày đang chọn nếu có
				const idx = fixed.findIndex(
					(d) =>
						new Date(d.date).toISOString().slice(0, 10) ===
						new Date(searchParams.date).toISOString().slice(0, 10)
				);
				let startIdx = Math.max(
					0,
					Math.min(
						idx - Math.floor(MAX_VISIBLE / 2),
						Math.max(0, fixed.length - MAX_VISIBLE)
					)
				);
				setVisibleStart(startIdx);
			} catch (err) {
				setData([]);
				console.error("Lỗi fetch dữ liệu biểu đồ:", err);
			}
		};
		if (searchParams.from && searchParams.to && searchParams.date) fetchData();
	}, [searchParams.from, searchParams.to, searchParams.date]);

	// Tìm giá trị lớn nhất để xác định tỷ lệ chiều cao cột
	const maxPrice = data.reduce(
		(max, d) =>
			d.minEconomyPrice !== undefined && d.minEconomyPrice > max
				? d.minEconomyPrice
				: max,
		0
	);

	// Handler chuyển ngày
	const handleSelect = (item) => {
		if (
			new Date(item.date).toISOString().slice(0, 10) !==
			new Date(searchParams.date).toISOString().slice(0, 10)
		) {
			onDateChange(item.date);
		}
	};

	// Scroll trái/phải
	const handlePrev = () => {
		setVisibleStart((prev) => Math.max(0, prev - 2));
	};
	const handleNext = () => {
		setVisibleStart((prev) => Math.min(data.length - MAX_VISIBLE, prev + 2));
	};

	// Tìm index ngày đang chọn
	const selectedIdx = data.findIndex(
		(d) =>
			new Date(d.date).toISOString().slice(0, 10) ===
			new Date(searchParams.date).toISOString().slice(0, 10)
	);

	return (
		<div className="day-chart-wrapper">
			{/* Ngày đang chọn và nút ẩn/hiện */}
			<div className="day-chart-header">
				<div className="day-chart-title">
					{selectedIdx !== -1 && data[selectedIdx] ? (
						<>
							<b>
								{new Date(data[selectedIdx].date).toLocaleDateString("vi-VN", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</b>
						</>
					) : (
						""
					)}
				</div>
				<button
					className="day-chart-toggle"
					onClick={() => setShowChart((show) => !show)}
				>
					{showChart ? "Ẩn ngày" : "Hiện ngày"}{" "}
					<span style={{ fontSize: 12 }}>{showChart ? "▲" : "▼"}</span>
				</button>
			</div>

			{showChart && (
				<div className="day-chart-box">
					{data.length > MAX_VISIBLE && (
						<button
							className="day-chart-nav left"
							onClick={handlePrev}
							disabled={visibleStart === 0}
						>
							<FaChevronLeft />
						</button>
					)}

					<div className="day-chart-list" ref={chartRef}>
						{data
							.slice(visibleStart, visibleStart + MAX_VISIBLE)
							.map((item) => {
								const isSelected =
									new Date(item.date).toISOString().slice(0, 10) ===
									new Date(searchParams.date).toISOString().slice(0, 10);
								let percent = 0.15; // min 15% để không bị quá thấp
								if (maxPrice > 0 && item.minEconomyPrice) {
									percent = item.minEconomyPrice / maxPrice;
									percent = Math.max(percent, 0.15);
								}
								const height = percent * CHART_HEIGHT_PX;
								return (
									<div
										key={item.date}
										className={`day-chart-col${isSelected ? " selected" : ""}`}
										style={{ height: CHART_HEIGHT_PX }}
										onClick={() => handleSelect(item)}
									>
										<div
											className="day-chart-bar"
											style={{
												height: `${height}px`,
												background: isSelected ? "#144377" : "#cfe3f9",
												color: isSelected ? "#fff" : "#13335d",
											}}
										>
											<div className="day-chart-price">
												<span>
													{item.minEconomyPrice
														? formatPrice(item.minEconomyPrice)
														: "—"}
												</span>
												<div className="day-chart-vnd">VND</div>
											</div>
										</div>
										<div
											className={`day-chart-date${isSelected ? " selected" : ""
												}`}
											style={{
												color: isSelected ? "#144377" : "#174b82",
												fontWeight: isSelected ? 700 : 500,
												background: isSelected ? "#d2e6ff" : "transparent",
												borderRadius: "8px",
												padding: "2px 8px",
												marginTop: "8px",
											}}
										>
											{item.date ? formatDayVN(item.date) : ""}
										</div>
									</div>
								);
							})}
					</div>

					{data.length > MAX_VISIBLE && (
						<button
							className="day-chart-nav right"
							onClick={handleNext}
							disabled={visibleStart >= data.length - MAX_VISIBLE}
						>
							<FaChevronRight />
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default DayPriceChart;
