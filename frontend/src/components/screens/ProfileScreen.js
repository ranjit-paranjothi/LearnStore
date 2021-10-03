import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import {getUserDetails, updateUserProfile }from '../../actions/userActions'

const ProfileScreen= ({location, history})=> {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1]:'/' 

    const {loading, error, user} = useSelector((state)=> state.userDetails );
    const {userInfo} = useSelector((state)=> state.userLogin );

    const {success} = useSelector((state)=> state.userUpdateProfile );
    
    useEffect(()=>{
        if(!userInfo){
            history.push('/login');
        }else{
            if(!user){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[user, dispatch, history, userInfo, redirect]);
    
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('password should match');
        }else{
            dispatch(updateUserProfile({id: user._id, name, email, password}));
        }
       
    }
    return (
        <Row>
            <Col md={3}>
            <h1>User Profile</h1>
            {message && <Alert variant="danger">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="danger">Profile updated</Alert>}
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
                        Update
                    </Button>
                </div>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
            
        </Row>
    )
}

export default ProfileScreen
