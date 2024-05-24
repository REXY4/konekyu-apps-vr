import { combineReducers } from "redux";
import AuthReducers from "./auth.reducers";
import LocationReducers from "./location.reducers";
import SettingReducers from "./setting.reducers";

const reducers = combineReducers({
    auth : AuthReducers,
    locationMember : LocationReducers,
    setting : SettingReducers
});


export default reducers;