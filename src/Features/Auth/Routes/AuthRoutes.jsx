import React from "react";
import Signup from "../Pages/signup";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login";
import { Route, Routes } from "react-router";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
