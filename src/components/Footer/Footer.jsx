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
                        <h5 className="navBrand">📄 Doc AI</h5>
                        <p className="description text-white">
                            Your AI-powered document assistant. Upload, ask, and get answers instantly.
                        </p>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5 className="subtitle">Quick Links</h5>
                        <ul className="footer-links">
                            <li className="subtitle"><Link to="/upload">Upload</Link></li>
                            <li className="subtitle"><Link to="/qa">Ask</Link></li>
                            <li className="subtitle"><Link to="/login">Login</Link></li>
                            <li className="subtitle"><Link to="/register">Register</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5 className="subtitle">Follow Us</h5>
                        <ul className="footer-links">
                            <li className="subtitle"><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                            <li className="subtitle"><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
                            <li className="subtitle"><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <p className="text-center mt-3 description text-white">
                    &copy; {new Date().getFullYear()} Doc AI. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;
