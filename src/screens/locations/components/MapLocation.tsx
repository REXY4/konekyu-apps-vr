import { Dimensions, View, StyleSheet, Image, Linking, TouchableOpacity } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import GetLocation from 'react-native-get-location'
import React ,{  useMemo, useState } from "react";
import {  GetMemberLocation, MyLocationEntities } from "../../../entities/location.entities";
import LocationUseCase from "../../../use-case/location.usecase";
import IconLocation from "./IconLocation";
import { useDispatch } from "react-redux";
import LocationActionType from "../../../state/actions-type/location.type";
import ScreenActionType from "../../../routers/types/ScreenActionType";
import { navigate } from "../../../routers/NavRef";
const {width} = Dimensions.get("screen");

interface Props {
  myLocation : MyLocationEntities
}

const MapLocation = ({myLocation}:Props) =>{
  const {locationData} = LocationUseCase();

  
  const handleOpenLink = (lat:number, long:number) =>{
    const linkGo = `https://www.google.com/maps?q=${lat},${long}`
    Linking.openURL(linkGo);
 }
 const dispatch = useDispatch();
 
 const handleDetailData = (item:GetMemberLocation) =>{
  dispatch({
      type : LocationActionType.GET_DETAIL_LOCATION,
      payload : item,
    })
  navigate(ScreenActionType.DETAIL_LIST_LOCATION);  
  //   navigate(ScreenActionType.DETAIL_LOCATION_DIRECTION)
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
                latitude : myLocation.latitude,
                longitude : myLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >  
            <Marker coordinate={{
              // longitude : myLocation.longitude,
              // latitude : myLocation.latitude,
              longitude : myLocation.longitude,
              latitude : myLocation.latitude,
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
                  onPress={()=>handleDetailData(item)}
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
                    <TouchableOpacity style={{
                      position : "relative",
                      top : 25,
                      left : 12,
                    }}>
                    <IconLocation/>
                    </TouchableOpacity>
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
   

export default React.memo(MapLocation);