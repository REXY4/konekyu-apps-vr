import { useDispatch, useSelector } from "react-redux";
import { SettingStore } from "../state/setting-store/setting.store";
import { AppRootState } from "../state/stores";
import { SettingStoreState } from "../state/reducers/setting.reducers";

const selector = (App:AppRootState) => App.setting;

const SettingUseCase = ():SettingStore=>{
    const {
        isLoading,
        alert,
        splashScreen,
    } = useSelector<
    AppRootState,
    SettingStoreState
    >(selector);
  
    return{
      splashScreen,
      isLoading,
      alert,
    }
}

export default SettingUseCase;