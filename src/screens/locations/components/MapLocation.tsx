import { Dimensions, View, StyleSheet, Image } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import GetLocation from 'react-native-get-location'
import { useEffect, useState } from "react";
import { GetLocationEntities, GetMemberLocation } from "../../../entities/location.entities";
import LocationUseCase from "../../../use-case/location.usecase";
import IconLocation from "./IconLocation";
const {width} = Dimensions.get("screen");

const MapLocation = () =>{
  const [myLocation, setMyLocation] = useState<any|null>(null)
  const {locationData} = LocationUseCase();

  const getLocation = () =>{
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
      })
      .then(location => {
        setMyLocation(location);
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
      })
  }


  useEffect(()=>{
    getLocation()
  },[]);
  const lokasiSementara = {
    latitude :-6.314508510022441,
    longitude : 107.30258366595463,
  }

    return(
             <View style={styles.container}>
              {myLocation != null &&
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                // latitude: myLocation.latitude,
                // longitude: myLocation.longitude,
                latitude : lokasiSementara.latitude,
                longitude : lokasiSementara.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >  
            <Marker coordinate={{
              // longitude : myLocation.longitude,
              // latitude : myLocation.latitude,
              longitude : lokasiSementara.longitude,
              latitude : lokasiSementara.latitude,
            }} 
            >
                <Image
                source={require("../../../../assets/images/location.png")}
                style={{ width: 35, height: 35 }} // Set the width and height of the marker image
            />
            </Marker>

            {locationData !== null && 
              locationData.map((item:GetMemberLocation)=>{
                return(
                  <Marker 
                  style={{
                    height : 50,
                    width : 50,
                  }}
                  coordinate={{
                    // longitude : myLocation.longitude,
                    // latitude : myLocation.latitude,
                    longitude : parseFloat(item.longitude),
                    latitude : parseFloat(item.latitude),
                  }} 
                  >
                    <View style={{
                      position : "relative",
                      top : 25,
                      left : 12,
                    }}>
                    <IconLocation/>
                    </View>
                  </Marker>
                )
              })
            } 
            </MapView>
            }
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
   

export default MapLocation;