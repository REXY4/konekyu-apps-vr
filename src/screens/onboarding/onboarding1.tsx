import {  SafeAreaView,  StyleSheet, View,  PermissionsAndroid} from 'react-native';
import LoadingKonekyu from './LoadingKonekyu';
import { Text } from 'react-native-paper';
import FontStyle from '../../types/FontTypes';
import Colors from '../../components/colors/Colors';
import { useEffect } from 'react';
import { navigate } from '../../routers/NavRef';
import ScreenActionType from '../../routers/types/ScreenActionType';
import { useDispatch } from 'react-redux';
import SettingActionType from '../../state/actions-type/setting.type';

const OnboardingOne = () =>{
  const dispatch = useDispatch();

  const requestLocationPermissions = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      // Mencoba meminta izin dengan pengulangan jika ditolak
      while (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
          {
            title: 'Mohon izinkan aksess wifi',
            message:
              'Untuk Menggunakan Koneksi Konekyu!',
            buttonPositive: 'OK',
          },
        );
      }
  
      // Izin telah diberikan
      setTimeout(() => {
        dispatch({
          type : SettingActionType.SET_SPLASH_SCREEN,
          payload : true
        })
        navigate(ScreenActionType.HOME);
      }, 5000);
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLocationPermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      // Mencoba meminta izin dengan pengulangan jika ditolak
      while (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Mohon izinkan akses lokasi',
            message:
              'Untuk Menggunakan Koneksi Konekyu!',
            buttonPositive: 'OK',
          },
        );
      }
  
      // Izin telah diberikan
      setTimeout(() => {
        dispatch({
          type : SettingActionType.SET_SPLASH_SCREEN,
          payload : true
        })
        navigate(ScreenActionType.HOME);
      }, 10000);
    } catch (err) {
      console.warn(err);
    }
  };

  
      useEffect(()=>{
        setTimeout(() => {
          dispatch({
            type : SettingActionType.SET_SPLASH_SCREEN,
            payload : true
          })
          navigate(ScreenActionType.HOME);
        }, 10000);
        requestLocationPermission();
      },[]);
    
    return (
           <SafeAreaView style={{
            height : "100%"
           }}>
             <LoadingKonekyu/>
             <View style={{
                flexDirection  :"row",
                justifyContent : "center"
             }}>
             <View style={{
                flexDirection : "row",
                justifyContent : "center",
                marginTop : 20,
                // backgroundColor  :Colors.ResColor.blue,
             }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.blue,
                    fontSize : 12,
                }}>#MenghubungkanNusantara</Text>
             </View>
             </View>
             <View style={{
                position : "absolute",
                bottom : 20,
                flexDirection : "row",
                justifyContent : "center",
                width : "100%"
             }}>
                <Text style={{
                    fontFamily : FontStyle.MEDIUM,
                    fontSize : 14,
                }}>Powered By BNET</Text>
             </View>
           </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    row : {
        width : 200,
        height: 200,
        borderRadius : 100,
        borderWidth : 30,
    }
})

export default OnboardingOne;