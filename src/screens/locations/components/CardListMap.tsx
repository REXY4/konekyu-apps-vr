import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native"
import { GetLocationEntities, GetMemberLocation } from "../../../entities/location.entities";
import Colors from "../../../components/colors/Colors";
import FontStyle from "../../../types/FontTypes";
import { calculateDistance } from '../../../utils/haverSine';

const {width} =  Dimensions.get("screen");

const CardListMap = (props:GetMemberLocation) =>{
    const lokasiSementara = {
        latitude :-6.314508510022441,
        longitude : 107.30258366595463,
      }
      const getRange = () =>{
            const jarak = Math.floor(calculateDistance(lokasiSementara.latitude, lokasiSementara.longitude, parseFloat(props.latitude), parseFloat(props.longitude) * 1000)) 
            if(jarak > 1000){
                return Math.floor(jarak / 1000) + " km"
            }else{
                return jarak + " m"
            }
      }
    return(
        <View style={{
            backgroundColor : Colors.ResColor.white,
            padding : 15,
            elevation  :3,
            flexDirection  :"row",
        }}> 
            <View style={{
                width : 150,
                height : 150,
                borderRadius : 10,
            }}>
            <Image
            resizeMode="contain"
             source={{uri: props.pictures[0].url}} style={{
                width : "100%",
                height : "100%",
                objectFit : "fill",
                borderRadius : 10,
            }}/>
            </View>
            <View style={{
                marginLeft : 10,
                flexDirection  :"row",
                flexWrap : "wrap",
                width : "38%",
            }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.black,
                    fontSize : 14,
                }}>{props.name} <Text style={{color : Colors.ResColor.yellow}}>({getRange()})</Text></Text>
                <Text style={{
                    fontSize  :12,
                    color : Colors.ResColor.gray,
                    fontFamily : FontStyle.REGULER,
                }}>{props.address}</Text>
            </View>
        </View>
    )
}

export default CardListMap;