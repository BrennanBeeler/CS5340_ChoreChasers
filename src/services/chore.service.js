import http from "../http-common";

class ChoresDataService {
  getAll() {
    return http.get("/chores");
  }

  get(id) {
    return http.get(`/chores/${id}`);
  }

  create(data) {
    return http.post("/chores", data);
  }

  update(id, data) {
    return http.put(`/chores/${id}`, data);
  }

  delete(id) {
    return http.delete(`/chores/${id}`);
  }

  deleteAll() {
    return http.delete(`/chores`);
  }
}

export default new ChoresDataService();