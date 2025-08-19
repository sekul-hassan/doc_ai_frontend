import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function HomeHero() {
    return (
        <div className="home-hero">
            <div className="home-hero_overlay p-5">
                <h1 className="title text-uppercase pt-4">📄 Doc AI</h1>
                <p className="subtitle">
                    Upload your documents and ask AI-powered questions instantly. Get answers in seconds.
                </p>
                <div className="hero-buttons">
                    <Button as={Link} to="/register" variant="outline-light" size="lg" className="hero-btn subtitle text-uppercase">
                        ✨ Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomeHero;
