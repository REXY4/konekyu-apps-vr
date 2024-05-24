import axios from "axios";
import { Dispatch } from "redux";
import { BaseUrl, configHeaderPrimary, configWithJwt } from "../../../config/api";
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


const getConnection = () => async (dispatch:Dispatch)=>{
        try {
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.hospot}/pop.html`, config);
            if(response.status == 200){
                dispatch({
                    type : LocationActionType.SET_POP,
                    popId : response.data ? response.data.toString().trim() : '318',
                    connect : true
                })
            }else{
                dispatch({
                    type : LocationActionType.SET_POP,
                    popId : response.data ? response.data.toString().trim() : '318',
                    connect : false
                })
            }
        } catch (error) {
            dispatch({
                type : LocationActionType.SET_POP,
                popId : '318',
                connect : false
            })
        }
}


export const LocationAction = {
    getLocationMember,
    getConnection
}
