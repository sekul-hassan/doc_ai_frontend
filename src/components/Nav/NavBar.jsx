import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authSlice.js";

function NavBar() {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    return (
        <Navbar className="navBody" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand className="subtitle navBrand" as={Link} to="/">
                    📄 Doc AI
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!token ? (
                            <>
                                <Nav.Link className="subtitle" as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link className="subtitle" as={Link} to="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className="subtitle" as={Link} to="/upload">Upload</Nav.Link>
                                <Nav.Link className="subtitle" as={Link} to="/qa">Ask</Nav.Link>
                                <Nav.Link className="subtitle" as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link className="subtitle" onClick={()=>dispatch(logout())}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
