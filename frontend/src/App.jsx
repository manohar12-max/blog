import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NavbarMain from "./components/NavbarMain";
import DetailBlog from "./pages/DetailBlog";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";
import NotFound from "./pages/NotFound";
  
function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" replace />} />
        <Route path="/blogs" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/blog/:id" element={<DetailBlog />} />
        <Route path="/blog/my-blogs" element={<MyBlogs />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
