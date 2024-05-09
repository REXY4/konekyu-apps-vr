import { combineReducers } from "redux";
import AuthReducers from "./auth.reducers";
import LocationReducers from "./location.reducers";

const reducers = combineReducers({
    auth : AuthReducers,
    locationMember : LocationReducers
});


export default reducers;