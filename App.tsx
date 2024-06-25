import { NavigationContainer } from "@react-navigation/native";
import Routers from "./src/routers";
import { Provider } from "react-redux";
import { persistore, store } from "./src/state/stores";
import { PersistGate } from "redux-persist/integration/react";
import { navigationRef } from "./src/routers/NavRef";
import { useEffect } from "react";
import { initializeAppodeal } from "./src/utils/appodealConfig";

export default function App(){

  // useEffect(()=>{
  //   initializeAppodeal();
  // },[]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        <NavigationContainer ref={navigationRef}>
          <Routers/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}