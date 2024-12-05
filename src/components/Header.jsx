import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUp from "../pages/SignUp";
import { useNavigate } from 'react-router-dom';
import { login, register } from '../http/postApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  const [checked, setChecked] = useState(currentTheme === 'dark');

  function changeTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setChecked(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setChecked(false);
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <div>
      <header id="site-header" className="fixed-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark stroke">
            <h1>
              <Link to="/" className="navbar-brand">
                <span className="fa fa-diamond"></span>
                Study Course
                <span className="logo">Journey to success</span>
              </Link>
            </h1>

            <button
              className="navbar-toggler collapsed bg-gradient"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
              <span className="navbar-toggler-icon fa icon-close fa-times"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mx-lg-auto">
                {/* <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li> */}
                <a className="nav-link" href="/">
                  Home
                  <span className="sr-only">(current)</span>
                </a>
                <li className="nav-item @@about__active">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item @@courses__active">
                  <Link className="nav-link" to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item @@contact__active">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="search-right">
                <a href="#search" title="search">
                  <span className="fa fa-search" aria-hidden="true"></span>
                </a>
                <div id="search" className="pop-overlay">
                  <div className="popup">
                    <form
                      action="error.html"
                      method="GET"
                      className="search-box"
                    >
                      <input
                        type="search"
                        placeholder="Search"
                        name="search"
                        required="required"
                        autoFocus=""
                      />
                      <button type="submit" className="btn">
                        <span
                          className="fa fa-search"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </form>
                  </div>
                  <a className="close" href="#close">
                    &times;
                  </a>
                </div>
              </div>

              <div className="top-quote mr-lg-2 text-center">
                <Button variant="link" onClick={handleShow} className="btn login ">
                  <span className="fa fa-user"></span>
                  Login
                </Button>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <h3 className="title-big text-center">{formType === 'login' ? 'Login' : 'Sign Up'}</h3>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <ToastContainer />
                    {!isLoggedIn ? (
                      <section className="w3l-login-block " id="form-section">
                        <div className="container  py-md-4 ">
                          <div className="row">
                            <div className="col-lg-10 mx-auto">
                              {/* <h3 className="title-big text-center">{formType === 'login' ? 'Login' : 'Sign Up'}</h3> */}
                              <form className="" onSubmit={handleSubmit}>
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
                </Modal.Body>

              </Modal>
            </div>
            <div className="mobile-position">
              <nav className="navigation">
                <div className="theme-switch-wrapper">
                  <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" checked={checked} onChange={changeTheme} />
                    <div className="mode-container py-1">
                      <i className="gg-sun"></i>
                      <i className="gg-moon"></i>
                    </div>
                  </label>
                </div>
              </nav>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
