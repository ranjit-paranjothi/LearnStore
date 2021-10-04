import {COURSE_LIST_REQUEST,
        COURSE_LIST_SUCCESS,
        COURSE_LIST_FAIL,
        COURSE_DELETE_REQUEST,
        COURSE_DELETE_SUCCESS,
        COURSE_DELETE_FAIL
} from "../constants/courseConstants"
export const courseListReducers = (state={courses:[]}, action)=>{
    switch(action.type){
        case COURSE_LIST_REQUEST:
            return {loading: true, courses:[]};
        case COURSE_LIST_SUCCESS:
            return {loading:false, courses:action.payload};
        case COURSE_LIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

export const courseDeleteReducers = (state={}, action)=>{
    switch(action.type){
        case COURSE_DELETE_REQUEST:
            return {loading: true};
        case COURSE_DELETE_SUCCESS:
            return {loading:false, success:true};
        case COURSE_DELETE_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}