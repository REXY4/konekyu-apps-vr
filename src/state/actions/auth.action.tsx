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
    try{
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true,
        })
        const response = await axios.post(`${BaseUrl.baseProd}/auth/login`, {...body, type:"konfirmasi"}, configHeaderPrimary);
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
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                message : "Email dan password kamu salah, silahkan check email dan password kembali!",
                status : "error"
            })
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false,
            })
        }
    }catch(err){
        console.log("error login ",err);
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : false,
        })
        dispatch({
            type : SettingActionType.SET_ALERT,
            isOpen : true,
            message : "Email dan password kamu salah, silahkan check email dan password kembali!",
            status : "error"
        })
       
    }
}

const AuthAction = {
    AuthLogin
}

export default AuthAction;
