import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
const NavbarMain = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    toast.success("Logged out successfully")
    navigate("/auth");
    setMenuOpen(false);

  };
  const handleMyBlog=()=>{
    navigate("/blog/my-blogs");
    setMenuOpen(false);
  }

  const handleCreateBlog = () => {
    navigate(user ? "/blog/create" : "/auth");
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-content">
        <div className="navbar-logo" onClick={() => navigate("/")}>BLOGS</div>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span>
        <GiHamburgerMenu size={20}/>
        </span>
        </button>

        <div className={`navbar-actions ${menuOpen ? "show" : ""}`}>
          {!user ? (
            <button className="navbar-button" onClick={() => {
              navigate("/auth");
              setMenuOpen(false)
            }}>
              Sign-In/Sign-Up
            </button>
          ) : (
            <>
              <span style={{textTransform:"capitalize"}}>Welcome "{user?.username}"</span>
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
              <button className="navbar-button" onClick={handleMyBlog}>
                My Blogs
              </button>
            </>
          )}
          <button style={{display:"flex",alignItems:"center",gap:"2px",justifyContent:"center"}} className="navbar-button" onClick={handleCreateBlog}>
          <FaPlus />
          <span> Create Blog</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
