import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/qa" element={<Protected element={<AskQuestion />} />} />
                <Route path="/upload" element={<Protected element={<UploadDocument />} />}/>
                <Route path="/dashboard" element={<Protected element={<UserDashboard />} />}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
