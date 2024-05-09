import { Image, Text, TouchableOpacity, View } from "react-native"
import { ArticleDash } from "../../../entities/dashboard.entities";
import Colors from "../../../components/colors/Colors";
import FontStyle from "../../../types/FontTypes";

const CardArtikle = (props:ArticleDash) =>{
    return (
        <View style={{
            elevation : 3,
            backgroundColor  :Colors.ResColor.white,
            width : "100%",
            borderRadius : 10,
        }}>
            <Image 
            resizeMode="contain"
            source={{uri : props.images[0].url}} style={{
                width : "100%",
                height : 150,
                objectFit : "fill",
                borderTopLeftRadius : 10,
                borderTopRightRadius : 10,
            }}/>
            <View style={{
                padding : 10,
            }}>
                <Text 
                style={{
                    fontSize : 12,
                    color : Colors.ResColor.black,
                    fontFamily :  FontStyle.BOLD
                }}
                >{props.title.substring(0, 35) }{props.title.length > 40 ? "..." : ""} </Text>
                 <Text 
                style={{
                    fontSize : 12,
                    color : Colors.ResColor.black,
                    fontFamily :  FontStyle.BOLD
                }}
                >{props.published_at}</Text>
                <TouchableOpacity style={{
                    borderColor: Colors.ResColor.blue,
                    borderWidth : 1,
                    flexDirection :"row",
                    justifyContent : "center",
                    borderRadius : 10,
                    marginTop  :5,
                    marginBottom : 5,
                }}>
                    <Text style={{
                         fontSize : 12,
                         color : Colors.ResColor.blue,
                         fontFamily :  FontStyle.MEDIUM
                    }}>{props.category.name}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CardArtikle;