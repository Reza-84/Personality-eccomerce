import { useState } from "react";
import Header from "./components/home/HomeHeader";
import MenuBar from "./components/MenuBar";
import SideBar from "./components/home/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Routes from "./utils/Routes";
import Main from "./components/home/Main";
import HomePage from "./components/home/HomePage";
import CategoriMain from "./components/Categories/CategoriMain";
import CategoriPage from "./components/Categories/CategoriPage";
import ProfilePage from "./components/Profile/ProfilePage";
import WishListPage from "./components/Wishlist/WishListPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <MenuBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/categori" element={<CategoriPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
