import { AnyAction } from 'redux';
import { LocationSettiingStore } from '../setting-store/location.setting.store';
import { SettingStore } from '../setting-store/setting.store';
import SettingActionType from '../actions-type/setting.type';


type SettingStoreState = Omit<
    SettingStore,
    ""
>

const INITIAL_STATE: SettingStoreState = {
    isLoading : false,
    alert : {
        status : "success",
        isOpen: false,
        message : ""
    },
};

const SettingReducers = (state: SettingStoreState | any = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case SettingActionType.SET_LOADING:
            return {
                ...state,
                isLoading : action.payload
            }
        case SettingActionType.SET_ALERT:
            return {
                ...state,
                alert : {
                    status : action.status,
                    isOpen: action.isOpen,
                    message : action.message
                },
            }    
        default:
            return state;
    }
};

export default SettingReducers;
export type { SettingStoreState };

