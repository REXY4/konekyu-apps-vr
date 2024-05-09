import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import Colors from "../colors/Colors"
import FontStyle from "../../types/FontTypes"

interface  Props {
    label : string,
    onPress():void,
    textColor : string | undefined,
    disable : boolean,
    size:number
    style: any
}

const ButtonLink = ({style,label,size,onPress,textColor,disable}:Props) =>{
    return (
        <TouchableOpacity 
        disabled={disable}
        style={{
            ...style,
            height : 50,
            borderRadius : 10,
            flexDirection : "row",
            alignItems : "center",
            justifyContent : "center"
        }} 
        onPress={onPress}>
            <Text style={{
                color : textColor ?textColor : Colors.ResColor.blue,
                fontFamily : FontStyle.MEDIUM,
                letterSpacing  :1,
                fontSize : size,
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonLink;