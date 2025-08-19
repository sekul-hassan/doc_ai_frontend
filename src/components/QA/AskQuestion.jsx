import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import API from "../../api";

const AskQuestion = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/questions/ask", { question });
            setAnswer(res.data.qa.answer);
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to get answer");
        }
    };

    return (
        <Card className="p-4 shadow">
            <h3>Ask a Question</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        placeholder="Type your question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit">Ask</Button>
            </Form>
            {answer && (
                <Alert className="mt-3" variant="success">
                    <strong>Answer:</strong> {answer}
                </Alert>
            )}
        </Card>
    );
};

export default AskQuestion;
