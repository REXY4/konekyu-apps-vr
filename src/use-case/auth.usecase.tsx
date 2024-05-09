import { useDispatch, useSelector } from "react-redux";
import { AuthSettingStore } from "../state/setting-store/auth.setting.store";
import { AppRootState } from "../state/stores";
import { AuthStoreState } from "../state/reducers/auth.reducers";
import { useCallback } from "react";
import AuthAction from "../state/actions/auth.action";
import { RequestLoginEntities } from "../entities/auth.entities";

const selector = (App:AppRootState) => App.auth;

const AuthUseCase = ():AuthSettingStore=>{
    const {
        isLogin,
        authResult,
        modal
    } = useSelector<
    AppRootState,
    AuthStoreState
    >(selector);
    const dispatch = useDispatch();
    const AuthLogin = useCallback((body:RequestLoginEntities)=>AuthAction.AuthLogin(body)(dispatch),[dispatch]);
    return{
        isLogin,
        authResult,
        modal,
        
        AuthLogin,
    }
}

export default AuthUseCase;