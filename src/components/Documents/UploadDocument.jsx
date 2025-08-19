import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import API from "../../api";

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("document", file);
        formData.append("title", title);
        formData.append("content", content);

        try {
            const res = await API.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.error || "Upload failed");
        }
    };

    return (
        <Card className="p-4 shadow">
            <h3>Upload Document</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Choose File</Form.Label>
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </Form.Group>
                <Button type="submit">Upload</Button>
            </Form>
        </Card>
    );
};

export default UploadDocument;
