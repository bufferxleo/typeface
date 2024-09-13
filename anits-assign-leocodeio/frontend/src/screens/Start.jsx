import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";

function Start() {
  return (
    <div className="h-screen overflow-hidden" >
      <Header />
      <div className="flex flex-col items-center justify-center h-full bg-gray-100" style={{
      backgroundImage: `url('./zomato-bg.png')`, 
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg bg-opacity-70 p-20">
        <p className="text-2xl font-bold text-gray-800 mb-6">Get Started</p>
          <Link
            to="/admin"
            className="bg-blue-500 flex items-center justify-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Admin
          </Link>
          <Link
            to="/rest"
            className="bg-green-500 flex items-center justify-center gap-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
