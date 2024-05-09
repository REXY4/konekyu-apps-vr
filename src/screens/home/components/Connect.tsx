import { View, Text  } from "react-native"
import Colors from "../../../components/colors/Colors"
import { WifiIcon } from "../../../components/icons/Icon"
import FontStyle from "../../../types/FontTypes"

const Connect = ()=>{
    const dataExp = [
        {
            id : 0,
            desc : "Sambungkan dengan jaringan konekyu"
        },
        {
            id : 1,
            desc : "Matikan data seluler"
        }
    ]
    return (
        <View style={{
            backgroundColor  :Colors.ResColor.blue,
            width : "100%",
            padding : 15,
            borderRadius : 10,
            elevation : 3,
        }}>
            <View style={{
                flexDirection  :"row",
                alignItems : "center",
            }}>
                <WifiIcon color={Colors.ResColor.white} size={24}/>
                <Text style={{
                    fontSize : 16,
                    color : Colors.ResColor.white,
                    fontFamily:FontStyle.BOLD,
                    marginLeft : 10,
                    position : "relative",
                    top : 3,
                }}>Disconnect</Text>
            </View>
            <View style={{
                marginTop : 10,
                backgroundColor : Colors.ResColor.darkBlue,
                width : "100%",
                borderRadius  :10,
                padding : 15,
            }}>
                <Text style={{
                    fontSize : 12,
                    color : Colors.ResColor.white,
                    fontFamily : FontStyle.REGULER,
                }}>Ikuti intruksi sebelum terkoneksi :</Text>
                <View style={{
                    paddingLeft : 10,
                }}>
                {dataExp.map((item:any,index:number)=>{
                    return <Text
                    style={{
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        color : Colors.ResColor.white,
                    }}
                    >{index +1}.{item.desc}</Text>
                })}
                </View>
            </View>
        </View>
    )
}

export default Connect