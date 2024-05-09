import { View, Dimensions, Text } from "react-native";
import VoucherNot from "./VoucherNot";
const {height} = Dimensions.get("screen")

const VoucherAktif = () =>{
    return(
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNot/> 
        </View>
    )
}

export default VoucherAktif;