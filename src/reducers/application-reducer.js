import {
    ADD_POINT_VALUE,
    CREATE_CHORE,
    CREATE_GROUP,
    DELETE_CHORE,
    DELETE_GROUP,
    DELETE_PERSONAL_CHORE,
    EDIT_CHORE,
    EDIT_GROUP,
    LOG_IN,
    LOG_OUT,
    SET_ACTIVE_GROUP,
    SET_BACKGROUND, SIGN_UP,
    TOGGLE_SHOW_COMPLETED,
    TOGGLE_SOUND
} from "../actions/actions";

const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        //TODO: figure out where log out buttons will go
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                activeProfile: null
            }
        case LOG_IN:
            return {
                ...state,
                loggedIn: true,
                activeProfile: state.profiles.filter((profile) => {
                    return profile.emailId === action.email;
                })[0]
            }
        case SIGN_UP:
            let createdProfile = {
                id: new Date().getTime(),
                background: "/cool-background2.svg",
                emailId: action.email,
                points: 0,
                soundEnabled: true,
                username: action.username,
                password: action.password,
                chores: []
            }

            return {
                ...state,
                profiles: [
                    ...state.profiles,
                    createdProfile
                ],
                activeProfile: createdProfile,
                loggedIn: true
            }

        case SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroupId: action.activeGroupId
            }
        case SET_BACKGROUND:
            const newProfile = state.activeProfile;
            newProfile.background = action.url;

            const newBackground = {
                ...state,
                activeProfile: newProfile,
            }
            return JSON.parse(JSON.stringify(newBackground));
        case TOGGLE_SOUND:
            const newProfilee = state.activeProfile;
            newProfilee.soundEnabled = !state.activeProfile.soundEnabled;

            const newSound = {
                ...state,
                activeProfile: newProfilee,
            }
            return JSON.parse(JSON.stringify(newSound));
        //    TODO: redo now that data is local only
        case CREATE_GROUP:
            return {
                ...state,
                groups: [
                    ...state.groups,
                    action.group
                ]
            }
        case CREATE_CHORE:
            if (action.groupName === "Personal Chores") {
                state.activeProfile.chores.push(action.chore);

                return {
                    ...state
                }
            }
            else {
                let tempGroups = state.groups;
                tempGroups.forEach(group => group.name === action.groupName ? group.chores = [...group.chores, action.chore] : group)

                return {
                    ...state,
                    groups: tempGroups
                }
            }
        case EDIT_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => group.id === action.group.id ? action.group : group)

            }
        case DELETE_GROUP:
            if (action.group) {
                const newGroups = state.groups;
                const temp = []
                newGroups.forEach(group => {
                    if (group.id !== action.group.id) {
                        temp.push(group);
                    }
                })

                return {
                    ...state,
                    activeGroupId: "Personal Chores",
                    groups: temp
                }
            }
            else {
                return {
                    ...state,
                }
            }
        case DELETE_CHORE:
            let modifiedGroup = state.groups.filter(group => {
                return group.id === action.chore.group
            })[0]

            modifiedGroup.chores = modifiedGroup.chores.filter(chore => chore.id !== action.chore.id)

            let newState = {
                ...state,
                groups: state.groups.map(group => group.id === modifiedGroup.id ? modifiedGroup : group)
            }

            return JSON.parse(JSON.stringify(newState))
        case EDIT_CHORE:
            if (action.chore.group === "Personal Chores") {
                state.activeProfile.chores = state.activeProfile.chores.map(chore => {
                    if (action.chore.id === chore.id) {
                        return action.chore
                    }
                    else {
                        return chore
                    }
                })

                return {
                    ...state,
                }
            }
            else {
                const groups = state.groups;
                state.groups = groups.map(group => {
                    if (group.id === action.chore.group) {
                        group.chores = group.chores.map(chore =>
                            action.chore.id === chore.id ? action.chore : chore);
                        return group;
                    } else {
                        return group;
                    }
                })

                return JSON.parse(JSON.stringify(state))
            }
        case ADD_POINT_VALUE:
            state.activeProfile.points += action.points;
            return {
                ...state
            }

        case DELETE_PERSONAL_CHORE:
            let initialProfile = state.activeProfile
            initialProfile.chores = initialProfile.chores.filter(chore => chore.id !== action.chore.id)

            return {
                ...state,
                activeProfile: initialProfile
            }
        case TOGGLE_SHOW_COMPLETED:
            let toggleChangedState = {
                ...state,
                showCompleted: !state.showCompleted
            }

            return JSON.parse(JSON.stringify(toggleChangedState))
        default:
            return state
    }
}

export default applicationReducer;