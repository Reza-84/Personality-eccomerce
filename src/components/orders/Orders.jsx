import axios from "axios";
import { useEffect, useState } from "react";
import WishListHeader from "../Wishlist/WishListHeader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // گرفتن userId از localStorage
    if (!userId) return;

    setLoading(true); // شروع بارگذاری داده‌ها

    axios.get("http://localhost:7000/orders", {
      params: { userId: userId }, // ارسال userId به سرور
    })
    .then(response => {
      setOrders(response.data); // ذخیره سفارشات دریافتی
      setLoading(false); // اتمام بارگذاری
    })
    .catch(error => {
      console.error("خطا در گرفتن سفارشات:", error);
      setLoading(false);
    });
  }, [localStorage.getItem("userId")]); // اضافه کردن userId به دپندنس‌های useEffect برای واکنش به تغییرات آن

  if (loading) return <p>در حال بارگذاری سفارشات...</p>;
  if (orders.length === 0) return <p>هیچ سفارشی یافت نشد.</p>;

  return (
    <>
      <WishListHeader title={"orders"} />
      <div className="container py-4">
        <h2 className="mb-4">سفارش‌های من</h2>
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              <strong>سفارش #{order.id}</strong> - مجموع: {order.total} تومان
              <br />
              <span>تاریخ: {order.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
