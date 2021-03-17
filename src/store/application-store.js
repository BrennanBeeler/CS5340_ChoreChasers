import {createStore} from "redux";
import applicationReducer from "../reducers/application-reducer";

let applicationStore = createStore(applicationReducer)

export default applicationStore;