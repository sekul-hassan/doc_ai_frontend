import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🔹 Access state from Redux
    const {token, loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form)); // ✅ Call Redux thunk
    };

    // 🔹 Redirect after login success
    useEffect(() => {
        if (token) {
            navigate("/qa", { replace: true });
        }
    }, [token, navigate]);

    return (
        <Row className="login-wrapper justify-content-center align-items-center">
            <Col md={8} lg={6}>
                <Card className="login-card shadow p-4">
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">Sign in to access your account</p>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="description">Email</Form.Label>
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
                            <Form.Label className="description">Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="login-btn w-100" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
