import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import API from "../../api";
import "./Register.css";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            setSuccess("Registration successful! Please login.");
            setError("");
            setForm({ name: "", email: "", password: "" }); // Reset form
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
            setSuccess("");
        }
    };

    return (
        <Row className="register-wrapper justify-content-center align-items-center">
            <Col md={8} lg={6}>
                <Card className="register-card shadow p-4">
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">Sign up to get started with Doc AI</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </Form.Group>
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
                        <Button type="submit" className="register-btn w-100">
                            Register
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;
