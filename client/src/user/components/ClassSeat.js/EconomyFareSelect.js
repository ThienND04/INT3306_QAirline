import React, { useState } from "react";
import "./EconomyFareSelect.css";

// Format: 2.160.000
function formatPrice(price) {
  if (!price) return "-";
  return price.toLocaleString("vi-VN");
}

// Danh sách tiện ích cho từng loại
const SMART_BENEFITS = [
  { text: "Hành lý xách tay: 7kg", ok: true },
  { text: "Không bao gồm hành lý ký gửi", ok: false },
  { text: "Hoàn/huỷ trước giờ khởi hành: 450.000 VND (*)", ok: true },
  { text: "Hoàn/huỷ sau giờ khởi hành: 600.000 VND (*)", ok: true },
  { text: "Thay đổi trước giờ khởi hành: 450.000 VND (*)", ok: true },
  { text: "Thay đổi sau giờ khởi hành: 600.000 VND (*)", ok: true },
  { text: "Hệ số cộng điểm Bamboo Club: 0.5", ok: true },
  { text: "Chọn ghế ngồi mất phí", ok: false },
  { text: "Không áp dụng cho go-show", ok: false },
];

const FLEX_BENEFITS = [
  { text: "Hành lý xách tay: 7kg", ok: true },
  { text: "01 kiện hành lý ký gửi 20kg", ok: true },
  { text: "Hoàn/huỷ trước giờ khởi hành: 300.000 VND (*)", ok: true },
  { text: "Hoàn/huỷ sau giờ khởi hành: 300.000 VND (*)", ok: true },
  { text: "Thay đổi miễn phí", ok: true },
  { text: "Hệ số cộng điểm Bamboo Club: 1.00", ok: true },
  { text: "Chọn ghế ngồi miễn phí", ok: true },
  { text: "Đổi chuyến tại sân bay miễn phí", ok: true },
];

const EconomyFareSelect = ({ baseEconomyPrice = 2160000, onConfirm }) => {
  const [selected, setSelected] = useState("smart");
  return (
    <div className="fare-select-wrapper">
      <h3 className="fare-select-title">Chọn hạng vé</h3>
      <div className="fare-select-desc">Tiện ích với mỗi hạng khách.</div>
      <div className="fare-options-row">
        {/* SMART */}
        <div
          className={`fare-option-card ${
            selected === "smart" ? "selected" : ""
          }`}
          onClick={() => setSelected("smart")}
        >
          <div className="fare-option-header">
            <div className="fare-option-price">
              <span className="fare-option-price-value">
                {formatPrice(baseEconomyPrice)}
              </span>{" "}
              VND
            </div>
            <div className="fare-option-name">Economy Smart</div>
          </div>
          <div className="fare-option-benefits">
            {SMART_BENEFITS.map((item, idx) => (
              <div className="fare-option-benefit" key={idx}>
                {item.ok ? (
                  <span className="benefit-icon benefit-ok">✔</span>
                ) : (
                  <span className="benefit-icon benefit-no">✖</span>
                )}
                <span className={item.ok ? "" : "benefit-no-text"}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="fare-option-detail-link">
            <a href="#" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
              (*) Xem chi tiết
            </a>
          </div>
        </div>
        {/* FLEX */}
        <div
          className={`fare-option-card ${
            selected === "flex" ? "selected" : ""
          }`}
          onClick={() => setSelected("flex")}
        >
          <div className="fare-option-header">
            <div className="fare-option-price">
              <span className="fare-option-price-value">
                {formatPrice(baseEconomyPrice + 500000)}
              </span>{" "}
              VND
            </div>
            <div className="fare-option-name">Economy Flex</div>
          </div>
          <div className="fare-option-benefits">
            {FLEX_BENEFITS.map((item, idx) => (
              <div className="fare-option-benefit" key={idx}>
                <span className="benefit-icon benefit-ok">✔</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="fare-option-detail-link">
            <a href="#" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
              (*) Xem chi tiết
            </a>
          </div>
        </div>
      </div>
      <div className="fare-select-footer">
        <div className="fare-select-choose">
          ✓ Bạn đã chọn{" "}
          <b>{selected === "smart" ? "Economy Smart" : "Economy Flex"}</b>.
        </div>
        <button
          className="fare-select-confirm-btn"
          onClick={() => onConfirm?.(selected)}
        >
          Xác nhận và tiếp tục
        </button>
      </div>
    </div>
  );
};

export default EconomyFareSelect;
