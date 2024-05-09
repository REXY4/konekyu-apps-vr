import { useDispatch, useSelector } from "react-redux";
import { AuthSettingStore } from "../state/setting-store/auth.setting.store";
import { AppRootState } from "../state/stores";
import { AuthStoreState } from "../state/reducers/auth.reducers";
import { useCallback } from "react";
import AuthAction from "../state/actions/auth.action";
import { RequestLoginEntities } from "../entities/auth.entities";
import { LocationSettiingStore } from "../state/setting-store/location.setting.store";
import { LocationStoreState } from "../state/reducers/location.reducers";
import { LocationAction } from "../state/actions/location.action";

const selector = (App:AppRootState) => App.locationMember;

const LocationUseCase = ():LocationSettiingStore=>{
    const {
        locationData
    } = useSelector<
    AppRootState,
    LocationStoreState
    >(selector);
    const dispatch = useDispatch();
    const GetLocationMember = useCallback(()=>LocationAction.getLocationMember()(dispatch),[dispatch])
    return{
       locationData,

       GetLocationMember,
    }
}

export default LocationUseCase;