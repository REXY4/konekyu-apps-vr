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
    connectData : false,
    conVoucher : {
        val : "",
        condition : false,
        time : 0,
        currentTime : 0,
    },
    popData : {
        connect : false,
        popId : "",
    },
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
                    popId : action.popId,
                }
            } 
        case LocationActionType.CON_VOUCHER:
            return {
                ...state,
                conVoucher : {
                    val : action.val,
                    condition : action.condition,
                    currentTime : action.currentTime
                }
            }    
        case LocationActionType.CON:
            return {
                ...state,
                connectData : action.payload
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

