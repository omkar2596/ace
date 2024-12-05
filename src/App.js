import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClientProvider } from "react-query";
import { queryClient } from "./http/indexx";
import ForgotPass from "./pages/auth/ForgotPass";
import { ToastContainer } from "react-bootstrap";
import ResetPass from "./pages/auth/ResetPass";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <ToastContainer />
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password" element={<ResetPass />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
