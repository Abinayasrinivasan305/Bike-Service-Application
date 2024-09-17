import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import { useAuth } from "../Context/AuthContext.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Toggle the menu open or closed
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Call logout function from AuthContext
      await logout();
      
      // After logout, redirect to the login page
      navigate('/login');
      
      // Optionally close the menu after logout
      handleToggleMenu();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <header className="header">
      <nav className="nav">
        {/* Logo */}
        <NavLink to="/" className="nav__logo">
          Gear Up!!!
        </NavLink>

        {/* Navigation menu (with conditional class for open/close) */}
        <div className={`nav__list ${isMenuOpen ? "show-menu" : ""}`}>
          <ul className="nav__menu">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={handleToggleMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about-us" className="nav__link" onClick={handleToggleMenu}>
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/services" className="nav__link" onClick={handleToggleMenu}>
                Services
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/booking-records" className="nav__link" onClick={handleToggleMenu}>
                Booking Records
              </NavLink>
            </li>
            {/* Login/Logout button as the last menu item */}
            {user ? (
              <li className="nav__item">
                <NavLink to="/" className="nav__link1" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav__item">
                <NavLink to="/login" className="nav__link" onClick={handleToggleMenu}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
          {/* Close button for the mobile menu */}
          <div className="nav__close" onClick={handleToggleMenu}>
            <IoClose />
          </div>
        </div>

        {/* Toggle button for the mobile menu */}
        <div className="nav__toggle" onClick={handleToggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
