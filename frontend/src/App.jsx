import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NavbarMain from "./components/NavbarMain";
import UserContext from "./context/UserContext";
import DetailListing from "./pages/DetailListing";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/blog/:id" element={<DetailListing />} />
        <Route path="/blog/create" element={<CreateBlog />} />
      </Routes>
    </>
  );
}

export default App;
