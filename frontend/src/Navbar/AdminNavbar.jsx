import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import { useAuth } from '../Context/AuthContext.jsx'; // Adjust the path as needed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout from AuthContext

  // Toggle the menu open or closed
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Call logout function from AuthContext
      await logout();
      
      // After the logout is complete, navigate to the root URL
      navigate('/');
      
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
              <NavLink to="/admin/adminpanel" className="nav__link" onClick={handleToggleMenu}>
                Admin Panel
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/admin/customer-bookings" className="nav__link" onClick={handleToggleMenu}>
                Customer Bookings
              </NavLink>
            </li>

            {/* Logout Link */}
            <li className="nav__item">
              <NavLink to="#" className="nav__link1" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
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
