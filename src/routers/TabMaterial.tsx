import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  TabBarIconHome, TabBarIconProfile, TabBarIconVoucher, TabBarLocation, TabBarWifi } from '../components/icons/TabBarIcon';
import WifiScreen from '../screens/wifi';
import { TouchableOpacity, View } from 'react-native';
import ScreenActionType from './types/ScreenActionType';
import { Profiler, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AuthActionType from '../state/actions-type/auth.type';
import VoucherScreen from '../screens/voucher';
import Profiles from '../screens/profiles';
import LocationScreen from '../screens/locations';

const Tab = createMaterialBottomTabNavigator();
//"#0074E0"
export default function MyTabs() {


  return (
    <Tab.Navigator
    shifting={false}
    inactiveColor='#A8A8A8'
    activeColor="#0074E0"
    sceneAnimationType='shifting'
    sceneAnimationEnabled
    activeIndicatorStyle={{
        borderRadius : 10,
        backfaceVisibility : "hidden",
        backgroundColor : "#0074E0",
        height : 40,
    }}
    backBehavior='initialRoute'
    compact
    barStyle={{ backgroundColor: '#FFFFFF' }}
    >
      <Tab.Screen
      name={ScreenActionType.HOME} 
      component={HomeScreen} 
      options={{
        tabBarLabel: 'Beranda',
        tabBarIcon: ({ color }) => {
         
         
         return <TabBarIconHome color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        },
      }}
      />
      <Tab.Screen name={ScreenActionType.WIFI} component={WifiScreen} 
       options={{
        tabBarLabel: 'Internet',
        tabBarIcon: ({ color }) => {
         return <TabBarWifi color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        },
      }}
      />
      <Tab.Screen
      name={ScreenActionType.LOCATION} component={LocationScreen}  
       options={{
        tabBarLabel: 'Lokasi',
        tabBarIcon: ({ color }) => {
         return <TabBarLocation color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        },
      }}/>
     
      <Tab.Screen name={ScreenActionType.VOUCHER}
      options={{
        tabBarLabel: 'Voucher',
        tabBarIcon: ({ color }) => {
         return (
            <View style={{
                transform: [{ rotate: '140deg' }]
            }}>
         <TabBarIconVoucher color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
         </View>)
        },
      }}
      component={VoucherScreen} />

<Tab.Screen name={ScreenActionType.PROFILES}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => {
         return (   
         <TabBarIconProfile color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        )
        },
      }}
      component={Profiles} />
    </Tab.Navigator>
  );
}


