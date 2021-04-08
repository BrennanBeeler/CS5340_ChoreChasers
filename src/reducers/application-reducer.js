import {LOG_IN,
    LOG_OUT,
    SET_ACTIVE_GROUP,
    SET_BACKGROUND,
    CREATE_GROUP,
    GET_GROUP_DATA,
    EDIT_GROUP,
    DELETE_GROUP,
    CREATE_CHORE,
    EDIT_CHORE,
    ADD_POINT_VALUE,
    DELETE_CHORE,
    DELETE_PERSONAL_CHORE} from "../actions/actions";


const initialState = {
    loggedIn: false,
    //TODO: populate these
    activeProfile : "test",
    profile : {
            id : "test",
            background: "https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg",
            emailId: 'test@email.com',
            points: 0,
            username: 'Max',
            password:'password',
            chores: [
                {
                    id:"1",
                    done:false,
                    choreName: 'Call Anne about the party',
                    dueDate: "2021-04-07T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2021-03-15T00:00:00.000Z",
                    assignor: "Max",
                    assignees: ["Max"]
                },
                {
                    id:"2",
                    done:false,
                    choreName: "Don't smoke",
                    dueDate: "2021-04-07T00:00:00.000Z",
                    repeatChore: "Daily",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:false,realLifeItem:true},
                    points:0,
                    realLifeItem:"Cookie per day",
                    splitReward:{everyoneGetsReward:true,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "Max",
                    assignees: ["Max"]
                },
                {
                    id:"3",
                    done:false,
                    choreName: 'Practice piano',
                    dueDate: "2021-04-03T00:00:00.000Z",
                    repeatChore: "Weekly",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2021-02-01T00:00:00.000Z",
                    assignor: "Max",
                    assignees: ["Max"]
                },
                {
                    id:"4",
                    done:false,
                    choreName: 'Successfully bench 100lbs',
                    dueDate: null,
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:true},
                    points:20,
                    realLifeItem:"Pizza night",
                    splitReward:{everyoneGetsReward:true,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "Max",
                    assignees: ["Max"]
                },
                {
                    id:"5",
                    done:false,
                    choreName: 'Read Chapter 14',
                    dueDate: "2021-04-04T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "Online textbook",
                    rewards:{points:true,realLifeItem:false},
                    points:10,
                    realLifeItem:"",
                    splitReward:{everyoneGetsReward:true,fcfs:false},
                    dateAdded: "2021-03-23T00:00:00.000Z",
                    assignor: "Max",
                    assignees: ["Max"]
                }]
    },
    activeGroupId : "Personal Chores",
    groups : [{
        id: "1",
        name: 'Family',
        progressBar: false,
        members: ["Marie", "Abby", "Vinnie", "Alan", "Max"],
        chores: [
            {
                id:"1",
                done:false,
                choreName: 'Vacuum',
                repeatChore: "Weekly",
                choreInstructions: "",
                rewards:{points:true,realLifeItem:false},
                points:5,
                realLifeItem:"",
                dueDate: "2021-04-05T00:00:00.000Z",
                splitReward:{everyoneGetsReward:true,fcfs:false},
                dateAdded: "2021-03-23T00:00:00.000Z",
                assignor: "Marie",
                assignees: ["Marie"]
            },
            {
                id:"2",
                done:false,
                choreName: 'Finish laundry',
                dueDate: null,
                repeatChore: "Never",
                choreInstructions: "",
                rewards:{points:true,realLifeItem:false},
                points:20,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:true,fcfs:false},
                dateAdded: "2021-03-30T00:00:00.000Z",
                assignor: "Vinnie",
                assignees: ["Max"]
            },

            {
                id:"3",
                done:false,
                choreName: 'Take out the trash',
                dueDate: "2025-03-23T00:00:00.000Z",
                repeatChore: "Weekly",
                choreInstructions: "",
                rewards:{points:true,realLifeItem:false},
                points:5,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:false,fcfs:false},
                dateAdded: "2025-03-23T00:00:00.000Z",
                assignor: "Max",
                assignees: ['Vinnie']
            }
        ]
    },
        {
            id: "2",
            name: 'Group Project',
            progressBar: true,
            members: ['Chad', 'Brian', "Max"],
            chores: [
                //TODO: required fields- id, done, chorename, rewards,splitrewards, assignor, assignees
                {
                    id:"1",
                    done:false,
                    choreName: 'Write documentation',
                    dueDate: "2021-04-23T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"",
                    splitReward:{everyoneGetsReward:false,fcfs:true},
                    dateAdded: "2025-04-01T00:00:00.000Z",
                    assignor: "Chad",
                    assignees: ["Max"]
                },

                {
                    id:"2",
                    done:false,
                    choreName: 'Test section 3',
                    dueDate: "2021-04-12T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "",
                    rewards:{points:true,realLifeItem:false},
                    points:5,
                    realLifeItem:"",
                    splitReward:{everyoneGetsReward:false,fcfs:true},
                    dateAdded: "2021-04-02T00:00:00.000Z",
                    assignor: "Brian",
                    assignees: ["Max"]
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
                    activeProfile: action.id
                }
            }
            return state
        case SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroupId: action.activeGroupId
            }
        case SET_BACKGROUND:
            const newProfile = state.profile;
            newProfile.background = action.url;

            return {
                ...state,
                profile: newProfile,
            }
      //    TODO: redo
        case CREATE_GROUP:
            return {
                ...state,
                groups: [
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
            } else {
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

        // TODO: Remove once connected to db, this is only for Leave Group
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
            let modifiedGroup = action.group
            modifiedGroup.chores = modifiedGroup.chores.filter(chore => chore.id !== action.choreId)

            let newState = {
                ...state,
                groups: state.groups.map(group => group.id === modifiedGroup.id ? modifiedGroup : group)

            }

            return JSON.parse(JSON.stringify(newState))
        case EDIT_CHORE:
            if (action.groupId === "Personal Chores") {
                state.profile.chores = state.profile.chores.map(chore => {
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
                    if (group.id === action.groupId) {
                        const chores = group.chores.map(chore =>
                            action.chore.id === chore.id ? action.chore : chore);
                        group.chores = chores;
                        return group;
                    } else {
                        return group;
                    }
                })

                return JSON.parse(JSON.stringify(state))
            }
        case ADD_POINT_VALUE:
            state.profile.points += action.points;
            return {
                ...state
            }

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