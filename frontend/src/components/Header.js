import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'

const Header= ()=> {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state=> state.userLogin);
    const logoutHandler = (e)=>{
        dispatch(logout());
    }
    return (
        <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="/">Learn Store</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto navbar-right">
                    <LinkContainer to="/my_courses">
                        <Nav.Link>My Courses</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/all_courses">
                        <Nav.Link>All Courses</Nav.Link>
                    </LinkContainer>
                    {

                    (userInfo)? (<NavDropdown title={userInfo.name} id="userName">
                        <LinkContainer to="/profile">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>) : 
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header;