import { AnyAction } from 'redux';
import LocationActionType from '../actions-type/location.type';
import { LocationSettiingStore } from '../setting-store/location.setting.store';


type LocationStoreState = Omit<
    LocationSettiingStore,
    'GetLocationMember'
>

const INITIAL_STATE: LocationStoreState = {
    locationData : null
};

const LocationReducers = (state: LocationStoreState | any = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case LocationActionType.GET_LOCATION_MEMBER:
            return {
                ...state,
                locationData : action.payload
            }                 
        default:
            return state;
    }
};

export default LocationReducers;
export type { LocationStoreState };

