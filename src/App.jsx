import { useState } from "react";
import Header from "./components/home/HomeHeader";
import MenuBar from "./components/MenuBar";
import SideBar from "./components/home/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/home/Main";
import HomePage from "./components/home/HomePage";
import CategoriMain from "./components/Categories/CategoriMain";
import CategoriPage from "./components/Categories/CategoriPage";
import ProfilePage from "./components/Profile/ProfilePage";
import WishListPage from "./components/Wishlist/WishListPage";
import CartPage from "./components/cart/CartPage";
import Orders from "./components/orders/Orders";
import EditProfile from "./components/Editprifile/Editprofile";
import Address from "./components/Address/Address";
import Register from "./components/Register/Register";
import Login from "./components/login/Login";
import { WishListContextProvider, useWishlist } from "./context/WishListContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <WishListContextProvider>
        <BrowserRouter>
          <MenuBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/categori" element={<CategoriPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/address" element={<Address />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </WishListContextProvider>
    </AuthProvider>
  );
}

export default App;
