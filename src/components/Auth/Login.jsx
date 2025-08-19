import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import API from "../../api";

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
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <Card className="p-4 shadow">
            <h3>Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
        </Card>
    );
};

export default Login;
