import { View, Dimensions } from "react-native";
import VoucherNot from "./VoucherNot";
const {height} = Dimensions.get("screen")

const VoucherKu = () =>{
    return(
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNot/>
        </View>
    ) 
}

export default VoucherKu;