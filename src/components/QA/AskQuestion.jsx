import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import API from "../../api";
import "./AskQuestion.css";
import { fetchMessagesOnce, appendMessageToCache } from "../../cache/MessagesCache";

const AskQuestion = () => {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const chatRef = useRef(null);
    const limit = 10;

    const loadMessages = async (pageNum) => {
        try {
            const { messages: cachedMsgs, hasMore: more } = await fetchMessagesOnce(
                pageNum,
                limit,
                async (page, lim) => {
                    const res = await API.get(`/questions/list?page=${page}&limit=${lim}`);
                    return res.data.messages || [];
                }
            );
            setMessages(cachedMsgs);
            setHasMore(more);
        } catch (err) {
            console.error("Failed to load messages", err);
        }
    };

    useEffect(() => {
        loadMessages(page).then(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        });
    }, [page]);

    const handleScroll = () => {
        const el = chatRef.current;
        if (el.scrollTop === 0 && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const newMsg = { role: "user", text: question };
        setMessages((prev) => [...prev, newMsg]);
        appendMessageToCache(newMsg);
        setQuestion("");
        setLoading(true);

        try {
            const res = await API.post("/questions/ask", { question });
            const botReply = { role: "bot", text: res.data.qa.answer };
            setMessages((prev) => [...prev, botReply]);
            appendMessageToCache(botReply);
        } catch (err) {
            const er = err.response?.data?.error || "Failed to load messages";
            const errorMsg = { role: "bot", text: er };
            setMessages((prev) => [...prev, errorMsg]);
            appendMessageToCache(errorMsg);
        } finally {
            setLoading(false);
        }
    };

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
