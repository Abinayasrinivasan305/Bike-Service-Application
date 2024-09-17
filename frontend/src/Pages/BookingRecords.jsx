import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/BookingRecords.css'; // Import the CSS file


const BookingRecords = () => {
    const [records, setRecords] = useState([]);
    const { user } = useAuth(); // Get the user object (with token) from AuthContext

    useEffect(() => {
        const fetchBookingRecords = async () => {
            try {
                const token = user?.token; // Get the token from user object
                const result = await axios.get("http://localhost:8000/booking-records", {
                    headers: {
                        'Authorization': `Bearer ${token}` // Send the token in the request
                    }
                });
                setRecords(result.data); // Update state with booking records
            } catch (error) {
                console.error("Error fetching booking records", error);
            }
        };

        fetchBookingRecords();
    }, [user]);

    return (
        <div className="container mt-5">
            <h2 className="bookh1">Your Booking Records</h2>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Bike Model</th>
                        <th>Service Type</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{record.fullname}</td>
                            <td>{record.emailid}</td>
                            <td>{record.model}</td>
                            <td>{record.service}</td>
                            <td>{record.date}</td>
                            {record.status==="pending"?<td style={{color:"red",fontFamily:'cursive'}}>{record.status}</td>:<td style={{color:"green",fontFamily:"cursive"}}>{record.status}</td>}
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingRecords;
