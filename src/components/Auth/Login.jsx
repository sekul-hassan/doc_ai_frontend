import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import API from "../../api";
import "./Login.css";

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            onLogin();
            setError("");
            alert("Login successful!");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
            alert(err.response?.data?.error || "Failed to login");
        }
    };

    return (
        <Row className="login-wrapper justify-content-center align-items-center">
            <Col md={8} lg={6}>
                <Card className="login-card shadow p-4">
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">Sign in to access your account</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="login-btn w-100">
                            Login
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
