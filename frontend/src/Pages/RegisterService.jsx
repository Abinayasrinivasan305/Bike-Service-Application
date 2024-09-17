import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx'; // Adjust the path as needed

const RegisterService = () => {
    const [fullname, setFullName] = useState('');
    const [emailid, setEmailid] = useState('');
    const [model, setModel] = useState('');
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useAuth(); // Get the user object and setUser function from AuthContext

    const submitForm = async (event) => {
        event.preventDefault();
        
        // Retrieve the token from the user state
        const token = user?.token;
    
        try {
            const result = await axios.post(
                "http://localhost:8000/services/regservice",
                { fullname, emailid, model, service, date },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            console.log(result.data);
    
            // Check if the result data has a message
            if (result.data.message) {
                alert(result.data.message); // Display the server message in an alert
                navigate('/home');
            } else {
                alert("Registered successfully for the new service. Email Sent!!!");
    
                // **Update user state with the new token**
                setUser(prevUser => ({
                    ...prevUser,
                    token: result.data.token // Update the token from the server response
                }));
    
                navigate('/home');
            }
        } catch (error) {
            console.error('Axios Error:', error.response || error.message);
    
            // Check if the error response has a message
            if (error.response && error.response.data && error.response.data.message) {
                alert("An error occurred: " + error.response.data.message);
            } else {
                alert("An error occurred: " + error.message);
            }
    
            // Handle unauthorized access
            if (error.response && error.response.status === 401) {
                alert("Unauthorized: Please login again.");
                navigate('/login');
            }
        }
    };
    
    
    return (
        <div className='register-container'>
            <div className="glass-card" style={{ width: '40%' }}>
                <h2 className='register-h1'>Register For Service</h2>
                <form onSubmit={submitForm}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputName" className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="form-control"
                            id="exampleInputName"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail" className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="exampleInputEmail"
                            onChange={(e) => setEmailid(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputModel" className="form-label">
                            <strong>Bike Model</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Model"
                            className="form-control"
                            id="exampleInputModel"
                            onChange={(e) => setModel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputService" className="form-label">
                            <strong>Service</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Service"
                            className="form-control"
                            id="exampleInputService"
                            onChange={(e) => setService(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputDate" className="form-label">
                            <strong>Date</strong>
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="exampleInputDate"
                            onChange={(e) => setDate(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterService;
