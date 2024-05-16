import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocationAction } from "../state/actions/location.action";
import { LocationStoreState } from "../state/reducers/location.reducers";
import { LocationSettiingStore } from "../state/setting-store/location.setting.store";
import { AppRootState } from "../state/stores";

const selector = (App:AppRootState) => App.locationMember;

const LocationUseCase = ():LocationSettiingStore=>{
    const {
        locationData,
        detailLocation,
    } = useSelector<
    AppRootState,
    LocationStoreState
    >(selector);
    const dispatch = useDispatch();
    const GetLocationMember = useCallback(()=>LocationAction.getLocationMember()(dispatch),[dispatch])
    return{
       locationData,
       detailLocation,

       GetLocationMember,
    }
}

export default LocationUseCase;