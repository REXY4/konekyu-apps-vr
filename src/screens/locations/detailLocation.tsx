import { Dimensions, SafeAreaView, View } from "react-native"
import MapDirection from "./components/MapDirection";
import { useEffect, useState } from "react";
import GetLocation from "react-native-get-location";
const {height} = Dimensions.get("screen")
const DetailLocation = () =>{
  const [myLocation, setMyLocation] = useState<any|null>(null)

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
      },2000);
      return ()=>clearInterval(interval);
    },[myLocation]);
  
    return(
        <SafeAreaView>
            <View style={{
                height : height
            }}>
                <MapDirection myLocation={myLocation}/>
            </View>
        </SafeAreaView>
    )
}

export default DetailLocation;