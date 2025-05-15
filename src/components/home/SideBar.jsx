import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar({ isOpen, isclose }) {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [iconAnimation, setIconAnimation] = useState("");

  useEffect(() => {
    const toggle = document.getElementById("toggle-dark-menu");
    if (!toggle) return;

    const handleToggle = (e) => {
      if (e.target.checked) {
        setIconAnimation("animate-out");
        setTimeout(() => {
          document.body.classList.add("dark");
          localStorage.setItem("theme", "dark");
          setIsDark(true);
          setIconAnimation("animate-in");
        }, 200);
      } else {
        setIconAnimation("animate-out");
        setTimeout(() => {
          document.body.classList.remove("dark");
          localStorage.setItem("theme", "light");
          setIsDark(false);
          setIconAnimation("animate-in");
        }, 200);
      }
    };

    toggle.addEventListener("change", handleToggle);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      toggle.checked = true;
      document.body.classList.add("dark");
      setIsDark(true);
    }

    return () => {
      toggle.removeEventListener("change", handleToggle);
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get(`http://localhost:7000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("خطا در گرفتن اطلاعات کاربر:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    window.location.reload(); // می‌تونی این رو با ریدایرکت یا روش بهتر هم جایگزین کنی
  };

  return (
    <div
      className={`sidebar ${isOpen ? "show" : ""}`}
      style={{ backgroundImage: "url('images/background/bg3.png')" }}
    >
      <a href="profile.html" className="author-box">
        <div className="dz-media">
          <img src="/images/user-profile.jpg" alt="author-image" />
        </div>
        <div className="dz-info">
          {user ? (
            <>
              <h5 className="name">{user.name}</h5>
              <span>{user.email}</span>
            </>
          ) : (
            <>
              <h5 className="name">کاربر مهمان</h5>
              <span>لطفا وارد شوید</span>
            </>
          )}
        </div>
      </a>

      <ul className="nav navbar-nav">
        <li>
          <Link to="/" className="nav-link active" onClick={isclose}>
            <span className="dz-icon">
              <i className="icon feather icon-home side-icon"></i>
            </span>
            <span>Home</span>
          </Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login" className="nav-link active">
                <span className="dz-icon">
                  <i className="icon feather icon-log-in side-icon"></i>
                </span>
                <span>ورود</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link active">
                <span className="dz-icon">
                  <i className="icon feather icon-user-plus side-icon"></i>
                </span>
                <span>ثبت‌نام</span>
              </Link>
            </li>
          </>
        )}

        <li>
          <a className="nav-link active" href="index.html">
            <span className="dz-icon">
              <i className="icon feather icon-grid side-icon"></i>
            </span>
            <span>Components</span>
          </a>
        </li>
        <li>
          <a className="nav-link active" href="index.html">
            <span className="dz-icon">
              <i className="icon feather icon-grid side-icon"></i>
            </span>
            <span>Pages</span>
          </a>
        </li>
        <li>
          <a className="nav-link active" href="index.html">
            <span className="dz-icon">
              <i className="icon feather icon-list side-icon"></i>
            </span>
            <span>Featured</span>
          </a>
        </li>
        <li>
          <Link to="/wishlist" className="nav-link active">
            <span className="dz-icon">
              <i className="icon feather icon-heart side-icon"></i>
            </span>
            <span>Wishlist</span>
          </Link>
        </li>
        <li>
          <a className="nav-link active" href="index.html">
            <span className="dz-icon">
              <i className="icon feather icon-repeat side-icon"></i>
            </span>
            <span>Orders</span>
          </a>
        </li>
        <li>
          <Link to="/cart" className="nav-link active">
            <span className="dz-icon">
              <i className="icon feather icon-shopping-cart side-icon"></i>
            </span>
            <span>My Cart</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link active">
            <span className="dz-icon">
              <i className="icon feather icon-user side-icon"></i>
            </span>
            <span>Profile</span>
          </Link>
        </li>

        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="nav-link active btn-logout"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <span className="dz-icon">
                <i className="icon feather icon-log-out side-icon"></i>
              </span>
              <span>خروج از حساب کاربری</span>
            </button>
          </li>
        )}
      </ul>

      <div className="sidebar-bottom">
        <ul className="app-setting">
          <li className="nav-color pb-2">
            <a
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
            >
              <span className="dz-icon">{/* آیکون رنگ */}</span>
              <span>Color Theme</span>
              <div className="color-active ms-auto">
                <span>Active</span>
                <div className="current-color"></div>
              </div>
            </a>
          </li>

          <li>
            <a className="mode" href="#">
              <span className="dz-icon">
                <i
                  className={`icon feather ${
                    isDark ? "icon-moon" : "icon-sun"
                  } theme-icon ${iconAnimation}`}
                ></i>
              </span>
              <span>Dark Mode</span>
              <div className="custom-switch">
                <input
                  type="checkbox"
                  className="switch-input theme-btn"
                  id="toggle-dark-menu"
                />
                <label
                  className="custom-switch-label"
                  htmlFor="toggle-dark-menu"
                ></label>
              </div>
            </a>
          </li>
        </ul>

        <div className="app-info">
          <h6 className="name">W3Cart Fashion Store</h6>
          <span className="ver-info">App Version 1.0</span>
        </div>
      </div>
    </div>
  );
}
