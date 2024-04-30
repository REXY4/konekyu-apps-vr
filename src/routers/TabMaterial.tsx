import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabBarGoTo, TabBarIconHome, TabBarIconProfile, TabBarIconVoucher, TabBarLocation, TabBarWifi } from '../components/icons/TabBarIcon';
import WifiScreen from '../screens/wifi';
import { View } from 'react-native';

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
      <Tab.Screen name="Beranda" 
      component={HomeScreen} 

      options={{
        tabBarLabel: 'Beranda',
        tabBarIcon: ({ color }) => {
            console.log("check color" , color)
         return <TabBarIconHome color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        },
      }}
      />
      <Tab.Screen name="Wifi" component={WifiScreen} 
       options={{
        tabBarLabel: 'Internet',
        tabBarIcon: ({ color }) => {
            console.log("check color" , color)
         return <TabBarWifi color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        },
      }}
      />
      <Tab.Screen name="Lokasi" component={HomeScreen}  
       options={{
        tabBarLabel: 'Lokasi',
        tabBarIcon: ({ color }) => {
            console.log("check color" , color)
         return <TabBarLocation color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        },
      }}/>
     
      <Tab.Screen name="Voucher" 
      options={{
        tabBarLabel: 'Voucherku',
        tabBarIcon: ({ color }) => {
            console.log("check color" , color)
         return (
            <View style={{
                transform: [{ rotate: '140deg' }]
            }}>
         <TabBarIconVoucher color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
         </View>)
        },
      }}
      component={HomeScreen} />

<Tab.Screen name="Profile" 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => {
            console.log("check color" , color)
         return (   
         <TabBarIconProfile color={color == "#0074E0" ? "#FFFFFF" : color} size={26} />
        )
        },
      }}
      component={HomeScreen} />
    </Tab.Navigator>
  );
}


