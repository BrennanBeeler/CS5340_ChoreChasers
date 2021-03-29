import {LOG_IN,
    LOG_OUT,
    SET_ACTIVE_GROUP,
    CREATE_GROUP,
    GET_GROUP_DATA,
    EDIT_GROUP,
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
            emailId: 'test@email.com',
            points: 0,
            groupIds: [],
            username: 'max123',
            password:'password',
            chores: [
                {
                    id:"1",
                    done:false,
                    choreName: 'Call Anne about the party',
                    dueDate: "2025-03-23T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "max123",
                    assignees: ["max123"]
                },
                {
                    id:"2",
                    done:false,
                    choreName: 'Drive somewhere',
                    dueDate: "2025-03-23T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "max123",
                    assignees: ["max123"]
                },
                {
                    id:"3",
                    done:false,
                    choreName: 'Overduetest',
                    dueDate: "2025-03-23T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "max123",
                    assignees: ["max123"]
                },
                {
                    id:"4",
                    done:false,
                    choreName: 'Overduetest2',
                    dueDate: "2025-03-23T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "max123",
                    assignees: ["max123"]
                },
                {
                    id:"5",
                    done:false,
                    choreName: 'Test',
                    dueDate: null,
                    repeatChore: "Never",
                    choreInstructions: "Call before 6PM",
                    rewards:{points:false,realLifeItem:true},
                    points:0,
                    realLifeItem:"snack",
                    splitReward:{everyoneGetsReward:false,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "max123",
                    assignees: ["max123"]
                }]
    },
    activeGroupId : "Personal Chores",
    groups : [{
        id: "1",
        name: 'Family',
        progressBar: false,
        members: ["test1", "test2", "test3", "max123"],
        chores: [
            //TODO: required fields- id, done, chorename, rewards,splitrewards, assignor, assignees
            {
                id:"1",
                done:false,
                choreName: 'Pick dad up from the airport',
                dueDate: "2025-03-23T00:00:00.000Z",
                repeatChore: "Never",
                choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                rewards:{points:true,realLifeItem:false},
                points:20,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:true,fcfs:false},
                dateAdded: "2025-03-23T00:00:00.000Z",
                assignor: "Steve",
                assignees: ["max123"]
            },
            {
                id:"2",
                done:false,
                choreName: 'Wash the dishes',
                dueDate: "2025-03-23T00:00:00.000Z",
                repeatChore: "Weekly",
                choreInstructions: "",
                rewards:{points:false,realLifeItem:false},
                points:5,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:false,fcfs:false},
                dateAdded: "2025-03-23T00:00:00.000Z",
                assignor: "Steve",
                assignees: ['test1']
            },
            {
                id:"3",
                done:false,
                choreName: 'test1',
                dueDate: "2025-03-23T00:00:00.000Z",
                repeatChore: "Never",
                choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                rewards:{points:true,realLifeItem:false},
                points:20,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:true,fcfs:false},
                dateAdded: "2025-03-23T00:00:00.000Z",
                assignor: "Steve",
                assignees: ["max123"]
            },

            {
                id:"4",
                done:false,
                choreName: 'test2',
                dueDate: "2025-03-23T00:00:00.000Z",
                repeatChore: "Weekly",
                choreInstructions: "",
                rewards:{points:false,realLifeItem:false},
                points:5,
                realLifeItem:"",
                splitReward:{everyoneGetsReward:false,fcfs:false},
                dateAdded: "2025-03-23T00:00:00.000Z",
                assignor: "Steve",
                assignees: ['test1']
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
                    id:"3",
                    done:false,
                    choreName: 'Pick dad up from the airport',
                    dueDate: "2025-03-23T00:00:00.000Z",
                    repeatChore: "Never",
                    choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
                    rewards:{points:true,realLifeItem:false},
                    points:20,
                    realLifeItem:"",
                    splitReward:{everyoneGetsReward:true,fcfs:false},
                    dateAdded: "2025-03-23T00:00:00.000Z",
                    assignor: "Steve",
                    assignees: ["max123"]
                },

                {
                    id:"4",
                    done:false,
                    choreName: 'Wash the dishes',
                    dueDate: "2025-03-23T00:00:00.000Z",
                    repeatChore: "Weekly",
                    choreInstructions: "",
                    rewards:{points:false,realLifeItem:false},
                    points:5,
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
        case EDIT_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => group.id === action.group.id ? action.group : group)

            }

        case DELETE_CHORE:
            console.log("calling delete")
            let modifiedGroup = action.group
            modifiedGroup.chores = modifiedGroup.chores.filter(chore => chore.id !== action.choreId)

            let newState = {
                ...state,
                groups: state.groups.map(group => group.id === modifiedGroup.id ? modifiedGroup : group)

            }

            console.log(newState)

            return JSON.parse(JSON.stringify(newState))
        case EDIT_CHORE:
            if (action.groupId === "Personal Chores") {
              state.profile.chores = state.profile.chores.map(chore => {
                if (action.chore.id === chore.id) {
                  return action.chore
                } else {
                  return chore
                }
              })

              return {
                ...state,
              }
            } else {
              const groups = state.groups;
              state.groups = groups.map(group => {
                if (group.id === action.groupId) {
                  const chores = group.chores.map(chore => action.chore.id === chore.id ? action.chore : chore);
                  group.chores = chores;
                  return group;
                } else {
                  return group;
                }
              })
              return {
                ...state,
              }
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