import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native"
import { GetLocationEntities, GetMemberLocation } from "../../../entities/location.entities";
import Colors from "../../../components/colors/Colors";
import FontStyle from "../../../types/FontTypes";
import { calculateDistance } from '../../../utils/haverSine';
import { BaseUrl } from "../../../../config/api";

const {width} =  Dimensions.get("screen");
interface Props{ 
    props :GetMemberLocation,
    lokasiSementara : any
}
const CardListMap = ({props,lokasiSementara}:Props) =>{
   
      const getRange = () =>{
            const jarak = calculateDistance(lokasiSementara.latitude, lokasiSementara.longitude, parseFloat(props.latitude), parseFloat(props.longitude)) * 1000 
            if(jarak > 1000){
                return Math.floor(jarak / 1000) + " km"
            }else{
                return  Math.floor(jarak) + " m"
            }
      }
    return(
        <View style={{
            backgroundColor : Colors.ResColor.white,
            padding : 10,
            elevation  :3,
            flexDirection  :"row",
            borderRadius : 10,
        }}> 
            <View style={{
                width : 80,
                height : 80,
                borderRadius : 10,
                elevation : 3,
                backgroundColor : "white",
            }}>
            <Image
            resizeMode="contain"
             source={{uri: `${BaseUrl.baseUrl}${props.pictures[0].url}`}} style={{
                width : "100%",
                height : "100%",
                objectFit : "fill",
                borderRadius : 10,
            }}/>
            </View>
            <View style={{
                marginLeft : 10,
                // flexDirection  :"row",
                flexWrap : "wrap",
            }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.black,
                    fontSize : 14,
                    width : "100%",
                    paddingLeft :10,
                }}>{props.name} <Text style={{color : Colors.ResColor.yellow}}>({getRange()})</Text></Text>
                     <Text style={{
                    fontSize  :12,
                    paddingLeft : 10,
                    color : Colors.ResColor.gray,
                    fontFamily : FontStyle.REGULER,
                }}>{props.address}</Text>
            </View>

        </View>
    )
}

export default CardListMap;