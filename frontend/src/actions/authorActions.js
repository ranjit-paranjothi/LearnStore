
import {AUTHOR_LIST_REQUEST,
    AUTHOR_LIST_SUCCESS,
    AUTHOR_LIST_FAIL,
    AUTHOR_DETAILS_REQUEST,
    AUTHOR_DETAILS_SUCCESS,
    AUTHOR_DETAILS_FAIL,
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_CREATE_REQUEST,
    AUTHOR_CREATE_SUCCESS,
    AUTHOR_CREATE_FAIL,
    AUTHOR_DELETE_REQUEST,
    AUTHOR_DELETE_SUCCESS,
    AUTHOR_DELETE_FAIL
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

export const listAuthorDetails = (id)=> async (dispatch, getState)=> {
    try{
        dispatch({type:AUTHOR_DETAILS_REQUEST});

        const {userLogin: {userInfo}} = getState();
        const config ={
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.get(`/api/authors/${id}`, config);
        
        dispatch({
            type: AUTHOR_DETAILS_SUCCESS,
            payload:data
        });

    }catch(error){
        dispatch({
            type:AUTHOR_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?  error.response.data.message: error.message
        });
    }
}

export const updateAuthor = (author)=> async (dispatch, getState)=> {
    try{
        dispatch({type:AUTHOR_UPDATE_REQUEST});

        const {userLogin: {userInfo}} = getState();
        const config ={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.put(`/api/authors/${author._id}`, author, config);

        dispatch({
            type: AUTHOR_UPDATE_SUCCESS,
            payload:data
        });

    }catch(error){
        dispatch({
            type:AUTHOR_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?  error.response.data.message: error.message
        });
    }
}

export const createAuthor = (author)=> async (dispatch, getState)=> {
    try{
        dispatch({type:AUTHOR_CREATE_REQUEST});

        const {userLogin: {userInfo}} = getState();
        const config ={
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.post(`/api/authors/`, author, config);

        dispatch({
            type: AUTHOR_CREATE_SUCCESS,
            payload:data
        });

    }catch(error){
        dispatch({
            type:AUTHOR_CREATE_FAIL,
            payload: error.response && error.response.data.message ?  error.response.data.message: error.message
        });
    }
}

export const deleteAuthor = (id)=> async (dispatch, getState)=> {
    try{
        dispatch({type:AUTHOR_DELETE_REQUEST});

        const {userLogin: {userInfo}} = getState();
        const config ={
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/authors/${id}`, config);

        dispatch({
            type: AUTHOR_DELETE_SUCCESS
        });

    }catch(error){
        dispatch({
            type:AUTHOR_DELETE_FAIL,
            payload: error.response && error.response.data.message ?  error.response.data.message: error.message
        });
    }
}