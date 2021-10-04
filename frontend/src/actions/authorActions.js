
import {AUTHOR_LIST_REQUEST,
    AUTHOR_LIST_SUCCESS,
    AUTHOR_LIST_FAIL
} from "../constants/authorConstants";

import axios from "axios";

export const listAuthors = ()=> async (dispatch, getState)=> {
    try{
        dispatch({type:AUTHOR_LIST_REQUEST});

        const {userLogin: {userInfo}} = getState();
        const config ={
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.get('/api/authors/', config);

        dispatch({
            type:AUTHOR_LIST_SUCCESS,
            payload:data
        });

    }catch(error){
        dispatch({
            type: AUTHOR_LIST_FAIL,
            payload: error.response && error.response.data.message ?  error.response.data.message: error.message
        });
    }
}