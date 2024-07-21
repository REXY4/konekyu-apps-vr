import axios from "axios";
import { Dispatch } from "redux";
import { BaseUrl, configHeaderPrimary, configWithJwt, configWithOpenGuest } from "../../../config/api";
import LocationActionType from "../actions-type/location.type";


const getLocationMember = () => async (dispatch:Dispatch)=>{
    try{

        const response = await axios.get(`${BaseUrl.baseProd}/member/pop-news`, configWithOpenGuest);
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
            const response = await axios.get(`${BaseUrl.baseHotspot}/pop.html`, configHeaderPrimary);
            if(response.status == 200){
          

                // dispatch({
                //     type : LocationActionType.CON,
                //     payload : false,
                // });
                dispatch({
                    type : LocationActionType.SET_POP,
                    popId : response.data ? response.data.toString().trim() : '2',
                    connect : true
                })
            }else{
                dispatch({
                    type : LocationActionType.SET_POP,
                    popId : response.data ? response.data.toString().trim() : '2',
                    connect : false
                })
            }
        } catch (error) {
            const response = await axios.get(`${BaseUrl.baseHotspot}/pop.html`, configHeaderPrimary);
            console.log("check data response id ", response);
            const getDefault = axios.get(`${BaseUrl.baseProd}/member/pop-news/default`, configWithOpenGuest)
            .then((result:any)=>{
                if(result.status == 200){
                    console.log(result.data.client)
                    dispatch({
                        type : LocationActionType.SET_POP,
                        popId : result.data.client.id,
                        connect : false
                    })
                }else{
                    // dispatch({
                    //     type : SettingActionType.SET_ALERT,
                    //     isOpen : true,
                    //     message : 'connect pop default failed',
                    //     status : "error",
                    // })
                }
            }).catch((err)=>{
                // dispatch({
                //     type : SettingActionType.SET_ALERT,
                //     isOpen : true,
                //     message : 'connect pop default failed',
                //     status : "error",
                // })
            });
        }
}


export const LocationAction = {
    getLocationMember,
    getConnection
}
