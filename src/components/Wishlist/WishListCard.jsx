import React from "react";

export default function WishListCard({ data, onToggle }) {
  return (
    <div className="col-6">
      <div className="shop-card">
        <div className="dz-media">
          <a>
            <img src={data.image} alt={data.name} />
          </a>
          <a
            className="item-bookmark active"
            onClick={onToggle}
            style={{ cursor: "pointer" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-heart"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </a>
        </div>
        <div className="dz-content">
          <span className="font-12">{data.name}</span>
          <h6 className="title">
            <a href="product-detail.html">{data.describe}</a>
          </h6>
          <h6 className="price">
            {data.offerprice}
            <del>{data.price}</del>
          </h6>
        </div>
        <div className="product-tag">
          <span className="badge badge-secondary">{data.off}</span>
        </div>
      </div>
    </div>
  );
}
