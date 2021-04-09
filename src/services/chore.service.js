import http from "../http-common";

class ChoresDataService {
  // getAll() {
  //   return http.get("/chores");
  // }

  //Get a specific chore with its id
  getChoreWithId(id) {
    return http.get(`/chores/id/${id}`);
  }

  // Update a Chore
  updateChore(id, newChoreData) {
    return http.put(`/chores/id/${id}`, newChoreData);
  }

  //Delete a specific Chore with its id
  deleteChore(id) {
    return http.delete(`/chores/id/${id}`);
  }

  //Delete all Chores in the chores collection
  deleteAllChores() {
    return http.delete(`/chores/`);
  }
}

export default new ChoresDataService();