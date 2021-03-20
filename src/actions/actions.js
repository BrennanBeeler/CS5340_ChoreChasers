export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";

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

const applicationActions = {
    logIn, logOut,signUp
}

export default applicationActions;