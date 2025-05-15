import React from "react";
import WishListHeader from "./WishListHeader";
import WishListMain from "./WishListMain";

export default function WishListPage() {
  return (
    <>
      <WishListHeader title="لیست علاقه‌مندی‌ها" />
      <WishListMain />
      {/* MenuBar در App.jsx هست و نیازی به اضافه کردن دوباره نیست */}
    </>
  );
}
