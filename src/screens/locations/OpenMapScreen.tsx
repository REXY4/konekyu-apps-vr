import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, View, Dimensions, Image ,  ScrollView, TouchableOpacity, Linking} from "react-native";
const MapLocation = lazy(() => import('./components/MapLocation'));
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
;
const {height} =  Dimensions.get("screen");


const OpenMapLocation = () =>{
  const {locationData} = LocationUseCase();
  const [locationRekomendasi, setLocationRekomendasi] = useState<GetRekomendLocationEn | null>(null)
  const [myLocation, setMyLocation] = useState<any|null>(null)
  const dispatch = useDispatch();


  const getLocRekomend = async () =>{
    if(locationData && myLocation){
      const distances = locationData.map((location:GetMemberLocation) => ({
        location,
        distance: calculateDistance(myLocation.latitude, myLocation.longitude, parseFloat(location.latitude), parseFloat(location.longitude)),
    }));
    distances.sort((a, b) => a.distance - b.distance);
      const closestLocation = distances[0].location;
      const closestDistance = distances[0].distance;
      setLocationRekomendasi({
        location : closestLocation,
        distance : closestDistance,
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
            <MapLocation myLocation={myLocation}/>    
        </SafeAreaView>
    )
}

  
export default OpenMapLocation;