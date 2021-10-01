import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Loader from '../Loader';


const CourseScreen= ({match, history})=> {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const onBuyClick = (e)=>{
        history.push('/login?redirect=checkout');
    }

    useEffect(()=>{
        async function fetchCourse(){
            setLoading(false);
            const {data} = await axios.get(`/api/courses/${match.params.id}`);
            setCourse(data);
            setLoading(true);
        }
        
        fetchCourse();
        
    },[match]);
    return (
        <div>
            {!loading && <Loader/>}
            {course.title}
            <div className="py-3 ">
                    <Button onClick={onBuyClick} className="primary">
                        Buy
                    </Button>
            </div>
        </div>
    )
}
export default CourseScreen;