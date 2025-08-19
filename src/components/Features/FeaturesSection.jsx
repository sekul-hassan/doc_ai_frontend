import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./FeaturesSection.css";

function FeaturesSection() {
    return (
        <section className="features-section">
            <Container>
                <h2 className="features-title">Why Choose Doc AI?</h2>
                <p className="features-subtitle">
                    Doc AI makes it super easy to interact with your documents using AI.
                </p>
                <Row className="mt-4">
                    <Col md={4} className="mb-4">
                        <Card className="feature-card text-center">
                            <Card.Body>
                                <Card.Title>⚡ Fast Answers</Card.Title>
                                <Card.Text>
                                    Get AI-powered answers from your documents in seconds.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="feature-card text-center">
                            <Card.Body>
                                <Card.Title>📂 Easy Upload</Card.Title>
                                <Card.Text>
                                    Upload your files quickly and manage them effortlessly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="feature-card text-center">
                            <Card.Body>
                                <Card.Title>🔒 Secure</Card.Title>
                                <Card.Text>
                                    Your documents are safe and private — AI only uses your content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default FeaturesSection;
