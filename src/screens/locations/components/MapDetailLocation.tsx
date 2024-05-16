import { Dimensions, View, StyleSheet, Image } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import GetLocation from 'react-native-get-location'
import React ,{  useMemo, useState } from "react";
import {  GetMemberLocation, MyLocationEntities } from "../../../entities/location.entities";
import LocationUseCase from "../../../use-case/location.usecase";
import IconLocation from "./IconLocation";
const {width} = Dimensions.get("screen");

interface Props {
  myLocation : {
    latitude : number, 
    longitude : number
  }
}

const MapDetailLocation = ({myLocation}:Props) =>{
    return(
             <View style={styles.container}>
              {myLocation != null &&
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                // latitude: myLocation.latitude,
                // longitude: myLocation.longitude,
                latitude : myLocation.latitude,
                longitude : myLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >  
            <Marker 
                  style={{
                    height : 50,
                    width : 50,
                  }}
                  coordinate={{
                    // longitude : myLocation.longitude,
                    // latitude : myLocation.latitude,
                    longitude : myLocation.longitude,
                    latitude : myLocation.latitude,
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
   

export default React.memo(MapDetailLocation);