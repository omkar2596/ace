import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate for redirection
import { reset } from '../../http/postApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPass() {
    const [formData, setFormData] = useState({
        token: '', // State for token
        password: '',
        confirmPassword: ''
    });

    // Access the token from the URL (e.g., /reset-password?token=yourToken)
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const urlToken = params.get('token'); // Token from URL
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const resetData = {
            token: formData.token || urlToken, 
            newPassword: formData.password
        };

        try {
            const response = await reset(resetData);
            console.log("Password reset successful:", response);
            toast.success('Password reset successful!');

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000); // 3 seconds delay
        } catch (error) {
            toast.error(error.message || 'Password reset failed. Please try again.');
        }
    };
    

    return (
        <div>
            <ToastContainer  />
            <section className="w3l-login-block py-5" id="form-section">
                <div className="container py-lg-5 py-md-4 py-2">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <h3 className="title-big text-center">Reset Password</h3>
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="token">Token</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="token" 
                                        placeholder="Enter your token" 
                                        value={formData.token} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        placeholder="Enter your new password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="confirmPassword" 
                                        placeholder="Confirm your password" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default ResetPass;
