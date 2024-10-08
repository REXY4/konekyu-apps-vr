import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native"
import LocationUseCase from "../../use-case/location.usecase";
import { GetLocationEntities, GetMemberLocation } from "../../entities/location.entities";
import CardListMap from "./components/CardListMap";
import { useEffect, useState } from "react";
import GetLocation from "react-native-get-location";
import { useDispatch } from "react-redux";
import LocationActionType from "../../state/actions-type/location.type";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import { Path, Svg } from "react-native-svg";
import Colors from "../../components/colors/Colors";
import FontStyle from "../../types/FontTypes";
import InputPrimary from "../../components/inputs/InputPrimary";

const OpenMapIcon = ({size, color}:{size:number, color:string}) =>{
    return (
        <Svg  width={size} height={size} viewBox="0 0 48 48">
            <Path fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" d="M17.81 5.5L6.25 9.45a1 1 0 0 0-.74 1v31a1 1 0 0 0 1 1h.33l11-4.26l12.3 4.31l11.56-4a1 1 0 0 0 .74-1v-31a1 1 0 0 0-1-1l-.33.07l-11 4.19Zm12.31 4.31V42.5m-12.27-4.31V5.6"/>
        </Svg>
    )
}

const ListLocationScreen = ()=>{
    const {locationData} = LocationUseCase();
    const [myLocation, setMyLocation] = useState<any|null>(null)
    const [searchVal, setSearchVal] = useState<string>("");
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
     
     const handleDetailData = (item:GetMemberLocation) =>{
        dispatch({
            type : LocationActionType.GET_DETAIL_LOCATION,
            payload : item,
          })
        navigate(ScreenActionType.DETAIL_LIST_LOCATION);  
        //   navigate(ScreenActionType.DETAIL_LOCATION_DIRECTION)
     }
     
  
    useEffect(()=>{
         handleGetLocation()
    },[myLocation]);
  
    return (
        <SafeAreaView>
            <View style={{
                right : 0,
                elevation : 3,
                backgroundColor  :Colors.ResColor.blue,
                padding : 15,          
            }}>
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.OPEN_MAP_LOCATION)}
                style={{
                    backgroundColor :"#0365BE",
                    flexDirection  :"row",
                    padding : 10,
                    alignItems :"center",
                    borderBottomLeftRadius : 10,
                    borderRadius : 5,
                    justifyContent : "space-between",
                }}>
                    <View style={{
                        flexDirection  :"row",
                    }}>
                    <OpenMapIcon size={24} color={Colors.ResColor.white}/>
                    <Text style={{
                        fontSize : 18,
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.MEDIUM,
                        paddingLeft : 10,
                    }}>Buka Peta </Text>
                    </View>
                    <Text style={{
                         fontSize : 21,
                         color : Colors.ResColor.white,
                         fontFamily : FontStyle.MEDIUM,
                         position : "relative",
                         top : 3,
                    }}>{">"}</Text>
                </TouchableOpacity>
                <View style={{
                    marginTop :20,
                }}>
                    <InputPrimary searchIcon={true} label={undefined}
                    textContentType="none"
                     type={"visible-password"} passwordIcon={false} onChange={(val:string)=>setSearchVal(val)} placeholder={"Cari Lokasi"} value={searchVal} paste={false} onPresPaste={undefined} />
                </View>
            </View>
            <ScrollView>
                <View style={{
                    padding : 15,
                    backgroundColor  :Colors.ResColor.white,
                }}>
                    {locationData && myLocation && locationData.filter((fil:GetMemberLocation)=>fil.name.toLowerCase().includes(searchVal.toLowerCase()) 
                    ||fil.address.toLowerCase().includes(searchVal.toLowerCase()) ).map((item:GetMemberLocation)=>{
                        return (
                            <TouchableOpacity 
                            onPress={()=>handleDetailData(item)} style={{
                                marginBottom : 10,
                            }}>
                                <CardListMap props={item} lokasiSementara={myLocation}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListLocationScreen;