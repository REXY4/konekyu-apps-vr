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

const Stack = createStackNavigator();

export default function MyStack() {
  const {isLogin} = AuthUseCase()
  const {detailLocation} = LocationUseCase();
 
  return (
    <Stack.Navigator>
      {!isLogin ?
      (
        <>
         <Stack.Screen 
          options={{
          headerShown :false,
          cardStyle : {
            backgroundColor  : Colors.ResColor.white
          }
        }}
        name={ScreenActionType.ONBOARDING1}
        component={OnboardingOne} />    
        <Stack.Screen 
          options={{
          headerShown :false,
        }}
        name={ScreenActionType.LOGIN_SCREEN}
        component={LoginScreen} />    
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
         title : "List Lokasi",
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
         title :  "Cari Hostpot Terdekat",
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
        </>
    }
    </Stack.Navigator>
  );
}