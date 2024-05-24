import { NavigationContainer } from "@react-navigation/native";
import Routers from "./src/routers";
import { Provider } from "react-redux";
import { persistore, store } from "./src/state/stores";
import { PersistGate } from "redux-persist/integration/react";
import { navigationRef } from "./src/routers/NavRef";

export default function App(){
 

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