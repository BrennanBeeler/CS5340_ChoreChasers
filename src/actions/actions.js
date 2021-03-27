export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_ACTIVE_GROUP = "SET_ACTIVE_GROUP";
export const CREATE_GROUP = "CREATE_GROUP";
export const GET_GROUP_DATA = "GET_GROUP_DATA";
export const CREATE_CHORE = "CREATE_CHORE";
export const DELETE_CHORE = "DELETE_CHORE";
export const DELETE_PERSONAL_CHORE = "DELETE_PERSONAL_CHORE";

const logIn = (dispatch, email, password) => {
    let id = email
    //TODO: validate login credentials via database AND IF valid dispatch
    return(
        dispatch({
            type : LOG_IN,
            id
        })
    )
}



const logOut = (dispatch, email) =>
    dispatch({
        type : LOG_IN,
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

//TODO: figure out how to deal with group addition once database is ready- other members in particular
const createGroup = (dispatch, profile, group) => {
    dispatch({
        type : CREATE_GROUP,
        group
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

const applicationActions = {
    logIn, logOut,signUp, setActiveGroup, createGroup, getGroupData, deleteChore, deletePersonalChore, createChore
}

export default applicationActions;