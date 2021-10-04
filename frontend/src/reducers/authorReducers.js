import {AUTHOR_LIST_REQUEST,
    AUTHOR_LIST_SUCCESS,
    AUTHOR_LIST_FAIL
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