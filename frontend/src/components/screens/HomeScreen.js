import React, {useEffect} from 'react';
import { Row, Col} from 'react-bootstrap';
import Course from '../Course';

import {useDispatch, useSelector} from 'react-redux';
import {listCourses} from "../../actions/courseActions";
import Loader from '../Loader';


const HomeScreen= ()=> {
    // const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();
    const courseList = useSelector(state=> state.courseList);
    const { loading, courses} = courseList;
    useEffect(()=>{
        dispatch(listCourses());
        
    },[dispatch]);
    return (
        <div>
            
            {
                loading ? <Loader/> : 
                <Row>
                {courses.map(course => (
                    <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
                        <Course course={course}/>
                    </Col>
                
                ))}
                </Row>
            }
            
            
            
        </div>
    )
}

export default HomeScreen
