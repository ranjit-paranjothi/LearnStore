import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import {login }from '../../actions/userActions'
import FormContainer from '../FormContainer'
import {Link} from 'react-router-dom'

const LoginScreen= ({location, history})=> {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = location.search ? location.search.split('=')[1]:'/' 

    const {loading, error, userInfo} = useSelector((state)=> state.userLogin );
    
    useEffect(()=>{
        if(userInfo){
            history.push(redirect);
        }
    },[history, userInfo, redirect]);
    
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(login(email, password));
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
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

                <div className="py-3 ">
                    <Button type="submit" className="primary">
                        Sign In
                    </Button>
                </div>
                
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{' '}
                    <Link to={redirect? `/register?redirect=${redirect}` : '/register'}>

                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
