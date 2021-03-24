export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_ACTIVE_GROUP = "SET_ACTIVE_GROUP";

const logIn = (dispatch, email, password) =>
    dispatch({
        type : LOG_IN,
        email,
        password
    })

const logOut = (dispatch, email) =>
    dispatch({
        type : LOG_IN,
        email
    })

const signUp = (dispatch, email, username, password) => {
    dispatch({
        type : SIGN_UP,
        email,
        username,
        password
    })
}

// TODO: redo with unique group id from database
const setActiveGroup = (dispatch, activeGroup) => {
    dispatch({
        type : SET_ACTIVE_GROUP,
        activeGroup
    })
}

const applicationActions = {
    logIn, logOut,signUp, setActiveGroup
}

export default applicationActions;