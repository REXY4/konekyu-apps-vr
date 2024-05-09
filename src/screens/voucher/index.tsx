import { Dimensions,SafeAreaView, Text, View, TouchableOpacity, Animated } from "react-native"
import Colors from "../../components/colors/Colors";
import FontStyle from "../../types/FontTypes";
import { useEffect, useState } from "react";
import VoucherKu from "./components/VoucherKu";
import VoucherAktif from "./components/VoucherAktif";

const {width} =  Dimensions.get("window");


const VoucherScreen = () =>{
    const [tabButton, setTabButton] = useState<boolean>(false);
    const View1 = new Animated.Value(0);

    const handleSlide = ()=> {
        if(!tabButton){
            Animated.spring(View1,{
                toValue: width,
                delay : 50,
                useNativeDriver: false
            }).start()
            setTimeout(()=>{
                Animated.spring(View1,{
                    toValue: 0,
                    delay : 50,
                    useNativeDriver: false
                }).start()
            },500)
            
        }else{
            Animated.spring(View1,{
                toValue: -width,
                delay : 50,
                useNativeDriver: false
            }).start()
        }
    }

    useEffect(()=>{
        handleSlide();
    },[tabButton])

    return (
        <SafeAreaView style={{
            height : "100%",
        }}>
            <View style={{
                padding : 15,
            }}>
                <View style={{
                    flexDirection :"row",
                    borderWidth : 0.5,
                    borderColor : Colors.ResColor.blue,
                    borderRadius : 10,
                    alignItems  :"center",
                    justifyContent  :"space-between", 
                }}>
                <TouchableOpacity 
                onPress={()=>{setTabButton(false) }}
                style={{
                    backgroundColor  :!tabButton ?  Colors.ResColor.blue : Colors.ResColor.white,
                    height : 50,
                    borderTopLeftRadius : 10,
                    borderBottomLeftRadius : 10,
                    alignItems : "center",
                    flexDirection  :"row",
                    width : "50%",
                    justifyContent : "center"
                }}>
                    <Text style={{
                        fontSize : 16,
                        color :  !tabButton ? Colors.ResColor.white : Colors.ResColor.black,
                        fontFamily : FontStyle.BOLD,
                        letterSpacing : 0.5
                    }}>Voucherku</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{
                    setTabButton(true)
                    // handleSlide(false);
                }}
                style={{
                    backgroundColor : tabButton ?  Colors.ResColor.blue : Colors.ResColor.white,
                    height : 50,
                    borderTopRightRadius : 10,
                    borderBottomRightRadius : 10,
                    alignItems : "center",
                    flexDirection  :"row",
                    width : "50%",
                    justifyContent : "center"
                }} >
                    <Text style={{
                         fontSize : 16,
                         color : tabButton ? Colors.ResColor.white : Colors.ResColor.black,
                         fontFamily :  FontStyle.BOLD,
                         letterSpacing : 0.5
                    }}>Voucher Aktif</Text>
                </TouchableOpacity>
                </View>
                <Animated.View style={{
                    flexDirection  :"row",
                    width : width + 45,
                    transform :[
                        {
                            translateX: View1
                        },
                       
                    ]
                     }}>
                        <View style={{
                            width : width,
                        }}>
                            <VoucherKu/>
                        </View>
                        <View style={{
                            width : width,
                        }}>
                            <VoucherAktif/>
                        </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

export default VoucherScreen;