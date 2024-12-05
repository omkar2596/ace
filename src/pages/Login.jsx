import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <section className="w3l-login-block py-5" id="login">
        <div className="container py-lg-5 py-md-4 py-2">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <h3 className="title-big text-center">Login</h3>
              <form className="mt-4">
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input
                    type="email"
                    className="form-control"
                    id="name"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
