import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import { register }from '../../actions/userActions'
import FormContainer from '../FormContainer'
import {Link} from 'react-router-dom'

const RegisterScreen= ({location, history})=> {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1]:'/' 

    const {loading, error, userInfo} = useSelector((state)=> state.userRegister );
    
    useEffect(()=>{
        if(userInfo){
            history.push(redirect);
        }
    },[history, userInfo, redirect]);
    
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('password should match');
        }else{
            dispatch(register(name, email, password));
        }
       
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Alert variant="danger">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className="py-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className="py-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className="py-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className="py-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <div className="py-3">
                    <Button type="submit" className="primary">
                        Register
                    </Button>
                </div>
                
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect? `/login?redirect=${redirect}` : '/login'}>

                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
