import React, { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Alert, Row, Col} from 'react-bootstrap'
import Loader from '../Loader'
import { deleteCourses, listCourses, createCourse }from '../../actions/courseActions'
import { COURSE_CREATE_RESET } from '../../constants/courseConstants'

const CourseListScreen= ({ history, match})=> {

    const dispatch = useDispatch();
    const {loading, error, courses} = useSelector(state=> state.courseList);
    const {userInfo} = useSelector(state => state.userLogin);
    

    const {loading: loadingDeleteCourse,
            success: successDeleteCourse,
            error: errorDeleteCourse} = useSelector(state=> state.courseDelete);

    const {loading: loadingCreate,
        success: successCreate,
        error: errorCreate,
        course: createdCourse} = useSelector(state=> state.courseCreate);

    useEffect(()=>{
        dispatch({type: COURSE_CREATE_RESET});

        if(!userInfo.isAdmin){
            history.push("/login");
        }
        if(successCreate){
            history.push(`/admin/course/${createdCourse._id}/edit`);
            
        }else{
            dispatch(listCourses());
        }
        
    },[dispatch, history, userInfo, successCreate, successDeleteCourse, createdCourse]);

    const deletHandler = (id)=>{
        if(window.confirm("Are you sure to delete the course??")){
            dispatch(deleteCourses(id));
        }
        
    }

    const createCourseHandler = ()=>{
        dispatch(createCourse());
    }
    
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Courses</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createCourseHandler}>
                        <i className="fas fa-plus"></i>Create Course
                    </Button>
                </Col>
            </Row>
            {errorDeleteCourse && <Alert variant="danger">{errorDeleteCourse}</Alert>}            
            {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
            {(loading || loadingCreate || loadingDeleteCourse) && <Loader/> }
            {error && <Alert variant="danger">{error}</Alert>}
            {courses ?
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.map(course=>(<tr key={course._id}>
                            <td>{course._id}</td>
                            <td>{course.title}</td>
                            <td>{course.price}</td>
                            <td>{course.category}</td>
                            
                            <td>
                                <LinkContainer to ={`/admin/course/${course._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit" ></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={()=>deletHandler(course._id)}>
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

export default CourseListScreen
