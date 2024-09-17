import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Styles/CustomerBooking.css'; // Import the CSS file

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/customer-bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token if necessary
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching customer bookings:', err);
        setError('Failed to fetch customer bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="customer-bookings-container">
      <div>
        <h2 className='h2headcus'>Customer Bookings</h2>
        <table className="customer-bookings-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.emailid}</td>
                <td>{booking.service}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerBookings;
