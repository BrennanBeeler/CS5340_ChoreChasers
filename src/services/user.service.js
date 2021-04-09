import http from "../http-common";

class UsersDataService {
  // getAll() {
  //   return http.get("/users");
  // }

  // Create a new User
  createNewUser(newUserData) {
    return http.post(`/users/`, newUserData);
  }

  //Add a chore to an existing user's personal chores
  addPersonalChore(id,newChoreData) {
    return http.post(`/users/chores/id/${id}`, newChoreData);
  }

  //Get a specific User with their id
  getUserWithId(id) {
    return http.get(`/users/id/${id}`);
  }

  //Get a specific User with their emailId --still doubtful
  getUserWithEmail(email) {
    return http.get(`/users/email/${email}`);
  }

  //Get a specific User with their username
  getUserWithUsername(username) {
    return http.get(`/users/username/${username}`);
  }

  //Check if a User exists before logging them in
  checkLoginUser(userData) {
    return http.post(`/users/login/`, userData);
  }

  // // Update a User
  // updateUser(id, newUserData) {
  //     return http.put(`/users/id/${id}`, newUserData);
  // }

  //Delete a specific User with its id
  deleteUser(id) {
    return http.delete(`/users/id/${id}`);
  }

  //Delete all Users in the users collection
  deleteAllUsers() {
    return http.delete(`/users/`);
  }
}

export default new UsersDataService();