import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./TestimonialsSection.css";

function TestimonialsSection() {
    const testimonials = [
        {
            name: "Alice Johnson",
            text: "Doc AI helped me quickly find answers from my research documents. Highly recommended!",
        },
        {
            name: "Bob Smith",
            text: "Uploading documents and asking questions is super fast and easy. The AI responses are accurate.",
        },
        {
            name: "Carla Lee",
            text: "I love how secure and private my documents are while using Doc AI. Amazing tool!",
        },
    ];

    return (
        <section className="testimonials-section">
            <Container>
                <h2 className="testimonials-title">What Our Users Say</h2>
                <Row className="mt-4">
                    {testimonials.map((t, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="testimonial-card h-100">
                                <Card.Body>
                                    <Card.Text className="description">"{t.text}"</Card.Text>
                                    <Card.Footer className="text-end">
                                        <strong>- {t.name}</strong>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default TestimonialsSection;
