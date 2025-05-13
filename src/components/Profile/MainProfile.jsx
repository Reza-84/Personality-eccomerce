import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MainProfile(){
	const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
	const userId = localStorage.getItem("userId");
	if (!userId) return;
  
	axios.get(`http://localhost:7000/users/${userId}`)
	  .then(response => {
		console.log(response.data);
		setUser(response.data);
	  })
	  .catch(error => {
		console.error('خطا در گرفتن اطلاعات کاربر:', error);
	  });
  
	axios.get("http://localhost:7000/orders", {
	  params: { userId: userId }
	})
	  .then(response => {
		setOrders(response.data);
	  })
	  .catch(error => {
		console.error('خطا در گرفتن سفارشات:', error);
	  });
  }, []);

  if (!user) return <p>در حال بارگذاری...</p>;

    return<>
        <div className="page-content space-top">
            <div className="container">
            <div className="profile-area">
				<div className="main-profile">
					<div className="media media-60 me-3 rounded-circle">
						<img src="/images/user-profile.jpg" alt="profile-image" />
					</div>
					<div className="profile-detail">
						<h6 className="name">{user.name}</h6>
						<span className="font-12">{user.id}</span>
					</div>
					<Link to="/editprofile" className="edit-profile">
						<i className="icon feather icon-edit-2"></i>
					</Link>
				</div>
				<div className="content-box">
					<ul className="row g-2">
						<li className="col-6">							
							<Link to="/orders">
								<div className="dz-icon-box">
									<i className="icon feather icon-package"></i>
								</div>
								<span>Orders</span>
							</Link>
						</li>
						
						<li className="col-6">							
							<Link to="/wishlist">
								<div className="dz-icon-box">
									<i className="icon feather icon-heart"></i>
								</div>
								<span>Wishlist</span>
							</Link>
						</li>
						<li className="col-6">							
							<a href="coupon.html">
								<div className="dz-icon-box">
									<i className="icon feather icon-gift"></i>
								</div>
								<span>Coupons</span>
							</a>
						</li>
						<li className="col-6">							
							<a href="javascript:void(0);">
								<div className="dz-icon-box">
									<i className="icon feather icon-headphones"></i>
								</div>
								<span>Help Center</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="title-bar">
					<h6 className="title mb-0 font-w700">Account Settings</h6>
				</div>
				<div className="dz-list style-1">
					<ul>
						<li>
							<Link to="/editprofile" className="item-content item-link">
								<div className="dz-icon">
									<i className="icon feather icon-user"></i>
								</div>
								<div className="dz-inner">
									<span className="title">Edit Profile</span>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/address" className="item-content item-link">
								<div className="dz-icon">
									<i className="icon feather icon-map-pin"></i>
								</div>
								<div className="dz-inner">
									<span className="title">Saved Addresses</span>
								</div>
							</Link>
						</li>
						<li>
							<a href="javascript:void(0);" className="item-content item-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLang" aria-controls="offcanvasLang">
								<div className="dz-icon">
									<i className="icon feather icon-type"></i>
								</div>
								<div className="dz-inner">
									<span className="title select-lang">Select Language</span>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" className="item-content item-link">
								<div className="dz-icon">
									<i className="icon feather icon-bell"></i>
								</div>
								<div className="dz-inner me-2">
									<span className="title">Notification Setting</span>
								</div>
								<div className="badge badge-primary">5</div>
							</a>
						</li>
						<li>
							<a href="welcome.html" className="item-content item-link">
								<div className="dz-icon">
									<i className="icon feather icon-log-out"></i>
								</div>
								<div className="dz-inner">
									<span className="title">Log Out</span>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
            </div>
        </div>
    </>
}