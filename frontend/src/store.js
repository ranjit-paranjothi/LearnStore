import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { courseCreateReducers, courseDeleteReducers, courseDetailsReducers, courseListReducers, courseUpdateReducers } from './reducers/courseReducers';
import { userDeleteReducers, userDetailsReducers, userListReducers, userLoginReducers, userRegisterReducers, userUpdateProfileReducers, userUpdateReducers } from './reducers/userReducers';
import { authorListReducers, authorDetailsReducers, authorUpdateReducers, authorCreateReducers, authorDeleteReducers } from './reducers/authorReducers';

const reducers = combineReducers({
    courseList: courseListReducers,
    courseDetails: courseDetailsReducers,
    courseDelete: courseDeleteReducers,
    courseCreate: courseCreateReducers,
    courseUpdate: courseUpdateReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers,
    authorList: authorListReducers,
    authorDetails: authorDetailsReducers,
    authorUpdate: authorUpdateReducers,
    authorCreate: authorCreateReducers,
    authorDelete: authorDeleteReducers
});

const userInfoStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")): null;


const initialState = {
    userLogin: {userInfo: userInfoStorage}
};
const middleware = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;