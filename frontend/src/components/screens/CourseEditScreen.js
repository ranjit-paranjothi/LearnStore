import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Alert} from 'react-bootstrap'
import Loader from '../Loader'
import { listCourseDetails, updateCourse }from '../../actions/courseActions'
import FormContainer from '../FormContainer'
import {Link} from 'react-router-dom'
import { listAuthors } from '../../actions/authorActions'
import { COURSE_DETAILS_RESET, COURSE_UPDATE_RESET } from '../../constants/courseConstants'
import axios from 'axios'

const CourseEditScreen= ({match, history})=> {

    const courseId = match.params.id;

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authorName, setAuthorName] = useState('')
    const [uploading, setUploading] = useState(false)

    const {loading, error, course} = useSelector((state)=> state.courseDetails );
    const {loading:loadingUpdate,
            error: errorUpdate,
            success: successUpdate} = useSelector(state=> state.courseUpdate);
    const {authors} = useSelector((state)=> state.authorList );
    useEffect(()=>{

        if(successUpdate){
            dispatch({type:COURSE_UPDATE_RESET});
            history.push("/admin/courseList")
        }else{
            if(!course || course._id!== courseId){
                dispatch(listCourseDetails(courseId));
                dispatch(listAuthors());
            }else{
                setTitle(course.title);
                setPrice(course.price);
                setImage(course.image);
                setCategory(course.category);
                setDescription(course.description);
                setAuthorId(course.author);
                setAuthorName(getSelectedValue());
            }
        }
        
        
        
        
    },[course, dispatch, courseId, history, successUpdate]);
    
    const submitHandler = (e)=>{
        
        e.preventDefault();
        console.log(authors.find(author=> authorId === author._id)._id);
        dispatch(updateCourse({
            _id:courseId,
            title,
            image,
            price,
            description,
            category,
            author:authors.find(author=> authorId === author._id)._id
        }))
       
    }
    const onAuthorSelect = (e)=>{
        const selectedId = e.target.options[e.target.selectedIndex].dataset.listid;
        setAuthorId(selectedId);
    }

    const getSelectedValue=()=>{
        const selectedAuthor = authors.find(author=> authorId === author._id);
        console.log("SelectedAuthor: ", authorId)
        return selectedAuthor? selectedAuthor.name: "";
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
            <Link to ="/admin/courseList" className = "btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Course</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
                {loading ? <Loader/>: error ? <Alert variant="danger">{error}</Alert> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='title' className="py-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price' className="py-2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type="number"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)}
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
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <select onChange={onAuthorSelect} className="form-control" id="sel1">
                            {authors.map(author=>(<option selected={authorId === author._id ? "selected":"" } data-listid={author._id} key={author._id}>{author.name}</option>))}
                        </select>
                    </Form.Group>
                    <Form.Group controlId='category' className="py-2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description' className="py-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        ></Form.Control>
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

export default CourseEditScreen
