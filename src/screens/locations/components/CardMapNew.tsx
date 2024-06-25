import { Text, View } from "react-native"
import Colors from "../../../components/colors/Colors"
import FontStyle from "../../../types/FontTypes"
import { Image } from "react-native"
import { ArrowRightIcon } from "../../../components/icons/Icon"

interface Props {
    image :string
    title : string,
    desc : string
}

const CardMapNews = ({image, title, desc}:Props) =>{
    console.log(image);
    return (
        <View style={{
            elevation : 3,
            backgroundColor  :Colors.ResColor.white,
            padding : 10,
            borderRadius : 10,
            flexDirection  :"row",
            alignItems  :"center",
            justifyContent : "space-between"
        }}>
            <View style={{
                 flexDirection  :"row",
                 alignItems  :"center",
            }}>
            <View style={{
                width : 50,
                height : 50,
                backgroundColor  :"white",
                elevation : 3,
                borderRadius : 10,
                marginRight : 20,
            }}>
            <Image source={{uri : image}} 
            resizeMode="contain"
            style={{
                width : "100%",
                height :"100%",
                objectFit : "fill",
                borderRadius : 10,
            }} />
            </View>
            <View>
            <Text style={{
                fontFamily : FontStyle.BOLD,
                fontSize : 12,
                color : Colors.ResColor.black2
            }}>{title}</Text>
            <Text style={{
                fontFamily : FontStyle.REGULER,
                fontSize : 12,
                color : Colors.ResColor.black2
            }}>{desc}</Text>
            </View>
            </View>
            <View>
                <ArrowRightIcon  size={24} color={Colors.ResColor.gray}/>
            </View>
        </View> 
    )
}

export default CardMapNews;