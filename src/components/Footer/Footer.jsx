import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-section">
            <Container>
                <Row>
                    <Col md={4} className="mb-3">
                        <h5 className="footer-brand">📄 Doc AI</h5>
                        <p>
                            Your AI-powered document assistant. Upload, ask, and get answers instantly.
                        </p>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5>Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/upload">Upload</Link></li>
                            <li><Link to="/qa">Ask</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5>Follow Us</h5>
                        <ul className="footer-links">
                            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <p className="text-center mt-3">
                    &copy; {new Date().getFullYear()} Doc AI. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;
