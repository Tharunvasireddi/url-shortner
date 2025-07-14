import React from "react";
import Homepage from "./pages/Homepage";
import LoginForm from "./components/LoginForm";
import AuthPage from "./pages/AuthPage";
import RegisterForm from "./components/RegisterForm";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
