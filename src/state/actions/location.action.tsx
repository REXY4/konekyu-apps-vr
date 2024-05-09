import axios from "axios";
import { Dispatch } from "redux";
import { BaseUrl, configWithJwt } from "../../../config/api";
import LocationActionType from "../actions-type/location.type";

const getLocationMember = () => async (dispatch:Dispatch)=>{
    try{
        const config = await configWithJwt();
        const response = await axios.get(`${BaseUrl.baseProd}/member/pop`, config);
        if(response.status == 200){
            dispatch({
                type : LocationActionType.GET_LOCATION_MEMBER,
                payload : response.data.clients
            })
        }
    }catch(err){
        console.log("error get location : ", err);
    }
}


export const LocationAction = {
    getLocationMember,
}
