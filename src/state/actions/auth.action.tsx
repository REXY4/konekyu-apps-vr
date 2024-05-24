import { Dispatch } from "redux";
import { RequestLoginEntities } from "../../entities/auth.entities";
import axios, { AxiosResponse } from "axios";
import { BaseUrl, configHeaderPrimary } from "../../../config/api";
import { ResponseAuthEntities } from "../../entities/repsonse.entities";
import AuthActionType from "../actions-type/auth.type";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import SettingActionType from "../actions-type/setting.type";

const AuthLogin = (body:RequestLoginEntities) =>async(dispatch:Dispatch) =>{
    dispatch({
        type : SettingActionType.SET_LOADING,
        payload : true,
    })
    try{
        const response = await axios.post(`${BaseUrl.baseProd}/auth/login`, body, configHeaderPrimary);
        console.log("check response ",response.data.result)
        if(response.status == 200){
            dispatch({
                type : AuthActionType.LOGIN,
                payload : response.data.result,
            })
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false,
            })
             navigate(ScreenActionType.HOME);
        }else{
            //alert
        }
    }catch(err){
        console.log(err)
//alert
    }
}

const AuthAction = {
    AuthLogin
}

export default AuthAction;
