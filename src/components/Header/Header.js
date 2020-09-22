import React from 'react';
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../Icon/Logo.png';
import  './Header.css';


const Header = () => {
    return (
        <div >
            <div className="header">
            <Container>
            <Row>
                <Col>
                    <Navbar expand="lg">
                    <Link className="logo" to="/home"> <img src={logo} alt=""/> </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline>
                        <input type="text" name="searchBox" className="find" formControl placeholder="Search" id=""/>
                        </Form>
                        <Nav className="ml-auto">
                        <Link className="navItem" to="/news">News</Link>
                        <Link className="navItem" to="/destination">Destination</Link>
                        <Link className="navItem" to="/blog">Blog</Link>
                        <Link className="navItem" to="/contact">Contact</Link>
                        <Link to="/login"><button className="navButton" type="submit">Login</button></Link>
                        
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            </Container>

                
            </div>
            
            

        </div>
    );
};

export default Header;