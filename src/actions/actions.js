import UsersDataService from "../services/user.service";


export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_ACTIVE_GROUP = "SET_ACTIVE_GROUP";
export const TOGGLE_SOUND = "TOGGLE_SOUND";
export const SET_BACKGROUND = "SET_BACKGROUND";
export const CREATE_GROUP = "CREATE_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const GET_GROUP_DATA = "GET_GROUP_DATA";
export const CREATE_CHORE = "CREATE_CHORE";
export const EDIT_CHORE = "EDIT_CHORE";
export const ADD_POINT_VALUE = "ADD_POINT_VALUE";
export const DELETE_CHORE = "DELETE_CHORE";
export const DELETE_PERSONAL_CHORE = "DELETE_PERSONAL_CHORE";
export const TOGGLE_SHOW_COMPLETED = "TOGGLE_SHOW_COMPLETED";

const logIn = (dispatch, email, password) => {

    UsersDataService.checkLoginUser({emailId: email, password: password})
        .then(response => {
            if (!response.ok) {
                console.log(response)
                return false;
            }
            else {
                return(dispatch({
                    type: LOG_IN,
                    profile: response
                }))
            }
        })
}



const logOut = (dispatch, email) =>
    dispatch({
        type : LOG_OUT,
        email
    })

//TODO: determine if this is needed since sign up won't affect state of application directly.
const signUp = (dispatch, email, username, password) => {
    dispatch({
        type : SIGN_UP,
        email,
        username,
        password
    })
}

// TODO: redo with unique group id from database
const setActiveGroup = (dispatch, activeGroupId) => {
    dispatch({
        type : SET_ACTIVE_GROUP,
        activeGroupId
    })
}

const setBackground = (dispatch, url) => {
    dispatch({
        type : SET_BACKGROUND,
        url
    })
}

//TODO: figure out how to deal with group addition once database is ready- other members in particular
const createGroup = (dispatch, profile, group) => {
    dispatch({
        type : CREATE_GROUP,
        group
    })
}

const toggleSound = (dispatch, profile) => {
    dispatch({
        type : TOGGLE_SOUND,
        profile
    })
}

const deleteGroup = (dispatch, group) => {
    dispatch({
        type : DELETE_GROUP,
        group
    })
}

const editGroup = (dispatch, group) => {
    dispatch({
        type : EDIT_GROUP,
        group
    })
}

const editChore = (dispatch, chore, groupId) => {
    dispatch({
        type: EDIT_CHORE,
        chore,
        groupId
    })
}

const createChore = (dispatch, groupName, chore) => {
    dispatch({
        type: CREATE_CHORE,
        groupName,
        chore
    })
}

const getGroupData = (dispatch, profile, groupId) => {
    //TODO: call to server here for group info
    dispatch({
        type : GET_GROUP_DATA,
        profile,
        groupId
    })
}

const addPoints = (dispatch, points) => {
    dispatch({
        type : ADD_POINT_VALUE,
        points
    })
}

const deleteChore = (dispatch, group, choreId) => {
    dispatch({
        type : DELETE_CHORE,
        group,
        choreId
    })
}

const deletePersonalChore = (dispatch, choreId) => {
    dispatch({
        type: DELETE_PERSONAL_CHORE,
        choreId
    })
}

const toggleShowCompleted = (dispatch) => {
    dispatch({
        type: TOGGLE_SHOW_COMPLETED
    })
}

const applicationActions = {
    logIn, logOut,signUp, setActiveGroup, setBackground, toggleSound, createGroup, deleteGroup, editGroup, editChore, getGroupData, addPoints,
    deleteChore, deletePersonalChore, createChore, toggleShowCompleted
}

export default applicationActions;