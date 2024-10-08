import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from './TabMaterial';
import AuthUseCase from '../use-case/auth.usecase';
import LoginScreen from '../screens/auth/login';
import ScreenActionType from './types/ScreenActionType';
import { useEffect } from 'react';
import OnboardingOne from '../screens/onboarding/onboarding1';
import Colors from '../components/colors/Colors';
import ListLocationScreen from '../screens/locations/ListLocationScreen';
import DetailLocation from '../screens/locations/detailLocation';
import LocationUseCase from '../use-case/location.usecase';
import DetailListLocation from '../screens/locations/detaiListLocation';
import OpenMapLocation from '../screens/locations/OpenMapScreen';
import ArtikleScreen from '../screens/artikle';
import ListVoucher from '../screens/voucher/listVoucher';
import XenditVoucher from '../screens/voucher/VoucherXendit';
import SearchWifiScreen from '../screens/wifi/searchWifi';
import SettingUseCase from '../use-case/setting.useCase';
import LoadingPage from '../screens/onboarding/LoadingPage';
import ChangePassword from '../screens/profiles/changePassword';
import EditProfile from '../screens/profiles/editProfile';
import ResetPassword from '../screens/auth/login/resetPassword';
import GantiPassword from '../screens/auth/login/GantiPassword';

const Stack = createStackNavigator();

export default function MyStack() {
  const {isLogin} = AuthUseCase()
  const {detailLocation} = LocationUseCase()
  const {splashScreen} = SettingUseCase();
 
  return (
    <Stack.Navigator>
      {!isLogin ?
      (
        <>
        {!splashScreen &&
         <Stack.Screen 
          options={{
          headerShown :false,
          cardStyle : {
            backgroundColor  : Colors.ResColor.white
          }
        }}
        name={ScreenActionType.ONBOARDING1}
        component={OnboardingOne} /> }    
        
        <Stack.Screen 
          options={{
          headerShown :false,
        }}
        name={ScreenActionType.LOGIN_SCREEN}
        component={LoginScreen} />  
         <Stack.Screen 
          options={{
          headerShown :false,
        }}
        name={ScreenActionType.RESET_PASSWORD}
        component={ResetPassword} />  
         <Stack.Screen 
          options={{
          headerShown :false,
        }}
        name={ScreenActionType.GANTI_PASSWORD}
        component={GantiPassword} />  
        <Stack.Screen 
      options={{
        headerShown  :false,
      }}
      name={ScreenActionType.HOME}
       component={MyTabs} />
       <Stack.Screen 
       options={{
         headerShown  :true,
         title :  "List Koneksi",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.Masukkan}
        component={SearchWifiScreen} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title :  "Artikel",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.ARTIKLE_SCREEN}
        component={ArtikleScreen} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title : detailLocation !== null ? detailLocation.name : "Map Lokasi",
         cardStyle : {
          backgroundColor : Colors.ResColor.lightBlue,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.DETAIL_LIST_LOCATION}
        component={DetailListLocation} />
         
        </>
      )
      :
      <>
      <Stack.Screen 
      options={{
        headerShown  :false,
      }}
      name={ScreenActionType.HOME}
       component={MyTabs} />

       <Stack.Screen 
       options={{
         headerShown  :true,
         title : "Lokasi Hotspot",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.LIST_LOCATION}
        component={ListLocationScreen} />
      
      <Stack.Screen 
       options={{
         headerShown  :true,
         title : detailLocation !== null ? detailLocation.name : "Map Lokasi",
         cardStyle : {
          backgroundColor : Colors.ResColor.lightBlue,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.DETAIL_LOCATION_DIRECTION}
        component={DetailLocation} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title : detailLocation !== null ? detailLocation.name : "Map Lokasi",
         cardStyle : {
          backgroundColor : Colors.ResColor.lightBlue,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.DETAIL_LIST_LOCATION}
        component={DetailListLocation} />
        <Stack.Screen 
       options={{
         headerShown  :true,
         title :  "Peta Lokasi Hotspot",
         cardStyle : {
          backgroundColor : Colors.ResColor.lightBlue,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.OPEN_MAP_LOCATION}
        component={OpenMapLocation} />
      <Stack.Screen 
       options={{
         headerShown  :true,
         title :  "Artikel",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.ARTIKLE_SCREEN}
        component={ArtikleScreen} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title :  "List Voucher",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.LIST_VOUCHER}
        component={ListVoucher} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title :  "List Koneksi",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.Masukkan}
        component={SearchWifiScreen} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title :  "Pembayaran Voucher",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.BUY_VOUCHER}
        component={XenditVoucher} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title :  "Ubah Password",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.CHANGE_PASSWORD}
        component={ChangePassword} />

<Stack.Screen 
       options={{
         headerShown  :true,
         title :  "Ubah Profil",
         cardStyle : {
          backgroundColor : Colors.ResColor.white,
         },
         headerTitleStyle: {
          color : Colors.ResColor.white,
         },
         headerTintColor: Colors.ResColor.white,
         headerStyle: {
          backgroundColor  :Colors.ResColor.blue,
         }
       }}
       name={ScreenActionType.EDIT_PROFILE}
        component={EditProfile} />
        </>
    }
    </Stack.Navigator>
    
  );
}