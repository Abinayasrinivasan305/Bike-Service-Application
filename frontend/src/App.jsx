import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext'; // Adjust the path as needed
import Navbar from './Navbar/Navbar.jsx'; // Adjust the path as needed
import Home from './Pages/Home.jsx'; // Adjust the path as needed
import AboutUs from './Pages/AboutUs.jsx'; // Adjust the path as needed
import Register from './Pages/Register.jsx'; // Adjust the path as needed
import Login from './Pages/Login.jsx'; // Adjust the path as needed
import BookingRecords from './Pages/BookingRecords.jsx'; // Adjust the path as needed
import Services from './Pages/Services.jsx'; // Adjust the path as needed
import ProtectedRoute from './Pages/ProtectedRoute.jsx'; // Adjust the path as needed
import RegisterService from './Pages/RegisterService.jsx';
import './global.css';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/login" /> : <Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/regservice" element={<RegisterService />} />
          <Route path="/booking-records" element={<BookingRecords />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
