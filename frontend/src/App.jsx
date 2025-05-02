import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NavbarMain from "./components/NavbarMain";
import DetailListing from "./pages/DetailListing";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";

function App() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/blog/:id" element={<DetailListing />} />
        <Route path="/blog/my-blogs" element={<MyBlogs />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
}

export default App;
