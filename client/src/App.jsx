import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Services from "./components/products/Services";
import Protected from "./components/Protected";
import Admin from "./components/Admin/Admin";
import Cart from "./components/Payment/Cart";
import AdminProtected from "./components/AdminProtected";
import MainAdmin from "./components/Admin/MainAdmin";
import ListProducts from "./components/Admin/ListProducts";
import { ToastContainer } from "react-toastify";
import ListUsers from "./components/Admin/ListUsers";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const tokenExists = !!localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(tokenExists);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (tokenExists) {
      const token = localStorage.getItem("token");
      console.log("Token exists:", token);
      fetch("http://localhost:5000/userEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User data:", data);
          if (data.status === "ok") {
            setIsAdmin(data.user.isAdmin);
            console.log("isAdmin set to:", data.user.isAdmin);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setIsAdmin(false);
        });
    }
  }, [tokenExists]);

  //stripe
  const stripePromise = loadStripe("your-publishable-key-here");

  return (
    <>
      <ToastContainer />
      <Router>
        <Nav isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {isAdmin ? (
            <Route
              path="/admin"
              element={
                <AdminProtected isAdmin={isAdmin}>
                  <MainAdmin />
                </AdminProtected>
              }
            />
          ) : (
            <>
              <Route
                path="/services"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Services />
                  </Protected>
                }
              />
              <Route
                path="/cart"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Elements stripe={stripePromise}>
                      <Cart />
                    </Elements>
                  </Protected>
                }
              />
            </>
          )}
          <Route path="/admin/products" element={<ListProducts />} />
          <Route path="/admin/users" element={<ListUsers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
