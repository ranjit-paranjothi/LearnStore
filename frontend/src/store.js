import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { courseListReducers } from './reducers/courseReducers';
import { userDeleteReducers, userDetailsReducers, userListReducers, userLoginReducers, userRegisterReducers, userUpdateProfileReducers, userUpdateReducers } from './reducers/userReducers';

const reducers = combineReducers({
    courseList: courseListReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers
});

const userInfoStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")): null;


const initialState = {
    userLogin: {userInfo: userInfoStorage}
};
const middleware = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;