import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Import useAuth hook
import "./Styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth(); // Destructure login from useAuth
    const navigate = useNavigate();
    const submitForm = async (event) => {
        event.preventDefault();
        try {
          const result = await axios.post("http://localhost:8000/login", { email, password });
          
          if (result.data.success) {
            // Store the token and handle redirection
            login(email, password); // Assuming login function in AuthContext handles setting the token
            navigate(result.data.redirect); // Redirect based on the response
          } else {
            setErrors({ login: result.data.errors || "Login failed." });
          }
        } catch (e) {
          console.error('Error during login:', e.response?.data || e.message);
          setErrors({ login: e.response?.data?.errors || "Something went wrong. Please try again." });
        }
    };
      
    
      

    return (
        <div className="login-container">
            <div className="glass-card" style={{ width: '40%' }}>
                <h2 className='login-h1'>Login</h2>
                <form onSubmit={submitForm}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail" className="form-label"><strong>Email Id</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="exampleInputEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword" className="form-label"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="exampleInputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>

                    {errors.login && <div className="invalid-feedback d-block">{errors.login}</div>}
                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                
                <div className="mt-3 text-center">
                    <p style={{color:'white'}}>Don't have an account? <button className="btn btn-secondary" onClick={() => navigate('/register')}>Register</button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
