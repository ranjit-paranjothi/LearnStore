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
                    <Nav className="ml-auto">
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
                        {userInfo && userInfo.isAdmin &&
                        (
                            <NavDropdown title='Admin' id="adminTab">
                                <LinkContainer to="/admin/userList">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/courseList">
                                    <NavDropdown.Item>Courses</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/authorList">
                                    <NavDropdown.Item>Authors</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header;