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

const logIn = (dispatch, email, password, profiles) => {
    let validProfile = profiles.filter(profile => {
        return profile.emailId === email && profile.password === password;
    })

    if (validProfile.length !== 0) {
        dispatch({
            type : LOG_IN,
            email
        })
        return true;
    }
    else {
        return false;
    }
}

const logOut = (dispatch) =>
    dispatch({
        type : LOG_OUT
    })

const signUp = (dispatch, email, username, password, profiles) => {
    let existingProfiles = profiles.filter(profile => profile.emailId === email)

    if (existingProfiles.length !== 0) {
        return false;
    }
    else {
        dispatch({
            type : SIGN_UP,
            email,
            username,
            password
        })

        return true
    }
}

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

//TODO: figure out how to deal with adding people to group
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

const editChore = (dispatch, chore) => {
    dispatch({
        type: EDIT_CHORE,
        chore
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

const deleteChore = (dispatch, chore) => {
    dispatch({
        type : DELETE_CHORE,
        chore
    })
}

const deletePersonalChore = (dispatch, chore) => {
    dispatch({
        type: DELETE_PERSONAL_CHORE,
        chore
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