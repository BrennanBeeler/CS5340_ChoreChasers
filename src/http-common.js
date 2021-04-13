import axios from "axios";

export default axios.create({
  baseURL: "mongodb+srv://cc:ccbpp@cluster0.wylhg.mongodb.net/chorechaser?retryWrites=true&w=majority",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  }
});