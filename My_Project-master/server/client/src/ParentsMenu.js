import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container  } from 'react-bootstrap';
import "./App.css";

class ParentsMenu extends Component {

    render() {
        return (
            <div className="ParentsMenu">
                < Navbar bg="dark" variant="dark" style={{height : "3rem" }}>
                    <Container>
                        <Nav style={{marginLeft : '3rem'}} >
                            <Link to="/Logout">התנתקות</Link>
                            <Link to="/Parents/AddWeeklyDiary"> הוספת יומן שבועי</Link >
                            <Link to="/Parents/ChildCard">כרטיס ילד</Link >
                            <Link to="/Parents/AddChild">יצירת כרטיס ילד</Link >
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

export default ParentsMenu;