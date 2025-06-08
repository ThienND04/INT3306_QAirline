import React, { useEffect, useState } from "react";
import userApiService from "../../../services/UserApiService";
import "./UserProfile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// const userApi = new UserApiService();

function UserProfile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchUser() {
        try {
        const res = await userApiService.getCurrentUser();
        setUser(res.user);
        setForm(res.user);
        } catch (e) {
        setMsg("Không thể tải thông tin người dùng.");
        } finally {
        setLoading(false);
        }
    }
    fetchUser();
 }, []);

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};


  if (loading) return <div>Đang tải...</div>;
  if (!user) return <div>Không tìm thấy thông tin người dùng.</div>;

  return (
    <>
      <Header />
    <div className="user-profile-container">
      <h2>Thông tin cá nhân</h2>
      {msg && <div className="profile-msg">{msg}</div>}
      <form className="user-profile-form">
        <div className="profile-row">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
          <label>Họ:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
          <label>Tên:</label>
          <input
            type="text"
            name="middleAndFirstName"
            value={form.middleAndFirstName || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
          <label>Giới tính:</label>
          <input
            type="text"
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
            <label>Ngày sinh:</label>
            <input
                type="date"
                name="birthDate"
                value={
                    form.birthDate
                    ? typeof form.birthDate === "string"
                        ? form.birthDate.slice(0, 10)
                        : form.birthDate.year && form.birthDate.month && form.birthDate.day
                        ? `${form.birthDate.year}-${String(form.birthDate.month).padStart(2, "0")}-${String(form.birthDate.day).padStart(2, "0")}`
                        : ""
                    : ""
                }
                onChange={handleChange}
                disabled={!edit}
            />
        </div>
        <div className="profile-row">
          <label>Quốc tịch:</label>
          <input
            type="text"
            name="nationality"
            value={form.nationality || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="profile-row">
          <label>Ngôn ngữ:</label>
          <input
            type="text"
            name="language"
            value={form.language || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
      </form>
    </div>
      <Footer />
    </>
  );
}

export default UserProfile;