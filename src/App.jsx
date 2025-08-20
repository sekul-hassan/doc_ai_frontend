import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import UploadDocument from "./components/Documents/UploadDocument";
import AskQuestion from "./components/QA/AskQuestion";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Nav/NavBar.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import UserDashboard from "./components/Dashboard/UserDashboard.jsx";
import Protected from "./routes/Protected.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/qa" element={<Protected isLoggedIn={isLoggedIn} element={<AskQuestion />} />} />
                <Route path="/upload" element={<Protected isLoggedIn={isLoggedIn} element={<UploadDocument />} />}/>
                <Route path="/dashboard" element={<Protected isLoggedIn={isLoggedIn} element={<UserDashboard />} />}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
