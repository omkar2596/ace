import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgot } from '../../http/postApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPass() {
    const [formData, setFormData] = useState({
        email: '',
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailData = { email: formData.email };

        try {
            const response = await forgot(emailData.email); // Send the email
            toast.success('Email sent successfully!'); // Show success toast
            setTimeout(() => {
                navigate('/reset-password'); // Navigate after a delay
            }, 2000); 
        } catch (error) {
            toast.error(error.message || 'Failed to send email. Please try again.'); // Show error toast
        }
    };
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <div>
             <ToastContainer />
            <section className="w3l-login-block py-5" id="form-section">
                <div className="container py-lg-5 py-md-4 py-2">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <h3 className="title-big text-center">Forgot password</h3>
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
           
        </div>
    );
}

export default ForgotPass;
