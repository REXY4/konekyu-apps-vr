import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, View, Dimensions, Image ,  ScrollView, TouchableOpacity, Linking} from "react-native";
const MapSecond = lazy(() => import('./components/mapLocationSecond'));
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
import axios from "axios";
import { BaseUrl, configWithOpenGuest } from "../../../config/api";
import CardMapNews from "./components/CardMapNew";
import AuthUseCase from "../../use-case/auth.usecase";
const {height} =  Dimensions.get("screen");


const LocationScreen = () =>{
  const {isLogin} = AuthUseCase();
  const {locationData} = LocationUseCase();
  const [locationRekomendasi, setLocationRekomendasi] = useState<Array<GetMemberLocation> | null>(null)
  const [myLocation, setMyLocation] = useState<any|null>(null)
  const dispatch = useDispatch();
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

   const handleGetDistanceLocation = async () =>{
     try {
      const response = await axios.get(`${BaseUrl.baseProd}/member/pop-news/range/${myLocation.latitude}/${myLocation.longitude}`, configWithOpenGuest);
      console.log("check url ", `${BaseUrl.baseProd}/member/pop-news/range/${myLocation.latitude}/${myLocation.longitude}`)
      console.log("success", response.status);      
      if(response.status == 200){
        setLocationRekomendasi(response.data.clients);
      }
     } catch (error) {
      console.log("get distance ",error);
     }
   }

  useEffect(()=>{
    const interval = setInterval(async () =>{
      await handleGetLocation()
      await handleGetDistanceLocation()
    },10000);
    return ()=>clearInterval(interval);
  },[myLocation]);

  useEffect(()=>{
    handleGetDistanceLocation();
  },[]);


  const handleDetailData = (item:GetMemberLocation) =>{
    dispatch({
        type : LocationActionType.GET_DETAIL_LOCATION,
        payload : item,
      })
    navigate(ScreenActionType.DETAIL_LIST_LOCATION);  
    //   navigate(ScreenActionType.DETAIL_LOCATION_DIRECTION)
 }
 
    
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
                {locationRekomendasi && 
              <MapSecond myLocation={{
                latitude : parseFloat(myLocation.latitude),
                longitude : parseFloat(myLocation.longitude),
              }} locationData={locationRekomendasi}/>}
              </Suspense>
            </View>
              <View style={{
                marginBottom : 100,
                backgroundColor : '#F2F9FF',
                marginTop : 20,
                height : "100%",
              }}>
            <View style={{
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
              <ButtonLink onPress={() => !isLogin ? navigate(ScreenActionType.LOGIN_SCREEN) : navigate(ScreenActionType.LIST_LOCATION)} label="Selengkapnya >" textColor={Colors.ResColor.blue} disable={false} size={14} style={undefined}/>
            </View >
              {locationRekomendasi !== null ? 
            (
              <View style={{
                paddingTop : 20,
              }}>
              {locationData?.map((item:GetMemberLocation)=>{
                return (
                  <TouchableOpacity
                  onPress={()=>{
                    handleDetailData(item)
                  }}
                  style={{
                    marginBottom : 15,
                    paddingLeft : 15,
                    paddingRight : 15,
                  }}>
                  <CardMapNews image={`${BaseUrl.baseUrl}${item.pictures[0].url}`} title={item.name}
                  desc={`${item.address.substring(0, 35)} ${item.address.length >= 35 ? "..." : "" } `}/>
                  </TouchableOpacity>
                )
              })}

              </View>
            ):null  
            }
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

  
export default LocationScreen;