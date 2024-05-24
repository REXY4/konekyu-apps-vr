import { Text, View } from "react-native"
import { VoucherNotAvailIcon } from "../../../components/icons/Icon";
import Colors from "../../../components/colors/Colors";
import FontStyle from "../../../types/FontTypes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigate } from "../../../routers/NavRef";
import ScreenActionType from "../../../routers/types/ScreenActionType";

const VoucherNot = () =>{
    return(
        <View> 
            <View style={{
                flexDirection :"row",
                justifyContent : "center",
            }}>
                <View>
                <View style={{
                    flexDirection : "row",
                    justifyContent : "center",
                }}>    
                <VoucherNotAvailIcon color="" size={0}/>
                </View>
                <Text style={{
                    textAlign : "center",
                    fontSize : 18,
                    color : Colors.ResColor.black,
                    width : 200,
                    fontFamily : FontStyle.MEDIUM,
                }}>Kamu belum punya voucher ?</Text>
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.LIST_VOUCHER)}
                style={{
                    backgroundColor  :Colors.ResColor.blue,
                    height : 40,
                    borderRadius : 10,
                    alignItems  :"center",
                    justifyContent : "center",
                }}>
                    <Text style={{
                        fontSize : 12,
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.BOLD,
                    }}>Beli Voucher Sekarang</Text>
                </TouchableOpacity>
                </View>
              
            </View>
        </View>
    )
}

export default VoucherNot;