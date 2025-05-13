import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // گرفتن اطلاعات کاربر از API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`http://localhost:7000/users/${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("خطا در گرفتن اطلاعات کاربر:", error);
        setLoading(false);
      });
  }, []);

  // تغییرات فرم را ذخیره می‌کنیم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  // ارسال اطلاعات تغییر یافته به سرور
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    axios.put(`http://localhost:7000/users/${userId}`, user)
      .then(response => {
        alert("مشخصات با موفقیت بروزرسانی شد!");
        navigate("/profile"); // برگشت به صفحه پروفایل بعد از ذخیره تغییرات
      })
      .catch(error => {
        console.error("خطا در بروزرسانی پروفایل:", error);
      });
  };

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">ویرایش پروفایل</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">نام</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">ایمیل</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">آدرس</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">ذخیره تغییرات</button>
      </form>
    </div>
  );
}
