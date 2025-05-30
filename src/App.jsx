import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import Home from "./Pages/Home";
import Allbooks from "./Pages/Allbook";
import Profile from "./UserInfo/Profile";
import Signin from "./UserInfo/Signin";
import Login from "./UserInfo/Login";
import ProfileUpdate from "./UserInfo/Profileupdate";
import Visit from "./Pages/Visit";
import Wishlist from "./Pages/Wishlist";
import Forgetpass from "./UserInfo/Forgetpass";
import { useState } from "react";
import Footer from "./UserInfo/Footer";
import Searchitem from "./Pages/Searchitem";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

export default function App() {

  let [cart, setcart] = useState([]);

  return (
    <div>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allbooks" element={<Allbooks setcart={setcart} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/visit/:id" element={<Visit />} />
            <Route path="/wishlist" element={<Wishlist cart={cart} setcart={setcart} />} />
            <Route path="/searchitem" element={<Searchitem />} />
            <Route path="/forgetpassword" element={<Forgetpass />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </div>
  );
}
