import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./App.css";

class VolunteersMenu extends Component {
    render() {
        return (
            <div className="VolunteersMenu">
                < Navbar bg="dark" variant="dark">
                    <Container>
                        <Nav>
                            <Link to="/Logout">התנתקות</Link>
                            <Link to="/Volunteers/WeeklyDiarys">שעות פנויות ילדים</Link>
                            <Link to="/Volunteers/ChildrensCards">כרטיסי ילדים</Link>
                            <Link to="/Contact">צור קשר</Link >
                            <Link to="/About">אודות</Link >
                            <Link to="/">דף הבית</Link >
                        </Nav>
                    </Container>

                </Navbar>
            </div>
        );
    }
}

export default VolunteersMenu;