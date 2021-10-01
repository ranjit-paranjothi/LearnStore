import React from 'react';
import {Spinner} from 'react-bootstrap'

const Loader= ()=> {
    return (
        <div className="text-center">
            <Spinner animation="border" variant="dark"  role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
        
    )
}

export default Loader
