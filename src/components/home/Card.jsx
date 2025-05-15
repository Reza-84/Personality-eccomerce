import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";
// import { useWishlist } from "../../context/WishListContext";

const Card = ({ item }) => {
  const { addToWishList, removeFromWishList, isInWishList } = useWishlist();
  const isLiked = isInWishList(item.id);

  const handleLikeClick = (e) => {
    e.preventDefault(); // نذاره لینک کلیک بشه

    if (isLiked) {
      removeFromWishList(item.id);
    } else {
      addToWishList(item);
    }
  };

  return (
    <div className="col-6">
      <div className="shop-card">
        <div className="dz-media">
          <Link to={`/product/${item.id}`}>
            <img src={item.image} alt={item.title} />
          </Link>
          <a
            href="#!"
            className={`item-bookmark${isLiked ? " active" : ""}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
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
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </a>
        </div>
        <div className="dz-content">
          <span className="font-12">{item.category || "T-Shirt"}</span>
          <h6 className="title">
            <Link to={`/product/${item.id}`}>{item.title}</Link>
          </h6>
          <h6 className="price">
            {item.offerPrice
              ? `$${item.offerPrice} <del>$${item.price}</del>`
              : `$${item.price}`}
          </h6>
        </div>
        {item.off && (
          <div className="product-tag">
            <span className="badge badge-secondary">{item.off}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
