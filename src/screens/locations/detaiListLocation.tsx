import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, View, Dimensions, Image ,  ScrollView, TouchableOpacity, Linking} from "react-native";
const MapDetailLocation = lazy(() => import('./components/MapDetailLocation'));
import FontStyle from "../../types/FontTypes";
import Colors from "../../components/colors/Colors";
import LocationUseCase from "../../use-case/location.usecase";
import { GetMemberLocation, GetRekomendLocationEn, PictureLoc } from '../../entities/location.entities';
import { calculateDistance } from "../../utils/haverSine";
import ButtonLink from "../../components/buttons/ButtonLink";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import MapLoader from "../../components/loading/MapLoader";import GetLocation from "react-native-get-location";
import { useDispatch } from "react-redux";
import LocationActionType from "../../state/actions-type/location.type";
import { BaseUrl } from "../../../config/api";
;
const {height} =  Dimensions.get("screen");


const DetailListLocation = () =>{
  const {locationData, detailLocation} = LocationUseCase();
  const [locationRekomendasi, setLocationRekomendasi] = useState<GetRekomendLocationEn | null>(null)
  const [myLocation, setMyLocation] = useState<any|null>(null)
  const dispatch = useDispatch();


  const getLocRekomend = async () =>{
    if(detailLocation){
      setLocationRekomendasi({
        location : detailLocation,
        distance : calculateDistance(myLocation.latitude, myLocation.longitude, parseFloat(detailLocation.latitude), parseFloat(detailLocation.longitude)),
      })
    }
  }

  const handleOpenLink = (lat:number, long:number) =>{
     const linkGo = `https://www.google.com/maps?q=${lat},${long}`
    Linking.openURL(linkGo);
  }

  const handleGetLocation =async ()=>{
      await  GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 6000,
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
    const interval = setInterval(async () =>{
      await handleGetLocation()
      await getLocRekomend()
    },2000);
    return ()=>clearInterval(interval);
  },[myLocation]);

    
    return(
        <SafeAreaView style={{
          height : "100%",
          backgroundColor  :Colors.ResColor.white,
        }}> 
        <ScrollView>
            <View style={{
              height : height / 2.3,
              elevation : 3,
              backgroundColor  :"black"
            }}>
              <Suspense fallback={
                             <MapLoader/>
              }>
                {detailLocation &&
              <MapDetailLocation 
              myLocation={
                {
                    latitude : parseFloat(detailLocation?.latitude),
                    longitude : parseFloat(detailLocation?.longitude)
                }
              }/>
                }
              </Suspense>
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
                width : 200,
              }}>{locationRekomendasi?.location.name}</Text>
              <ButtonLink onPress={() => navigate(ScreenActionType.LIST_LOCATION)} label="Selengkapnya >" textColor={Colors.ResColor.blue} disable={false} size={14} style={undefined}/>
            </View>
            {locationRekomendasi !== null ?
            <View style={{
              padding : 15,
            }}>
                <Text  style={{
                fontFamily : FontStyle.MEDIUM,
                color : Colors.ResColor.gray,
                fontSize : 14,
              }} >Jarak  : <Text style={{
                color : Colors.ResColor.yellow
              }}>({Math.floor(locationRekomendasi.distance * 1000) < 1000 ? Math.floor(locationRekomendasi.distance * 1000) + " Meter" : Math.floor(locationRekomendasi.distance * 1000) / 1000 + " Km"  })</Text></Text>
              <Text  style={{
                fontFamily : FontStyle.REGULER,
                color : Colors.ResColor.gray,
                fontSize : 14,
              }} >{locationRekomendasi.location.address}</Text>
              <ScrollView 
              horizontal
              style={{
                marginTop : 10,
              }}>
                <ScrollView 
                horizontal={true}
                style={{
                  height : 160,
                  marginBottom : 10,
                  flexDirection  :"row",
                }}>
              {locationRekomendasi?.location.pictures.map((item:PictureLoc)=>{
                return(
                  <>
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
                    source={{uri : `${BaseUrl.baseUrl}${item.url}`}} style={{
                      width : "100%",
                      height : "100%",
                      objectFit : "fill",
                      borderRadius : 10,
                    }}/>
                  </View>
                  </>
                )
              })}
              </ScrollView>
              </ScrollView>
             
            </View>
            :null}
                </View>
            </ScrollView>
            {locationRekomendasi !== null &&
            <View style={{
              flexDirection : "row",
              justifyContent : "center",
              marginTop : 50,
              position : "absolute",
              width : "100%",
              backgroundColor  :"white",
              alignItems  :"center",
              elevation : 3,
              padding : 15,
              bottom : 0,
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
        </SafeAreaView>
    )
}

  
export default DetailListLocation;