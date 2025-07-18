import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import NavBar from "./componenets/NavBar";
import Footer from "./componenets/Footer";
import SearchBar from "./componenets/SearchBar";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vh] md:px-[7vh] lg:px-[10vh]">
      <ToastContainer position="bottom-right" theme="dark" />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
