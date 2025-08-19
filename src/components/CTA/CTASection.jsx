import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CTASection.css";

function CTASection() {
    return (
        <section className="cta-section">
            <Container>
                <h2 className="cta-title">Ready to Try Doc AI?</h2>
                <p className="cta-subtitle">
                    Upload your documents now and start asking AI-powered questions instantly!
                </p>
                <Button as={Link} to="/login" variant="light" size="lg" className="hero-buttons">
                    🚀 Get Started
                </Button>
            </Container>
        </section>
    );
}

export default CTASection;
