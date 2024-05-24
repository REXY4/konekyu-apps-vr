import { View, Text, TouchableOpacity } from "react-native"
import Colors from "../../../components/colors/Colors";
import FontStyle from "../../../types/FontTypes";
import { navigate } from "../../../routers/NavRef";
import ScreenActionType from "../../../routers/types/ScreenActionType";

const VoucherDash = () =>{
    return (
        <View style={{
            backgroundColor  :Colors.ResColor.white,
            borderWidth : 0.5,
            padding : 15,
            borderRadius : 10,
            height : 70,
            flexDirection :"row",
            alignItems : "center"
        }}>
            <View style={{
                backgroundColor :Colors.ResColor.white,
                borderRadius : 100,
                width : 40,
                height :40,
                position : "absolute",
                left : -20,
                borderRightWidth : 1,
            }}/>
            <View style={{
                backgroundColor  :Colors.ResColor.white,
                borderRadius : 100,
                width : 40,
                height :40,
                position : "absolute",
                right : -20,
                borderLeftWidth : 1,
            }}/>
            <View style={{
                paddingLeft : 20,
                paddingRight : 20,
                flexDirection : "row",
                alignItems : "center",
                justifyContent : "space-between",
                width : "100%",
            }}>
                <Text style={{
                    fontSize : 12,
                    color : Colors.ResColor.black,
                    fontFamily : FontStyle.REGULER,
                }}>
                    Belum punya voucher ?
                </Text>
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.LIST_VOUCHER)}
                style={{
                    backgroundColor : Colors.ResColor.blue,
                    borderRadius : 10,
                    padding : 10,
                    flexDirection  :"row",
                    alignItems : "center",
                    justifyContent : "center"
                }}>
                    <Text style={{
                        fontSize : 12,
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.BOLD,
                    }}>Beli Voucher</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VoucherDash;