import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import API from "../../api";
import "./AskQuestion.css";

const AskQuestion = () => {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const chatRef = useRef(null);
    const limit = 10;

    // Load messages for a page
    const loadMessages = async (pageNum) => {
        try {
            const res = await API.get(`/questions/list?page=${pageNum}&limit=${limit}`);
            const data = res.data.messages || [];
            console.log(`Page ${pageNum} messages:`, data);

            if (data.length === 0) {
                setHasMore(false);
                return;
            }

            const formatted = data
                .reverse()
                .map((q) => [
                    { role: "user", text: q.question },
                    { role: "bot", text: q.answer },
                ])
                .flat();

            setMessages((prev) => {
                const newMessages = [...formatted, ...prev];
                console.log("Updated messages:", newMessages);
                return newMessages;
            });
        } catch (err) {
            console.error("Failed to load messages", err);
        }
    };

    // Initial load
    useEffect(() => {
        loadMessages(page).then(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        });
    }, [page]);

    // Scroll handler for infinite scroll
    const handleScroll = () => {
        const el = chatRef.current;
        if (el.scrollTop === 0 && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    // Submit question
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const newMsg = { role: "user", text: question };
        setMessages((prev) => [...prev, newMsg]);
        setQuestion("");
        setLoading(true);

        try {
            const res = await API.post("/questions/ask", { question });
            const botReply = { role: "bot", text: res.data.qa.answer };
            setMessages((prev) => [...prev, botReply]);
        } catch (err) {
            const er = err.response?.data?.error || "Failed to load messages";
            setMessages((prev) => [...prev, { role: "bot", text: er }]);
        } finally {
            setLoading(false);
        }
    };

    // Auto-scroll to bottom for new messages
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <Fragment>
            <div className="text-center mt-2 title text-dark">Your chat history</div>
            <div className="chat-container my-4 p-3">
                <div className="chat-box" ref={chatRef} onScroll={handleScroll}>
                    {hasMore && <div className="loading-text">⬆️ Scroll up for older messages</div>}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {loading && (
                        <div className="chat-bubble bot">
                            <Spinner animation="border" size="sm" /> Thinking...
                        </div>
                    )}
                </div>
                <Form className="chat-input" onSubmit={handleSubmit}>
                    <Form.Control
                        type="text"
                        placeholder="Type your question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        Send
                    </Button>
                </Form>
            </div>
        </Fragment>
    );
};

export default AskQuestion;