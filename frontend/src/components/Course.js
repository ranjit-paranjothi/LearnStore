import React from 'react';
import {Card} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';


const onCardClick = (id, history)=>{
    console.log("clicked Card id: ", id);
    history.push(`/course/${id}`);
}

const Course = ({course})=> {
    const history = useHistory();
    
    return (
        <Card className="my-3 rounded" onClick={()=>onCardClick(course._id, history)} style={{ width: '18rem', cursor: 'pointer'}}>
            <Card.Img variant="top" src={course.image} alt="Card image cap"/>
            <Card.Body>
                <Card.Title>
                    <strong>{course.title}</strong>
                </Card.Title>
                <Card.Text>
                    {course.description}
                </Card.Text>
                <Card.Text className="text-right">
                    {course.price}
                </Card.Text>
                {/* <a href={`/course/${course._id}`} className="btn btn-primary stretched-link">Go somewhere</a> */} 
            </Card.Body>
        </Card> 
    )
}

export default Course;
