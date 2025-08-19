import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import API from "../../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import BACKEND_URL from "../../url.js";

const UserDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [analytics, setAnalytics] = useState([]);

    // Fetch documents
    const fetchDocuments = async () => {
        try {
            const res = await API.get("/documents");
            setDocuments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch analytics
    const fetchAnalytics = async () => {
        try {
            const res = await API.get("/questions/analytics"); // new endpoint
            setAnalytics(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDocuments();
        fetchAnalytics();
    }, []);

    // Delete document
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        try {
            await API.delete("/documents/delete");
            setMessage("Document deleted successfully!");
            fetchDocuments();
        } catch (err) {
            console.error(err);
        }
    };

    // Open modal for update
    const handleEdit = (doc) => {
        setTitle(doc.title);
        setContent(doc.content);
        setShowModal(true);
    };

    // Update document
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
            fetchDocuments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-4">
            <h2>User Dashboard</h2>
            {message && <Alert variant="success">{message}</Alert>}

            <Row className="mb-4">
                <Col>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>File</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {documents.map((doc, idx) => (
                            <tr key={doc.id}>
                                <td>{idx + 1}</td>
                                <td>{doc.title}</td>
                                <td>{doc.content}</td>
                                <td>
                                    {doc.viewUrl ? (
                                        <iframe
                                            src={`${BACKEND_URL}${doc.viewUrl}`}
                                            title={doc.fileName}
                                            width="100%"
                                            height="450"
                                            style={{border: "1px solid #ccc"}}
                                        />
                                    ) : (
                                        "No file"
                                    )}
                                </td>

                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleEdit(doc)}
                                        className="me-2"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(doc.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </Col>
            </Row>


            <h3>Analytics (Messages per Month)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics}>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="count" fill="#007bff"/>
                </BarChart>
            </ResponsiveContainer>

            {/* Update Modal */}
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
