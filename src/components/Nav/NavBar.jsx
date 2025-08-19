import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogout }) {
    return (
        <Navbar className="navBody" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand className="subtitle navBrand" as={Link} to="/">
                    📄 Doc AI
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!isLoggedIn ? (
                            <>
                                <Nav.Link className="subtitle" as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link className="subtitle" as={Link} to="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className="subtitle" as={Link} to="/upload">Upload</Nav.Link>
                                <Nav.Link className="subtitle" as={Link} to="/qa">Ask</Nav.Link>
                                <Nav.Link className="subtitle" as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link className="subtitle" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
