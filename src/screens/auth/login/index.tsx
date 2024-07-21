import { SafeAreaView,  View,Text, Image, StatusBar, ScrollView, Animated, Dimensions } from "react-native"
import FontStyle from '../../../types/FontTypes';
import Colors from "../../../components/colors/Colors";
import LoginForm from "./components/LoginForm";
import ButtonLink from "../../../components/buttons/ButtonLink";
import {  useCallback, useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoadingPage from "../../onboarding/LoadingPage";
import SettingUseCase from "../../../use-case/setting.useCase";
import AlertPrimary from "../../../components/alert/AlertPrimary";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArrowRightIcon } from "../../../components/icons/Icon";
import { Path, Svg } from "react-native-svg";
import { goBack, navigate } from "../../../routers/NavRef";
import ScreenActionType from "../../../routers/types/ScreenActionType";
import dynamicLinks  from "@react-native-firebase/dynamic-links"
import { RequestLoginEntities } from "../../../entities/auth.entities";
import LocationUseCase from "../../../use-case/location.usecase";
import AuthUseCase from "../../../use-case/auth.usecase";

const {width} =  Dimensions.get("window");

const ArrowLeft = ({size, color}:{size:number,color : string}) =>{
    return (
        <Svg  width={size} height={size} viewBox="0 0 24 24">
            <Path fill={color} fill-rule="evenodd" d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081" clip-rule="evenodd"/>
            </Svg>
    )
}

const LoginScreen = () =>{
    const {isLoading, alert, } = SettingUseCase();
    const View1 = new Animated.Value(0);
    
    const handleSlide = (t:boolean)=> {
        if(t){
            Animated.spring(View1,{
                toValue: 0,
                delay : 50,
                useNativeDriver: false
            }).start()
            setTimeout(()=>{
                Animated.spring(View1,{
                    toValue: 0,
                    delay : 50,
                    useNativeDriver: false
                }).reset()
            },500)
           
        }else{
            Animated.spring(View1,{
                toValue: -width,
                delay : 50,
                useNativeDriver: false
            }).start()
           
        }
    }


    return (
        <SafeAreaView style={{
            backgroundColor : Colors.ResColor.white,
            height : "100%"
        }}>
            
            <StatusBar backgroundColor={Colors.ResColor.blue}/>
            
            <View style={{
                backgroundColor : Colors.ResColor.blue,
                padding : 15,
                flexDirection  :"row",
                justifyContent : "space-between",
                alignItems  :"center",
                elevation : 3,
            }}>
                
                <View>
                <View style={{
                    marginBottom : 20,
                }}>
                    <TouchableOpacity onPress={()=>navigate(ScreenActionType.HOME)}>
                        <ArrowLeft size={24} color="white"/>
                    </TouchableOpacity>
                </View>
                    <Text style={{
                        fontFamily : FontStyle.SEMI_BOLD,
                        color : Colors.ResColor.white,
                        }}>
                        Selamat Datang di
                    </Text>
                    <Text style={{
                        fontFamily : FontStyle.BOLD,
                        color : Colors.ResColor.white,
                        fontSize : 21,
                        letterSpacing : 1,
                    }}>KonekYu</Text>
                </View>
                <View >
                    <View style={{
                        backgroundColor  :Colors.ResColor.white,
                        borderRadius : 50,
                    }}>
                    <Image source={require("../../../../assets/icons/iconNot.png")} 
                    resizeMode="contain" style={{
                        width : 80,
                        height : 80,
                    }}/>
                    </View>
                </View>
            </View>
            <ScrollView>
            <Animated.View
                style={{
                    flexDirection  :"row",
                    width : width + 45,
                    transform :[
                        {
                            translateX: View1
                        },
                       
                    ]
                }}
                >
            <View>        
            <View style={{
                padding : 15,
            }}>
                <LoginForm/>
            </View>
            <View style={{
                flexDirection : "row",
                alignItems  :"center",
                justifyContent : "center",
            }}>
                <Text style={{
                    fontSize : 16,
                    fontFamily : FontStyle.MEDIUM,
                    marginRight : 5,
                }}>Belum punya akun ?</Text>
                <ButtonLink 
                label="Daftar" 
                onPress={()=>handleSlide(false)}
                textColor={undefined} disable={false} size={16} style={undefined}/>
            </View>
            </View>
            <View style={{
                padding : 15,
                marginBottom : 100,
            }}>
                <RegisterForm/>
                <View style={{
                flexDirection : "row",
                alignItems  :"center",
                justifyContent : "center",
                marginTop : 10,
            }}>
                <Text style={{
                    fontSize : 16,
                    fontFamily : FontStyle.MEDIUM,
                    marginRight : 5,
                }}>Sudah punya akun ?</Text>
                <ButtonLink onPress={()=>handleSlide(true)} label="Login"  textColor={undefined} disable={false} size={16} style={undefined}/>
            </View>
            </View>
            </Animated.View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen;