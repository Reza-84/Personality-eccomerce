import { useWishlist } from "../../context/WishListContext";
// import { useWishlist } from "../../context/WishListContext";
import WishListCard from "./WishListCard";

export default function WishListMain() {
  const { wishlistItems, removeFromWishList } = useWishlist();

  if (wishlistItems.length === 0) {
    return <div>لیست علاقه‌مندی‌ها خالی است.</div>;
  }

  return (
    <div className="page-content space-top p-b80">
      <div className="container">
        <div className="row g-3">
          {wishlistItems.map((item) => (
            <WishListCard
              key={item.id}
              data={item}
              onToggle={() => removeFromWishList(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
