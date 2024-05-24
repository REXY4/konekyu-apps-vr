import { AnyAction } from 'redux';
import LocationActionType from '../actions-type/location.type';
import { LocationSettiingStore } from '../setting-store/location.setting.store';


type LocationStoreState = Omit<
    LocationSettiingStore,
    'GetLocationMember' | 
    "getConnection"
>

const INITIAL_STATE: LocationStoreState = {
    locationData : null,
    detailLocation : null,
    detailId : 0,
    xenditLink : "",
    voucherData : "",
    popData : {
        connect : false,
        popId : "318"
    }
};

const LocationReducers = (state: LocationStoreState | any = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case LocationActionType.GET_LOCATION_MEMBER:
            return {
                ...state,
                locationData : action.payload
            }
        case LocationActionType.GET_DETAIL_LOCATION:
            return {
                ...state,
                detailLocation : action.payload,
            }    
        case LocationActionType.DETAIL_ARTICLE:
            return{
                ...state,
                detailId : action.payload,
            }
        case LocationActionType.BUY_VOUCHER:
            return {
                ...state,
                xenditLink : action.payload
            } 
        case LocationActionType.SET_POP:
            return {
                ...state,
                popData : {
                    connect : action.connect,
                    popId : action.popId
                }
            }    
        case LocationActionType.VAL_VOUCHER:
            return{
                ...state,
                voucherData : action.payload,
            }                           
        default:
            return state;
    }
};

export default LocationReducers;
export type { LocationStoreState };

