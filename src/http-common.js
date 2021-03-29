import axios from "axios";

export default axios.create({
  baseURL: "mongodb://localhost:/chorechaser/api",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  }
});