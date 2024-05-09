import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import Colors from "../colors/Colors"
import FontStyle from "../../types/FontTypes"

interface  Props {
    label : string,
    onPress():void,
    textColor : string | undefined,
    background : string | undefined,
    disable : boolean,
}

const ButtonContainer = ({label,onPress,textColor, background, disable}:Props) =>{
    return (
        <TouchableOpacity 
        disabled={disable}
        style={{
            backgroundColor : background ? background : Colors.ResColor.gray,
            height : 50,
            borderRadius : 10,
            flexDirection : "row",
            alignItems : "center",
            justifyContent : "center"
        }} 
        onPress={onPress}>
            <Text style={{
                color : textColor ?textColor : Colors.ResColor.white,
                fontFamily : FontStyle.BOLD,
                letterSpacing  :1,
                fontSize : 16,
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonContainer;