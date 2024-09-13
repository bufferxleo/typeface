// src/screens/Admin.jsx
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../components/adminComponents/Auth";
import Header from "../common/Header";

function Admin() {
  return (
    <>
      <Header />
      <div className="w-[450px] flex flex-col items-center justify-center mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 px-4 mb-4">
          Welcome to Admin Page
        </h1>
        <Link to='/'>Home</Link>
        <Auth />
      </div>
    </>
  );
}

export default Admin;
