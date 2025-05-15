import React, { createContext, useContext, useState } from "react";

// کانتکست علاقه‌مندی
const WishlistContext = createContext();

// پراوایدر علاقه‌مندی
export const WishListContextProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishList = (item) => {
    if (!wishlistItems.find((i) => i.id === item.id)) {
      setWishlistItems((prev) => [...prev, item]);
    }
  };

  const removeFromWishList = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const isInWishList = (itemId) => {
    return wishlistItems.some((item) => item.id === itemId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishList,
        removeFromWishList,
        isInWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// هوک استفاده از کانتکست علاقه‌مندی
export const useWishlist = () => useContext(WishlistContext);
