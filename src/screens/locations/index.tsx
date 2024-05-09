import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Dimensions, Image ,  ScrollView, TouchableOpacity, Linking} from "react-native";
import MapLocation from "./components/MapLocation";
import FontStyle from "../../types/FontTypes";
import Colors from "../../components/colors/Colors";
import LocationUseCase from "../../use-case/location.usecase";
import { GetMemberLocation, GetRekomendLocationEn, PictureLoc } from '../../entities/location.entities';
import { calculateDistance } from "../../utils/haverSine";
import ButtonLink from "../../components/buttons/ButtonLink";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
const {height} =  Dimensions.get("screen");


const LocationScreen = () =>{
  const {locationData} = LocationUseCase();
  const [locationRekomendasi, setLocationRekomendasi] = useState<GetRekomendLocationEn | null>(null)

  const lokasiSementara = {
    latitude :-6.314508510022441,
    longitude : 107.30258366595463,
  }

  const getLocRekomend = () =>{
    if(locationData){
      const distances = locationData.map((location:GetMemberLocation) => ({
        location,
        distance: calculateDistance(lokasiSementara.latitude, lokasiSementara.longitude, parseFloat(location.latitude), parseFloat(location.longitude)),
    }));
    distances.sort((a, b) => a.distance - b.distance);
// Get the closest location (the first one after sorting)
      const closestLocation = distances[0].location;
      const closestDistance = distances[0].distance;
      setLocationRekomendasi({
        location : closestLocation,
        distance : closestDistance,
      })
    }
  }

  const handleOpenLink = (lat:number, long:number) =>{
    const linkGo = `https://www.google.com/maps/place/6%C2%B018'51.7%22S+107%C2%B018'09.2%22E/@${lat},${long},17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.3143485!4d107.3025408?entry=ttu`
    Linking.openURL(linkGo);
  }

  useEffect(()=>{   
    getLocRekomend()
  },[]);
    
    return(
        <SafeAreaView style={{
          height : "100%"
        }}> 
        <ScrollView>
            <View style={{
              height : height / 2.3,
              elevation : 3,
            }}>
              {/* <MapLocation/> */}
            </View>
              <View style={{
                marginBottom : 100,
              }}>
            <View style={{
              marginTop : 10,
              padding : 15,
              paddingBottom : 0,
              flexDirection : "row",
              justifyContent : "space-between",
              alignItems  :"center",
            }}>
              <Text style={{
                fontFamily : FontStyle.BOLD,
                color : Colors.ResColor.black,
                fontSize : 18,
              }}>hotspot Terdekat</Text>
              <ButtonLink onPress={()=>navigate(ScreenActionType.LIST_LOCATION)} label="Selengkapnya >"/>
            </View>
            {locationRekomendasi !== null ?
            <View style={{
              padding : 15,
            }}>
                <Text  style={{
                fontFamily : FontStyle.MEDIUM,
                color : Colors.ResColor.black,
                fontSize : 14,
              }} >{locationRekomendasi.location.name} <Text style={{
                color : Colors.ResColor.yellow
              }}>({Math.floor(locationRekomendasi.distance * 1000)} meter)</Text></Text>
              <Text  style={{
                fontFamily : FontStyle.REGULER,
                color : Colors.ResColor.gray,
                fontSize : 14,
              }} >{locationRekomendasi.location.address}</Text>
              <ScrollView 
              horizontal
              style={{
                marginTop : 10,
                // flexDirection : "row",
              }}>
              {locationRekomendasi?.location.pictures.map((item:PictureLoc)=>{
                return(
                  <View
                  key={item.id}
                  style={{
                    marginRight : 10,
                    borderRadius : 10,
                    width : 200,
                    height : 150,
                    elevation : 3,
                    backgroundColor  :Colors.ResColor.white
                  }}>
                    <Image
                    resizeMode="contain"
                    source={{uri : item.url}} style={{
                      width : "100%",
                      height : "100%",
                      objectFit : "fill",
                      borderRadius : 10,
                    }}/>
                  </View>
                )
              })}
              </ScrollView>
              {locationRekomendasi !== null &&
            <View style={{
              flexDirection : "row",
              justifyContent : "center",
              marginTop : 50,
            }}>
            <TouchableOpacity 
            onPress={()=>handleOpenLink(parseFloat(locationRekomendasi.location.latitude),parseFloat(locationRekomendasi.location.longitude))}
            style={{
                backgroundColor : Colors.ResColor.blue,
                height : 50,
                width : "100%",
                flexDirection  :"row",
                alignItems : "center",
                justifyContent : "center",
                borderRadius : 10,
                elevation : 3,
              }}>
                <Text style={{
                  fontFamily : FontStyle.BOLD,
                  fontSize : 18,
                  color : Colors.ResColor.white,
                }}>Buka Google Maps</Text>
              </TouchableOpacity>
              </View>}
            </View>
            :null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

  
export default LocationScreen;