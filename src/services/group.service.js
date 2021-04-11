import http from "../http-common";

class GroupsDataService {
    // getAll() {
    //   return http.get("/groups");
    // }

    // Create a new Group
    createNewGroup(newGroupData) {
        return http.post(`/groups/`, newGroupData);
    }

    //Add a chore to an existing Group
    addGroupChore(id,newChoreData) {
        return http.post(`/groups/chores/id/${id}`, newChoreData);
    }

    addGroupMember(id,userData) {
        return http.post(`/groups/member/id/${id}`, userData)
    }

    //Add existing user as member to existing Group
    getGroupWithUserId(id) {
        return http.get(`/groups/users/id/${id}`);
    }

    //Get a specific Group with its id
    getGroupWithId(id) {
        return http.get(`/groups/id/${id}`);
    }

    // // Update a Group
    // updateGroup(id, newGroupData) {
    //     return http.put(`/groups/id/${id}`, newGroupData);
    // }

    //Delete a specific Chore with its id
    deleteGroup(id) {
        return http.delete(`/groups/id/${id}`);
    }

    //Delete all Chores in the chores collection
    deleteAllChores() {
        return http.delete(`/groups/`);
    }
}

export default new GroupsDataService();