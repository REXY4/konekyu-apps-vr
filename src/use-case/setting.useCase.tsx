import { useDispatch, useSelector } from "react-redux";
import { SettingStore } from "../state/setting-store/setting.store";
import { AppRootState } from "../state/stores";
import { SettingStoreState } from "../state/reducers/setting.reducers";

const selector = (App:AppRootState) => App.setting;

const SettingUseCase = ():SettingStore=>{
    const {
        isLoading,
        alert
    } = useSelector<
    AppRootState,
    SettingStoreState
    >(selector);
  
    return{
      isLoading,
      alert,
    }
}

export default SettingUseCase;