import {LOG_IN, LOG_OUT, SET_ACTIVE_GROUP, CREATE_GROUP, GET_GROUP_DATA, CREATE_CHORE, EDIT_CHORE, ADD_POINT_VALUE} from "../actions/actions";
import {CREATE_GROUP, DELETE_CHORE, DELETE_PERSONAL_CHORE, LOG_IN, LOG_OUT, SET_ACTIVE_GROUP, CREATE_CHORE} from "../actions/actions";

const initialState = {
    loggedIn: false,
    //TODO: populate these
    activeProfile : "test",
    profile : {
            id : "test",
            emailId: 'test@email.com',
            points: 5,
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
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: new Date("2021-03-23")

                },
                {
                    id:"2",
                    done:true,
                    choreName: 'Test',
                    dueDate: new Date(),
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:0,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: new Date("2021-03-23")

                }]
    },
    activeGroupId : "Personal Chores",
    groups : [{
        id: "1",
        name: 'Family',
        progressBar: true,
        members: ["test1", "test2", "test3", "max123"],
        chores: [
            //TODO: required fields- id, done, chorename, rewards,splitrewards, assignor, assignees
            {
                id:"1",
                done:false,
                choreName: 'Pick dad up from the airport',
                dueDate: new Date("2021-03-23"),
                repeatChore: "Never",
                choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                rewards:{points:true,realLifeItem:false},
                points:20,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:true,fcfs:false},
                dateAdded: new Date("2021-03-23"),
                assignor: "Steve",
                //TODO:
                assignees: ["max123"]
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
            }
        ]
    },
        {
            id: "2",
            name: 'Roomies',
            progressBar: true,
            members: [],
            chores: [
                //TODO: required fields- id, done, chorename, rewards,splitrewards, assignor, assignees
                {
                    id:"1",
                    done:false,
                    choreName: 'Pick dad up from the airport',
                    dueDate: new Date("2021-03-23"),
                    repeatChore: "Never",
                    choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"",
                    splitReward:{everyoneGetsReward:true,fcfs:false},
                    dateAdded: new Date("2021-03-23"),
                    assignor: "Steve",
                    //TODO:
                    assignees: ["max123"]
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
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: null,
                    assignor: "Steve",
                    assignees: ["max123, Steve, Frank"]
                }]
        }
    ]
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
        //   TODO: redo
        case LOG_IN:
            // TODO: redo once db connected
            if (action.id === state.profile.id) {
                return {
                    ...state,
                    loggedIn: true,
                    activeProfile : action.id
                }
            }
            return state
        case SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroupId: action.activeGroupId
            }
        //    TODO: redo
        case CREATE_GROUP:
            return {
                ...state,
                groups : [
                    ...state.groups,
                    action.group
                ]
            }
        //    TODO: check once db connected
        // case GET_GROUP_DATA:
        //     return {
        //         ...state,
        //         groups : state.groups.filter(group => group.id === state.activeGroupId)
        //     }
        case CREATE_CHORE:
            if (action.groupName === "Personal Chores") {
                state.profile.chores.push(action.chore);

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
        case DELETE_CHORE:
            let modifiedGroup = action.group
            modifiedGroup.chores = modifiedGroup.chores.filter(chore => chore.id !== action.choreId)

            let newState = {
                ...state,
                groups: state.groups.map(group => group.id === modifiedGroup.id ? modifiedGroup : group)

            }
        case EDIT_CHORE:
            const newChores = state.chores.map(chore => action.chore.id === chore.id ? action.chore : chore);
            return {
                ...state,
                chores : [
                    newChores
                ]
            }
        case ADD_POINT_VALUE:
            state.profile.points += action.points;
            console.log(state.profile.points);
            return {
                ...state
            }

            return JSON.parse(JSON.stringify(newState))
        case DELETE_PERSONAL_CHORE:
            let initialProfile = state.profile
            initialProfile.chores = initialProfile.chores.filter(chore => chore.id !== action.choreId)

            return {
                ...state,
                profile: initialProfile
            }
        default:
            return state
    }
}

export default applicationReducer;