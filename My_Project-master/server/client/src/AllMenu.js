import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./App.css";




class AllMenu extends Component {
    render() {
        return (
            <div className="AllMenu" >
                < Navbar bg="dark" variant="dark" style={{height : "3rem"  }} >
                    <Container >
                        <Nav style={{marginLeft : '3rem'}} >
                            <Link to="/Volunteers/Login">התחברות מתנדבים</Link>
                            <Link to="/Volunteers/Register">רישום מתנדבים</Link>
                            <Link to="/Parents/Login">התחברות הורים</Link>
                            <Link to="/Parents/Register">רישום הורים</Link>
                            <Link to="/Contact">צור קשר</Link>
                            <Link to="/About">אודות</Link>
                            <Link to="/">דף הבית</Link >

                        </Nav>
                    </Container>

                </Navbar >
            </div >
        );
    }
}

export default AllMenu;