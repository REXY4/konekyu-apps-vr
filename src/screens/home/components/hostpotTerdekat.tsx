import { Text } from "react-native";
import { View } from "react-native"
import FontStyle from "../../../types/FontTypes";
import Colors from "../../../components/colors/Colors";
import ButtonLink from "../../../components/buttons/ButtonLink";
import { navigate } from "../../../routers/NavRef";
import ScreenActionType from "../../../routers/types/ScreenActionType";

const HostpotTerdekat = ()=>{
    return (
        <View style={{
            padding : 15,
            paddingBottom : 0,
        }}>
            <View style={{
                flexDirection : "row",
                alignItems  :"center",
                justifyContent  :"space-between"
            }}>
            <Text style={{
                fontSize : 14,
                fontFamily : FontStyle.BOLD,
                color : Colors.ResColor.black
            }}>Hostpot Terdekat</Text>
            <ButtonLink size={14}
            onPress={()=>navigate(ScreenActionType.LOCATION)}
            label="Selengkapnya>"/>
            </View>
                <Text style={{
                    width : 200,
                    fontSize : 12,
                    position : "relative",
                    bottom : 10,
                    fontFamily : FontStyle.REGULER,
                    color : Colors.ResColor.black
                }}>Cari dan temukan hostpot <Text style={{
                    color : Colors.ResColor.blue
                }}>konekyu</Text> di dekatmu</Text>
        </View>
    )
}

export default HostpotTerdekat;