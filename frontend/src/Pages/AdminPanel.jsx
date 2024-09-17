import React, { useState } from 'react';
import axios from 'axios';
import './Styles/AdminPanel.css'; // Import the CSS file
import { useAuth } from '../Context/AuthContext'; // Ensure correct path

const AdminPanel = () => {
    const [email, setEmail] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const { user } = useAuth(); // Access `user` from the context

    const searchByEmail = async () => {
        console.log('Searching for email:', email); // Debug statement
        try {
            const result = await axios.post('http://localhost:8000/admin/search', { email }, {
                headers: {
                    'Authorization': `Bearer ${user?.token}` // Access token from user
                }
            });
            console.log('Fetched registrations:', result.data); // Debug statement
            setRegistrations(result.data);
        } catch (error) {
            console.error('Error fetching registrations:', error.response?.data || error.message);
        }
    };

    const updateStatus = async (id, newStatus) => {
        console.log('Updating status for ID:', id, 'New Status:', newStatus); // Debug statement
        try {
          await axios.patch(`http://localhost:8000/admin/update-status/${id}`, 
            { status: newStatus },
            {
              headers: {
                'Authorization': `Bearer ${user?.token}`
              }
            }
          );
      
          // Fetch updated list after status change
          searchByEmail(); // Reuse searchByEmail to refresh the list
      
          alert('Status updated successfully!');
        } catch (error) {
          console.error('Error updating status:', error.response?.data || error.message);
        }
      };
      
    console.log('Rendering AdminPanel'); // Debug statement

    return (
        <div className="admin-panel-container">
            <div className="glass-card">
                <h2 className='h2head'>Admin Panel - Search User by Email</h2>
                <div className="search-container">
                    <input 
                        type="email" 
                        placeholder="Enter user email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={searchByEmail}>Search</button>
                </div>

                {registrations.length > 0 ? (
                    <ul className="registration-list">
                        {registrations.map(reg => (
                            <li key={reg._id}>
                                <p>{reg.fullname} - {reg.service} - Status: {reg.status}</p>
                                {reg.status === 'pending' && (
                                    <button onClick={() => updateStatus(reg._id, 'completed')}>
                                        Mark as Completed
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No registrations found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
