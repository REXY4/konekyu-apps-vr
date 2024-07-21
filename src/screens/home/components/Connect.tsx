import { View, Text  } from "react-native"
import Colors from "../../../components/colors/Colors"
import { WifiIcon } from "../../../components/icons/Icon"
import FontStyle from "../../../types/FontTypes"
import LocationUseCase from "../../../use-case/location.usecase"

const Connect = ()=>{
    const {popData, connectData} = LocationUseCase();
    const dataExp = [
        {
            id : 0,
            desc : "Sambungkan dengan jaringan KonekYu"
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
                }}>{!connectData ? "Belum Terhubung" : "Terhubung"}</Text>
            </View>
            <View style={{
                marginTop : 10,
                backgroundColor : Colors.ResColor.darkBlue,
                width : "100%",
                borderRadius  :10,
                padding : 15,
            }}>
                 {!connectData ?
                        <>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        width : "80%",
                    }}>
                        Ikuti instruksi untuk terhubung jaringan KonekYu:
                    </Text>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        paddingLeft : 5,

                    }}>
                        1. Klik cari jaringan KonekYu 
                    </Text>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        paddingLeft : 5,
                    }}>
                        2 .Hubungkan dengan jaringan KonekYu
                    </Text>
                    </> :  <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        width : "80%",
                    }}>
                        Selamat kamu sudah terhubung ke jaringan KonekYu!
                    </Text>
                        }
                        
            </View>
        </View>
    )
}

export default Connect