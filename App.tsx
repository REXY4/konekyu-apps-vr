import { Link, NavigationContainer, useNavigation } from "@react-navigation/native";
import Routers from "./src/routers";
import { Provider } from "react-redux";
import { persistore, store } from "./src/state/stores";
import { PersistGate } from "redux-persist/integration/react";
import { navigate, navigationRef } from "./src/routers/NavRef";
import { useEffect, useState } from "react";
import { initializeAppodeal } from "./src/utils/appodealConfig";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { AppState, Linking } from "react-native";
import axios from "axios";
import { BaseUrl, configHeaderPrimary } from "./config/api";
import ScreenActionType from "./src/routers/types/ScreenActionType";
import { RequestLoginEntities } from "./src/entities/auth.entities";
import AuthUseCase from "./src/use-case/auth.usecase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRequests } from "react-native-network-logger"; 

export default function App(){
  
  // useEffect(() => {
  //   const handleDeepLink = (url:any) => {
  //     // Tangani URI yang diterima di sini
  //     console.log('Deep link received:', url);
  //   };

  //   const handleAppStateChange = (nextAppState:any) => {
  //     if (nextAppState === 'active') {
  //       // Cek deep link saat aplikasi aktif kembali
  //       Linking.getInitialURL().then((url) => {
  //         if (url) {
  //           handleDeepLink(url);
  //         }
  //       });
  //     }
  //   };

  //   // Tambahkan listener untuk deep link
  //   const subscription = Linking.addEventListener('url', ({ url }) =>
  //     handleDeepLink(url)
  //   );

  //   // Tambahkan listener untuk perubahan state aplikasi
  //   AppState.addEventListener('change', handleAppStateChange);

  //   // Bersihkan listener saat komponen unmount
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const getReq =getRequests().map((item:any)=>item)
  useEffect(()=>{
    console.log("check ",getReq)

  },[getReq])

 


  const HandleDeepLinking =  () => {
    // const { navigate } = useNavigation();
    const {AuthLogin} = AuthUseCase();
    const handleDynamicLinks = async (link: any) => {

      const queryString = link.url.split('?')[1];
      const params: any = {};
      queryString.split('&').forEach((param: any) => {
        const [key, value] = param.split('=');
        params[key] = value;
      });
      const page: string | undefined = params.page;
      // const reff: string | undefined = params.reff;      
      if (link.url !== '') {
        if(page=== "konfirmasi"){
          const email: string | undefined = params.email;
          const password: string | undefined = params.password;
          axios.post(`${BaseUrl.baseProd}/member/konfirmasi-open`,{
            email : email,
            password : password,
          },configHeaderPrimary).then((result:any)=>{
            console.log("success");
          }).catch((err:any)=>console.log(err));
          navigate(ScreenActionType.LOGIN_SCREEN)
          const body:RequestLoginEntities={
            username : email?.replace("+","")??"",
            password : password??"",
            token_name: "userhostpot",
            pop_id:     null,
          }
          console.log("check body ", body);
          AuthLogin(body)
          
        }else if(page == "resetpassword"){
          const email: string | undefined = params.email.replace("+","");
          const token: string | undefined = params.token;
          const getToken = async ()=>{
            await AsyncStorage.setItem("reset_token", token??"")
            await AsyncStorage.setItem("reset_email", email??"")
          }
          getToken();
          navigate(ScreenActionType.GANTI_PASSWORD);
        }
        // navigate('DetailResellerScreen', { product_id: productId, reff: reff });
      }
    };
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
      return () => unsubscribe();
    }, []);

    return null;
  };



  useEffect(()=>{
    initializeAppodeal();
    
   },[]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        <NavigationContainer  ref={navigationRef}>
          <HandleDeepLinking/>
          <Routers/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}