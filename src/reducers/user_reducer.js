import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { authHeader } from '../actions/user_actions';
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";
const LOAD_FETCHING = "LOAD_FETCHING";
const LOGOUT = "LOGOUT";

const initialState = {
    isAuthenticating: false,
    currentUser: null,
    errorMessage: null,
}

function getUserData(token) {
    var username = jwtDecode(token).username;
    return axios.get(`/api/user/${username}/`, {headers: authHeader}).then(res => {
        return res.data
    });
}

if (localStorage.authToken) {
    getUserData(localStorage.authToken).then(user => initialState.currentUser = user);
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                errorMessage: action.errorMessage
            }
        case LOGIN_SUCCESS:
            return {
                isAuthenticating: false,
                currentUser: action.user,
                errorMessage: null
            }
        case LOGOUT:
            return {
                isAuthenticating: false,
                currentUser: null,
                errorMessage: null
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}