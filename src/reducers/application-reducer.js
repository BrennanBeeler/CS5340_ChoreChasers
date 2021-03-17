const initialState = {
    loggedIn: false
}

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_OUT":
            return {
                ...state,
                loggedIn: false
            }
        case "LOG_IN":
            return {
                ...state,
                loggedIn: true
            }
        default:
            return state
    }
}

export default applicationReducer;