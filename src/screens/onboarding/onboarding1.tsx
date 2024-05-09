import {  SafeAreaView,  StyleSheet, View,  PermissionsAndroid} from 'react-native';
import LoadingKonekyu from './LoadingKonekyu';
import { Text } from 'react-native-paper';
import FontStyle from '../../types/FontTypes';
import Colors from '../../components/colors/Colors';
import { useEffect } from 'react';
import { navigate } from '../../routers/NavRef';
import ScreenActionType from '../../routers/types/ScreenActionType';

const OnboardingOne = () =>{
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
        navigate(ScreenActionType.LOGIN_SCREEN);
      }, 3000);
    } catch (err) {
      console.warn(err);
    }
  };
  
      useEffect(()=>{
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
                backgroundColor  :Colors.ResColor.blue,
                borderRadius : 20,
                width : "80%",
                alignItems :"center",
                elevation : 3,
             }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.white,
                    fontSize : 21,
                }}>Better Internet Better Life</Text>
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