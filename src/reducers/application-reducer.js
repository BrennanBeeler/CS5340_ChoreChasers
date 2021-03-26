import {LOG_IN, LOG_OUT, SET_ACTIVE_GROUP, CREATE_GROUP, GET_GROUP_DATA, CREATE_CHORE} from "../actions/actions";

const initialState = {
    loggedIn: false,
    //TODO: populate these
    activeProfile : "test",
    profile : {
            emailId: 'test',
            groupIds: [],
            username: 'max123',
            password:'password',
            chores: [
                {
                    id:"1",
                    done:true,
                    choreName: 'Call Anne about the party',
                    dueDate: new Date(),
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:0,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false}
                }]
    },
    activeGroupId : "Personal Chores",
    groups : [{
        id: "1",
        name: 'Family',
        progressBar: true,
        chores: [
            {
                id:1,
                done:false,
                choreName: 'Pick dad up from the airport',
                dueDate: new Date("2021-03-23"),
                repeatChore: "Never",
                choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                rewards:{points:true,realLifeItem:false},
                points:20,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:true,fcfs:false}
            },

            {
                id:"2",
                done:false,
                choreName: 'Wash the dishes',
                dueDate: new Date("2021-03-22"),
                repeatChore: "Weekly",
                choreInstructions: "",
                rewards:{points:false,realLifeItem:false},
                points:0,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:false,fcfs:false}
            }]
    }],
    pendingGroups : [{
        id: "1",
        name: 'Pending Family',
        progressBar: true,
        chores: [
            {
                id:1,
                done:false,
                choreName: 'Pick dad up from the airport',
                dueDate: new Date("2021-03-23"),
                repeatChore: "Never",
                choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                rewards:{points:true,realLifeItem:false},
                points:20,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:true,fcfs:false}
            },

            {
                id:"2",
                done:false,
                choreName: 'Wash the dishes',
                dueDate: new Date("2021-03-22"),
                repeatChore: "Weekly",
                choreInstructions: "",
                rewards:{points:false,realLifeItem:false},
                points:0,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:false,fcfs:false}
            }]
    }]
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
        //   TODO: validate via api
        case LOG_IN:
            // Confirms that the submitted email and password are in the profile dictionary
            if (action.email === state.profile.emailId && state.profile.password === action.password) {
                return {
                    ...state,
                    loggedIn: true,
                    activeProfile : action.email
                }
            }
            return state
        case SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroupId: action.activeGroupId
            }
        case CREATE_GROUP:
            return {
                ...state,
                groups : [
                    ...state.groups,
                    action.group.groupName
                ]
            }
        //    TODO: check once db connected
        // case GET_GROUP_DATA:
        //     return {
        //         ...state,
        //         groups : state.groups.filter(group => group.id === state.activeGroupId)
        //     }
        case CREATE_CHORE:
            return {
                ...state,
                chores : [
                    ...state.chores,
                    action.newChore
                ]
            }

        default:
            return state
    }
}

export default applicationReducer;