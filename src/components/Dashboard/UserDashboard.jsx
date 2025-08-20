import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import API from "../../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import BACKEND_URL from "../../url.js";
import { fetchAnalyticsOnce, fetchDocumentsOnce, resetCache } from "../../cache/Cache.js";

const UserDashboard = () => {
    const [document, setDocument] = useState(null); // single document
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [analytics, setAnalytics] = useState([]);

    const loadData = async () => {
        const doc = await fetchDocumentsOnce();
        const analyticsData = await fetchAnalyticsOnce();
        setDocument(doc[0] || null); // pick the first document
        setAnalytics(analyticsData);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        try {
            await API.delete("/documents/delete");
            setMessage("Document deleted successfully!");
            resetCache();
            loadData(); // re-fetch after reset
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = () => {
        if (!document) return;
        setTitle(document.title);
        setContent(document.content);
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file to upload.");

        const formData = new FormData();
        formData.append("document", file);
        formData.append("title", title);
        formData.append("content", content);

        try {
            await API.put("/documents/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowModal(false);
            setMessage("Document updated successfully!");
            resetCache();
            await loadData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="subtitle text-dark">User Dashboard</h2>
            {message && <Alert variant="success">{message}</Alert>}

            <Row className="mb-4 description">
                <Col>
                    {document ? (
                        <>
                            <iframe
                                src={`${BACKEND_URL}${document.viewUrl}`}
                                title={document.fileName}
                                width="100%"
                                height="450"
                                style={{ border: "1px solid #ccc" }}
                            />
                            <div className="mt-2">
                                <Button
                                    variant="outline-success"
                                    className="me-2"
                                    onClick={handleEdit}
                                >
                                    Update
                                </Button>
                                <Button variant="outline-danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>No document available.</p>
                    )}
                </Col>
            </Row>

            <Row className="my-4 py-3">
                <h3 className="subtitle text-dark">Analytics (Messages per Month)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#007bff" />
                    </BarChart>
                </ResponsiveContainer>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose New File</Form.Label>
                            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>
                        <Button type="submit">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default UserDashboard;
