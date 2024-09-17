import { Routes, Route } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel';
import AdminNavbar from './Navbar/AdminNavbar.jsx';
import CustomerBookings from './Pages/CustomerBookings'; // Import the new component
import './global.css';

const AppAdmin = () => {
  return (
    <>
      <AdminNavbar /> {/* Admin Navbar */}
      <Routes>
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/customer-bookings" element={<CustomerBookings />} /> {/* New route */}
      </Routes>
    </>
  );
};

export default AppAdmin;
