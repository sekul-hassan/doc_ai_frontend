import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import API from "../../api";
import {useNavigate} from "react-router-dom";
import {resetCache} from "../../cache/Cache.js";

const UploadDocument = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a PDF or TXT file.");
            return;
        }
        setLoading(true)
        const formData = new FormData();
        formData.append("document", file);
        formData.append("title", title);
        formData.append("content", content);

        try {
            const res = await API.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(res.data.message || "Upload successful!");
            setTitle("");
            setContent("");
            setFile(null);
            resetCache();
            setLoading(false)
            navigate("/dashboard",{replace:true});
        } catch (err) {
            setLoading(false)
            setMessage(err.response?.data?.error || "Upload failed");
            alert("Failed to upload");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card className="p-4 shadow" style={{ width: "500px" }}>
                <h3 className="mb-3 text-center subtitle text-dark">📂 Upload Document</h3>
                {message && <Alert variant="info">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter document title"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter document content/notes"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Choose File (PDF / TXT)</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".pdf,.txt"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="outline-success" className="w-100 fs-5 text-uppercase" disabled={loading}>
                        Upload
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default UploadDocument;
