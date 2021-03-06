import {AUTHOR_LIST_REQUEST,
    AUTHOR_LIST_SUCCESS,
    AUTHOR_LIST_FAIL,
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_UPDATE_RESET,
    AUTHOR_DETAILS_REQUEST,
    AUTHOR_DETAILS_SUCCESS,
    AUTHOR_DETAILS_FAIL,
    AUTHOR_CREATE_REQUEST,
    AUTHOR_CREATE_SUCCESS,
    AUTHOR_CREATE_FAIL,
    AUTHOR_CREATE_RESET,
    AUTHOR_DELETE_REQUEST,
    AUTHOR_DELETE_SUCCESS,
    AUTHOR_DELETE_FAIL
} from "../constants/authorConstants"

export const authorListReducers = (state={authors:[]}, action)=>{
    switch(action.type){
        case AUTHOR_LIST_REQUEST:
            return {loading: true, authors:[]};
        case AUTHOR_LIST_SUCCESS:
            return {loading:false, authors:action.payload};
        case AUTHOR_LIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

export const authorDetailsReducers = (state={}, action)=>{
    switch(action.type){
        case AUTHOR_DETAILS_REQUEST:
            return {loading: true};
        case AUTHOR_DETAILS_SUCCESS:
            return {loading:false, author:action.payload};
        case AUTHOR_DETAILS_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

export const authorUpdateReducers = (state={}, action)=>{
    switch(action.type){
        case AUTHOR_UPDATE_REQUEST:
            return {loading: true};
        case AUTHOR_UPDATE_SUCCESS:
            return {loading:false, success:true, author:action.payload};
        case AUTHOR_UPDATE_FAIL:
            return {loading:false,error:action.payload};
        case AUTHOR_UPDATE_RESET:
            return {author:{}}
        default:
            return state;
    }
}

export const authorCreateReducers = (state={}, action)=>{
    switch(action.type){
        case AUTHOR_CREATE_REQUEST:
            return {loading: true};
        case AUTHOR_CREATE_SUCCESS:
            return {loading:false, success:true, author: action.payload};
        case AUTHOR_CREATE_FAIL:
            return {loading:false,error:action.payload};
        case AUTHOR_CREATE_RESET: 
            return {}
        default:
            return state;
    }
}


export const authorDeleteReducers = (state={}, action)=>{
    switch(action.type){
        case AUTHOR_DELETE_REQUEST:
            return {loading: true};
        case AUTHOR_DELETE_SUCCESS:
            return {loading:false, success:true};
        case AUTHOR_DELETE_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}