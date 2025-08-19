import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HowItWorks.css";

function HowItWorks() {
    return (
        <section className="how-it-works">
            <Container>
                <h2 className="works-title">How It Works</h2>
                <p className="works-subtitle">
                    Just 3 simple steps to get AI-powered answers from your documents.
                </p>
                <Row className="mt-5">
                    <Col md={4} className="step-col">
                        <div className="step-circle">1</div>
                        <h4 className="step-title">Upload Document</h4>
                        <p className="step-desc">
                            Upload your PDF, Word, or text files quickly and securely.
                        </p>
                    </Col>
                    <Col md={4} className="step-col">
                        <div className="step-circle">2</div>
                        <h4 className="step-title">Ask Questions</h4>
                        <p className="step-desc">
                            Type your questions about the document and let AI find answers instantly.
                        </p>
                    </Col>
                    <Col md={4} className="step-col">
                        <div className="step-circle">3</div>
                        <h4 className="step-title">Get Results</h4>
                        <p className="step-desc">
                            Receive clear, concise, and context-appropriate responses from your content.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HowItWorks;
