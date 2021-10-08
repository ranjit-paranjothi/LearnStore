import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import FormContainer from '../FormContainer'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { listAuthorDetails, CreateAuthor, createAuthor } from '../../actions/authorActions'
import { AUTHOR_CREATE_RESET, AUTHOR_Create_RESET } from '../../constants/authorConstants'

const AuthorCreateScreen= ({match, history})=> {

    // const authorId = match.params.id;

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState("/images/profile_image_placeholder.jpg");
    const [uploading, setUploading] = useState(false)

    const {loading, error, author} = useSelector((state)=> state.authorDetails );
    const {loading:loadingCreate,
            error: errorCreate,
            success: successCreate} = useSelector(state=> state.authorCreate);
    useEffect(()=>{

        if(successCreate){
            dispatch({type:AUTHOR_CREATE_RESET});
            history.push("/admin/authorList")
        }else{
            /* if(!author || author._id!== authorId){
                dispatch(listAuthorDetails(authorId));
            }else{
                setName(author.name);
                setEmail(author.email);
                setImage(author.profileImage);
            } */
        }
        
        
        
        
    },[dispatch, history, successCreate]);
    
    const submitHandler = (e)=>{
        
        e.preventDefault();
        
        dispatch(createAuthor({
            name,
            profileImage:image,
            email,
        }))
       
    }

    const uploadHandler= async (e)=>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file)
        setUploading(true);
        try {
            const config ={
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false);
        } catch (error) {
            console.log(error)
            setUploading(false);
        }
    }
    return (
        <>
            <Link to ="/admin/authorList" className = "btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Add Author Details</h1>
                {loadingCreate && <Loader/>}
                {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
                {loading ? <Loader/>: error ? <Alert variant="danger">{error}</Alert> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className="py-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='image' className="py-2">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Image Url"
                        value={image}
                        onChange={(e)=> setImage(e.target.value)}
                        ></Form.Control>
                        <Form.File id='image-file' label="Choose File" custom onChange={uploadHandler}>

                        </Form.File>
                        {uploading && <Loader/>}
                    </Form.Group>
                    
                    <Form.Group controlId='email' className="py-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Enter Email address"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    
                    <div className="py-3">
                        <Button type="submit" className="primary">
                            Add
                        </Button>
                    </div>
                    
                </Form>
                )}
                
            </FormContainer>
        </>
        
    )
}

export default AuthorCreateScreen
