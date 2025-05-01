import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const NavbarMain = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser } = useUserContext();  
  const navigate = useNavigate();
useEffect(()=>{

},[user])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const handleLogout = () => {
  
    setUser(null);  
    localStorage.removeItem("userToken"); 
    navigate("/auth");  
  };


  const handleCreateBlog = () => {
    if (!user) {
      navigate("/auth");  
    } else {
      navigate("/create-blog");  
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-content">
        <div className="navbar-logo" onClick={() => navigate("/")}>BLOGS</div>
        <div className="navbar-actions">
       
          {!user ? (
            <button className="navbar-button" onClick={() => navigate("/auth")}>
              Sign-In/Sign-Up
            </button>
          ) : (
         
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          )}
         
          <button className="navbar-button" onClick={handleCreateBlog}>
            + Create Blog
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
