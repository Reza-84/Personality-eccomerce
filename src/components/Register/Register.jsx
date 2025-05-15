// pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/users", formData);
      alert("ثبت‌نام موفقیت‌آمیز بود!");
      navigate("/login");
    } catch (error) {
      alert("خطا در ثبت‌نام!");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>ثبت‌نام</h2>
      <form onSubmit={handleSubmit}>
        <label>نام کامل</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>ایمیل</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>رمز عبور</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">ثبت‌نام</button>
      </form>
      <div className="auth-footer">
        قبلاً حساب دارید؟ <Link to="/login">ورود</Link>
      </div>
    </div>
  );
}
