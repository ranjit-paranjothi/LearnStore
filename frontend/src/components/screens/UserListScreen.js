import React, { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import {listUsers,deleteUser }from '../../actions/userActions'

const UserListScreen= ({ history})=> {

    const dispatch = useDispatch();
    const {loading, error, users} = useSelector(state=> state.userList);
    const {userInfo} = useSelector(state => state.userLogin);
    const { success:successDelete } = useSelector(state=> state.userDelete);

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers());
        }else{
            history.push("/login");
        }
        
    },[dispatch, history, successDelete, userInfo]);

    const deletHandler = (id)=>{
        if(window.confirm("Are you sure to delete the user??")){
            dispatch(deleteUser(id));
        }
        
    }
    
    return (
        <div>
            <h1>Users</h1>
            {loading && <Loader/> }
            {error && <Alert variant="danger">{error}</Alert>}
            {users ?
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>(<tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{
                                    user.isAdmin ? (<i className="fas fa-check" style={{color:'green'}}></i>):
                                     <i className="fas fa-times" style={{color:'red'}}></i>}
                            </td>
                            <td>
                                <LinkContainer to ={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit" ></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={()=>deletHandler(user._id)}>
                                    <i className="fas fa-trash" ></i>
                                </Button>
                            </td>
                            </tr>))
                        
                    }
                </tbody>

            </Table>:<Table></Table>
            }
        </div>
    )
}

export default UserListScreen
