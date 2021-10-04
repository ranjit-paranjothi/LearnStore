import React, { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Button, Alert, Row, Col} from 'react-bootstrap'
import Loader from '../Loader'
import { deleteCourses, listCourses }from '../../actions/courseActions'

const CourseListScreen= ({ history, match})=> {

    const dispatch = useDispatch();
    const {loading, error, courses} = useSelector(state=> state.courseList);
    const {userInfo} = useSelector(state => state.userLogin);

    const {loading: loadingDeleteCourse,
            success: successDeleteCourse,
            error: errorDeleteCourse} = useSelector(state=> state.courseDelete);

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listCourses());
        }else{
            history.push("/login");
        }
        
    },[dispatch, history, userInfo, successDeleteCourse]);

    const deletHandler = (id)=>{
        if(window.confirm("Are you sure to delete the course??")){
            dispatch(deleteCourses(id));
        }
        
    }

    const createCourseHandler = ()=>{
        
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
            {loadingDeleteCourse && <Loader/>}
            {errorDeleteCourse && <Alert variant="danger">{errorDeleteCourse}</Alert>}
            {loading && <Loader/> }
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
