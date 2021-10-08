import React, { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Alert, Row, Col} from 'react-bootstrap'
import Loader from '../Loader'
import { createAuthor, deleteAuthor, listAuthors } from '../../actions/authorActions'
import { AUTHOR_CREATE_RESET } from '../../constants/authorConstants'

const AuthorListScreen= ({ history })=> {

    const dispatch = useDispatch();
    const {loading, error, authors} = useSelector(state=> state.authorList);
    const {userInfo} = useSelector(state => state.userLogin);

    const {loading: loadingDeleteAuthor,
            success: successDeleteAuthor,
            error: errorDeleteAuthor} = useSelector(state=> state.authorDelete);

    const {loading: loadingCreate,
        success: successCreate,
        error: errorCreate,
        author: createdAuthor} = useSelector(state=> state.authorCreate);
    useEffect(()=>{

        dispatch({type: AUTHOR_CREATE_RESET});

        if(!userInfo.isAdmin){
            history.push("/login");
        }
        if(successCreate){
            // history.push(`/admin/Author/${createdAuthor._id}/edit`);
            
        }else{
            dispatch(listAuthors());
        }
        
    },[dispatch, history, userInfo, successCreate, successDeleteAuthor, createdAuthor]);

    const deletHandler = (id)=>{
        if(window.confirm("Are you sure to delete the Author??")){
            dispatch(deleteAuthor(id));
        }
        
    }

    const createAuthorHandler = ()=>{
        //dispatch(createAuthor())
        history.push("/admin/addAuthor");
    }
    
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Authors</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createAuthorHandler}>
                        <i className="fas fa-plus"></i>Add Author
                    </Button>
                </Col>
                
            </Row>
            {loadingDeleteAuthor && <Loader/>}
            {errorDeleteAuthor && <Alert variant="danger">{errorDeleteAuthor}</Alert>}
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
