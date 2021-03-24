import {LOG_IN, LOG_OUT, SIGN_UP, SET_ACTIVE_GROUP} from "../actions/actions";

const initialState = {
    loggedIn: false,
    //TODO: populate these
    activeProfile : "test",
    profiles : {
        // profiles will hold all the profiles that have been created on this run of the application
        test: {
            password: "password",
            username: "Jimmy"
        }
    },
    activeGroup : "Personal Chores",
    groups : ["Test Group 1", "Test Group 2", "Test Group 3"]
}

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        //TODO: figure out where log out buttons will go
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                activeProfile: null
            }
        case LOG_IN:
            // Confirms that the submitted email and password are in the profile dictionary
            if (action.email in state.profiles && state.profiles[action.email].password === action.password) {
                return {
                    ...state,
                    loggedIn: true,
                    activeProfile : action.email
                }
            }
            return state
        case SIGN_UP:
            if (!(action.email in state.profiles)) {
                let newProfiles = state.profiles
                newProfiles[action.email] = {
                    password: action.password,
                    username: action.username
                }

                return {
                    ...state,
                    profiles: newProfiles

                }
            }
            return state
        case SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroup: action.activeGroup
            }
        default:
            return state
    }
}

export default applicationReducer;