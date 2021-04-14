import UsersDataService from "../services/user.service";
import GroupDataService from "../services/group.service";
import ChoreDataService from "../services/chore.service";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SET_ACTIVE_GROUP = "SET_ACTIVE_GROUP";
export const TOGGLE_SOUND = "TOGGLE_SOUND";
export const SET_BACKGROUND = "SET_BACKGROUND";
export const CREATE_GROUP = "CREATE_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const GET_GROUP_DATA = "GET_GROUP_DATA";
export const CREATE_GROUP_CHORE = "CREATE_GROUP_CHORE";
export const CREATE_PERSONAL_CHORE = "CREATE_PERSONAL_CHORE";
export const EDIT_CHORE = "EDIT_CHORE";
export const ADD_POINT_VALUE = "ADD_POINT_VALUE";
export const DELETE_CHORE = "DELETE_CHORE";
export const DELETE_PERSONAL_CHORE = "DELETE_PERSONAL_CHORE";
export const TOGGLE_SHOW_COMPLETED = "TOGGLE_SHOW_COMPLETED";

const logIn = (dispatch, email, password) => async (dispatch) => {
    try {
        const res = await UsersDataService.checkLoginUser({emailId: email, password: password})

        dispatch({
            type: LOG_IN,
            profile: res.data
        })

        return true
    }
    catch (err) {
        return false
    }
}

//TODO: determine log out's affect on db
const logOut = (dispatch) =>
    dispatch({
        type : LOG_OUT
    })

//TODO: determine if this is needed since sign up won't affect state of application directly.
const signUp = (dispatch, email, username, password) => async (dispatch) => {
    try {
        const res = await UsersDataService.createNewUser({
            emailId: email,
            username: username,
            password: password,
            points : 0,
            backgroundImage: "white",
            //TODO: determine if want sound on by default
            successSound: true,
            chores: []
        })

        dispatch({
            type: LOG_IN,
            profile: res.data
        })

        return true
    }
    catch (err) {
        return false
    }
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

const createPersonalChore = (dispatch, userId, chore) => async (dispatch) => {
    try {
        console.log(userId)

        const res = await UsersDataService.addPersonalChore(userId, {
            done: chore.done,
            choreName: chore.choreName,
            dueDate: chore.dueDate,
            repeatChore: chore.repeatChore,
            choreInstructions: chore.choreInstructions,
            assignees: chore.assignees,
            assignor: chore.assignor,
            rewards: chore.rewards,
            points: chore.points,
            realLifeItem: chore.realLifeItem,
            splitReward: chore.splitReward
        })

        dispatch({
            type: CREATE_PERSONAL_CHORE,
            chore: res.data
        })

        return true
    }
    catch (err) {
        return false
    }
}

const createGroupChore= (dispatch, groupId, chore) => async (dispatch) => {
    try {
        const res = await GroupDataService.addGroupChore(groupId, {
            done: chore.done,
            choreName: chore.choreName,
            dueDate: chore.dueDate,
            repeatChore: chore.repeatChore,
            choreInstructions: chore.choreInstructions,
            assignees: chore.assignees,
            assignor: chore.assignor,
            rewards: chore.rewards,
            points: chore.points,
            realLifeItem: chore.realLifeItem,
            splitReward: chore.splitReward
        })

        dispatch({
            type: CREATE_GROUP_CHORE,
            groupId: groupId,
            chore: res.data
        })

        return true

    }
    catch (err) {
        return false
    }
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
    deleteChore, deletePersonalChore, toggleShowCompleted, createGroupChore, createPersonalChore
}

export default applicationActions;