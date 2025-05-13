import { useEffect, useState } from "react";
import axios from "axios";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const userId = 1; // فعلاً ثابت

  // تنظیم آدرس پیش‌فرض
  const setDefaultAddress = async (id) => {
    try {
      // همه آدرس‌ها رو به غیر از این آدرس false می‌کنیم
      const resetRequests = addresses.map((addr) =>
        axios.patch(`http://localhost:7000/addresses/${Number(addr.id)}`, {
          isDefault: false,
        })
      );
      await Promise.all(resetRequests);
  
      // حالا آدرس مورد نظر رو پیش‌فرض می‌کنیم
      await axios.patch(`http://localhost:7000/addresses/${Number(id)}`, {
        isDefault: true,
      });
  
      // داده‌ها رو دوباره می‌گیریم
      const res = await axios.get("http://localhost:7000/addresses", {
        params: { userId }
      });
      setAddresses(res.data);
  
      console.log("✅ آدرس پیش‌فرض تنظیم شد.");
    } catch (error) {
      console.error("❌ خطا در تنظیم آدرس پیش‌فرض:", error.message);
      alert("مشکلی در تنظیم آدرس پیش‌فرض پیش آمد.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/addresses", {
        params: { userId },
      })
      .then((res) => {
        setAddresses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در گرفتن آدرس‌ها:", err);
        setLoading(false);
      });
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (newAddress.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:7000/addresses", {
        userId,
        address: newAddress,
        isDefault: false,
      });

      setAddresses([...addresses, response.data]);
      setNewAddress("");
    } catch (error) {
      console.error("خطا در افزودن آدرس:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/addresses/${id}`);
      setAddresses(addresses.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error("خطا در حذف آدرس:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:7000/addresses/${id}`,
        {
          address: editingText,
        }
      );
      setAddresses(
        addresses.map((addr) =>
          addr.id === id ? response.data : addr
        )
      );
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error("خطا در ویرایش آدرس:", err);
    }
  };

  if (loading) return <p>در حال بارگذاری آدرس‌ها...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">آدرس‌های من</h2>

      {addresses.length === 0 ? (
        <p>هیچ آدرسی ثبت نشده است.</p>
      ) : (
        <ul className="list-group mb-4">
          {addresses.map((addr) => (
            <li
              key={addr.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingId === addr.id ? (
                <>
                  <div className="flex-grow-1 me-3">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdate(addr.id)}
                    >
                      ذخیره
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      لغو
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow-1 me-3">
                    <span>{addr.address}</span>
                    {addr.isDefault && (
                      <span className="badge bg-success ms-2">پیش‌فرض</span>
                    )}
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setEditingId(addr.id);
                        setEditingText(addr.address);
                      }}
                    >
                      ویرایش
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(addr.id)}
                    >
                      حذف
                    </button>
                    {!addr.isDefault && (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setDefaultAddress(addr.id)}
                      >
                        تنظیم به عنوان پیش‌فرض
                      </button>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddAddress}>
        <div className="mb-3">
          <label htmlFor="addressInput" className="form-label">
            آدرس جدید:
          </label>
          <input
            id="addressInput"
            type="text"
            className="form-control"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="مثلاً تهران، خیابان شریعتی..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          افزودن آدرس
        </button>
      </form>
    </div>
  );
}
