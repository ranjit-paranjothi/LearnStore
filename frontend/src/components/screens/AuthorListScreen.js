import React, { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Alert, Row, Col} from 'react-bootstrap'
import Loader from '../Loader'
import { listAuthors } from '../../actions/authorActions'

const AuthorListScreen= ({ history })=> {

    const dispatch = useDispatch();
    const {loading, error, authors} = useSelector(state=> state.authorList);
    const {userInfo} = useSelector(state => state.userLogin);

    /* const {loading: loadingDeleteCourse,
            success: successDeleteCourse,
            error: errorDeleteCourse} = useSelector(state=> state.courseDelete); */

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listAuthors());
        }else{
            history.push("/login");
        }
        
    },[dispatch, history, userInfo]);

    const deletHandler = (id)=>{
        if(window.confirm("Are you sure to delete the course??")){
            //dispatch(deleteCourses(id));
        }
        
    }

    /* const createCourseHandler = ()=>{
        
    } */
    
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Authors</h1>
                </Col>
                
            </Row>
            {/* {loadingDeleteCourse && <Loader/>}
            {errorDeleteCourse && <Alert variant="danger">{errorDeleteCourse}</Alert>} */}
            {loading && <Loader/> }
            {error && <Alert variant="danger">{error}</Alert>}
            {authors ?
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map(author=>(<tr key={author._id}>
                            <td>{author._id}</td>
                            <td>{author.name}</td>
                            <td>{author.email}</td>
                            <td>
                                <LinkContainer to ={`/admin/author/${author._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit" ></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={()=>deletHandler(author._id)}>
                                    <i className="fas fa-trash" ></i>
                                </Button>
                            </td>
                            </tr>))
                        
                    }
                </tbody>

            </Table>:<Table></Table>
            }
        </>
    )
}

export default AuthorListScreen
