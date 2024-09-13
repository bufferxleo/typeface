import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./screens/Start";
import Admin from "./screens/Admin";
import Restaurant from "./screens/Restaurant";
import AdvSearch from "./screens/AdvSearch";
import IndRest from "./screens/IndRest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/rest" element={<Restaurant />} />
          <Route path="/adv" element={<AdvSearch />} />
          <Route path="/ind-rest/:id" element={<IndRest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
