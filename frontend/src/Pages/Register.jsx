import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Import useAuth hook
import "./Styles/Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth(); // Destructure login from useAuth
    const navigate = useNavigate();

    const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const submitForm = async (event) => {
        event.preventDefault();
        let validationErrors = {};
    
        // Validate input
        if (!validateName(name)) {
            validationErrors.name = "Name must be at least 3 characters long and should not contain special characters or numbers.";
        }
        if (!validateEmail(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (!validatePassword(password)) {
            validationErrors.password = "Password must be at least 6 characters long.";
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const result = await axios.post("http://localhost:8000/register", { name, email, password });
    
            if (result.data.success) { // Ensure you're checking the success status
                login(result.data.token); // Call login from context
                alert(`Registered successfully! Welcome ${name}`);
                navigate('/login');
            } else {
                alert(result.data.message || "Registration failed.");
            }
        } catch (err) {
            console.error("Error details:", err);
    
            if (err.response) {
                // Error response from the server
                console.error("Backend response error:", err.response.data);
    
                if (err.response.status === 400) {
                    // Handle specific cases for status code 400
                    alert(err.response.data.message || "Bad Request: Please check your input.");
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            } else {
                // Network or other errors
                alert("An unexpected error occurred. Please check your connection and try again.");
            }
        }
    };
    
    
    

    return (
        <div className="register-container">
            <div className="glass-card" style={{ width: '40%' }}>
                <h2 className='register-h1'>Register</h2>
                <form onSubmit={submitForm}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputName" className="form-label"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="exampleInputName"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail" className="form-label"><strong>Email Id</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="exampleInputEmail"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword" className="form-label"><strong>Password</strong> (at least six characters)</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="exampleInputPassword"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

                <p className='container my-2'>Already have an account?</p>
                <Link to='/login' className="btn btn-secondary">Login</Link>
            </div>
        </div>
    );
};

export default Register;
