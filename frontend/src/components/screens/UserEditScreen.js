import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import { getUserDetails, updateUser }from '../../actions/userActions'
import FormContainer from '../FormContainer'
import {Link} from 'react-router-dom'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const UserEditScreen= ({match, history})=> {

    const userId = match.params.id;

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {loading, error, user} = useSelector((state)=> state.userDetails );
    const {loading: loadingUpdate,
            error: errorUpdate,
            success: successUpdate} = useSelector(state=> state.userUpdate);
    
    useEffect(()=>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET});
            history.push("/admin/userList");
        }else{
            if(!user || user._id!== userId){
                dispatch(getUserDetails(userId));
            }else{
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
        
    },[user, dispatch, userId, successUpdate, history]);
    
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(updateUser({_id:userId, name, email, isAdmin}));
       
    }
    return (
        <>
            <Link to ="/admin/userList" className = "btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
                {loading ? <Loader/>: error ? <Alert variant="danger">{error}</Alert> : (
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
                    <Form.Group controlId='isAdmin' className="py-2">
                       
                        <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e)=> setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    
                    <div className="py-3">
                        <Button type="submit" className="primary">
                            Update
                        </Button>
                    </div>
                    
                </Form>
                )}
                
            </FormContainer>
        </>
        
    )
}

export default UserEditScreen
