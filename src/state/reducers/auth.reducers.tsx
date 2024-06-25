import { AnyAction } from 'redux';
import { AuthSettingStore } from '../setting-store/auth.setting.store';
import AuthActionType from '../actions-type/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthStoreState = Omit<
    AuthSettingStore,
    'AuthLogin'
>

const INITIAL_STATE: AuthStoreState = {
    isLogin: false,
    authResult : null,
    modal : false,
    voucherVal : ''
};

const AuthReducers = (state: AuthStoreState | any = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            AsyncStorage.setItem("token", action.payload.token)
            return {
                authResult : action.payload,
                isLogin : true,
            };
        case AuthActionType.MODAL_ALERT:
            return {
                ...state,
                modal : action.modal
            }
        case AuthActionType.VOUCHER_VAL:
                return {
                    ...state,
                    voucherVal : action.payload
                }    
        case AuthActionType.LOGOUT:
            return {
                    ...state,
                    authResult : null,
                    modal : false,
                    isLogin: false,
            }         
        default:
            return state;
    }
};

export default AuthReducers;
export type { AuthStoreState };

