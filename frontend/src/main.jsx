import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import AppAdmin from './AppAdmin';
import { AuthProvider, useAuth } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootApp = () => {
  const { user } = useAuth(); // Check if user is logged in and if they are an admin
  
  // Assuming `isAdmin` is a boolean value in the user object that determines if the user is an admin.
  const isAdmin = user?.email === "john24@gmail.com"; // Adjust logic to your admin check
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to either the admin panel or user home depending on user type */}
        <Route path="/" element={<Navigate to={isAdmin ? "/admin/adminpanel" : "/home"} />} />
        
        {/* Regular user routes */}
        <Route path="/*" element={<App />} />
        
        {/* Admin routes */}
        <Route path="/admin/*" element={<AppAdmin />} />
        
        {/* Add a catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  </React.StrictMode>
);
