import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../http/postApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp({ isOpen, onClose }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formType, setFormType] = useState('login');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        prnNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === 'signup') {
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match!');
                return;
            }

            const userData = {
                prnNumber: formData.prnNumber,
                password: formData.password,
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobile: "1234567890"
            };

            try {
                const response = await register(userData);
                console.log("Registration successful:", response);
                toast.success('Registration successful!');
                setMessage(response.message);
                setToken(response.token);
                setFormType('login');
            } catch (error) {
                toast.error(error.message || 'Registration failed. Please try again.');
            }
        } else {
            // Handle login logic
            const userData = {
                email: formData.email,
                password: formData.password,
            };

            try {
                const response = await login(userData);
               
                toast.success('Login successful!');
                setMessage(response.message);
                setToken(response.token);
                setTimeout(() => {
                    setIsLoggedIn(true);
                    navigate('/dashboard');
                }, 2000); 
            } catch (error) { 
                toast.error(error.message || 'Login failed. Please try again.');
            }
        }
    };
    if (!isOpen) return null;
    return (
        <div>
            <ToastContainer />
            {!isLoggedIn ? (
                <section className="w3l-login-block py-5" id="form-section">
                    <div className="container py-lg-5 py-md-4 py-2">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <h3 className="title-big text-center">{formType === 'login' ? 'Login' : 'Sign Up'}</h3>
                                <form className="mt-4" onSubmit={handleSubmit}>
                                    {formType === 'signup' && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="prnNumber">PRN Number</label>
                                                <input type="text" className="form-control" id="prnNumber" placeholder="Enter your PRN number" value={formData.prnNumber} onChange={handleChange} required />
                                            </div>
                                        </>
                                    )}

                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                                        <small className="form-text text-muted">
                                            <a href="/forgot-password">Forgot Password?</a>
                                        </small>
                                    </div>

                                    {formType === 'signup' && (
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-primary btn-block">
                                        {formType === 'login' ? 'Login' : 'Sign Up'}
                                    </button>
                                </form>
                                {message && <div className="alert alert-info">{message}</div>}
                                {token && <div>Token: {token}</div>}
                                <p className="mt-3 text-center">
                                    {formType === 'login' ? (
                                        <>
                                            Don't have an account? <button className="btn btn-link" onClick={() => setFormType('signup')}>Register</button>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account? <button className="btn btn-link" onClick={() => setFormType('login')}>Login</button>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="text-center mt-5">
                    <h2>Welcome! You are logged in.</h2>
                    <button className="btn btn-danger" onClick={() => setIsLoggedIn(false)}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default SignUp;