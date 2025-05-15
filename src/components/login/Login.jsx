import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // استفاده از کانتکست
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:7000/users");
      const user = res.data.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        login(user); // ذخیره در کانتکست + localStorage
        alert("ورود موفقیت‌آمیز بود!");
        navigate("/"); // یا هر صفحه‌ای که بخوای
      } else {
        alert("ایمیل یا رمز عبور اشتباه است!");
      }
    } catch (error) {
      alert("خطا در ورود!");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>ورود</h2>
      <form onSubmit={handleSubmit}>
        <label>ایمیل</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>رمز عبور</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">ورود</button>
      </form>
      <div className="auth-footer">
        حساب کاربری ندارید؟ <Link to="/register">ثبت‌نام</Link>
      </div>
    </div>
  );
}
