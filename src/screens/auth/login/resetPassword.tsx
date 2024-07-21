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
import InputPrimary from "../../../components/inputs/InputPrimary";
import axios from "axios";
import { useDispatch } from "react-redux";
import SettingActionType from "../../../state/actions-type/setting.type";
import { configWithOpenGuest } from "../../../../config/api";
import dynamicLinks from "@react-native-firebase/dynamic-links"


const {width} =  Dimensions.get("window");

const ArrowLeft = ({size, color}:{size:number,color : string}) =>{
    return (
        <Svg  width={size} height={size} viewBox="0 0 24 24">
            <Path fill={color} fill-rule="evenodd" d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081" clip-rule="evenodd"/>
            </Svg>
    )
}

const ResetPassword = () =>{
    const {isLoading, alert} = SettingUseCase();
    const [email, setValue ] = useState<string>("")
    const View1 = new Animated.Value(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken ] = useState<string>("");
    const dispatch = useDispatch();
    

    function generateRandomString(length:number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return result;
      }
    
    async function buildLink(email:string) {
        const link = await dynamicLinks().buildShortLink({
          link: `https://ribit.bnet.id/member?page=resetpassword&email=${email}&token=${token}`,
          domainUriPrefix: `https://konekyu.page.link`,
          android: {
            packageName: 'id.wahana.inetyu', // Replace with your Android package name
            minimumVersion: '1' // Ensure this is set to a valid version
          },
          // optional setup which updates Firebase analytics campaign
          // "banner". This also needs setting up before hand
        }, dynamicLinks.ShortLinkType.DEFAULT);
      
        return link;
      }
     
    const handleResetPassword = async () =>{
        if(email == ""){
            dispatch({
                type: SettingActionType.SET_ALERT,
                message: "isi email terlebih dahulu!",
                status: 'error',
                isOpen: true,
            });
            return;
        }
        try {
            setLoading(true)
            const getLink = await buildLink(email);
            const response = await axios.post('http://ribit.bnet.id:3090/send/email',{
                email : email,
                type :"reset",
                token :token,
                url : getLink
            }, configWithOpenGuest);
            if(response.status == 200){
                dispatch({
                    type: SettingActionType.SET_ALERT,
                    message: response.data.message,
                    status: 'success',
                    isOpen: true,
                });
                setLoading(false)
            }
           
            
        } catch (error) {
        setLoading(false)
            dispatch({
                type: SettingActionType.SET_ALERT,
                message: "Email gagal di kirim!",
                status: 'error',
                isOpen: true,
            });
        }
    }
    
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
    
    useEffect(()=>{
        setToken(generateRandomString(20))
    },[])

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
                        Reset Password
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
            <View>
                
                <View style={{
                    padding : 15,
                    marginTop : 20,
                }}>
                    <View style={{
                        marginBottom : 10,
                    }}>
                        <Text style={{
                            fontSize : 18,
                            fontFamily : FontStyle.MEDIUM,
                            textAlign : "center",
                        }}>Permintaan reset password  akan dikirimkan ke email anda!</Text>
                    </View>
                <InputPrimary
                    placeholder="Masukkan email"
                    onChange={(val: string) => setValue(val)}
                    passwordIcon={false} type="email-address" label="Email" value={email.trim()}/>
                    </View>
                    <View style={{
                        padding : 15
                    }}>
                        <TouchableOpacity 
                        onPress={handleResetPassword}
                        style={{
                            backgroundColor : Colors.ResColor.blue,
                            height : 50,
                            borderRadius : 10,
                            elevation : 3,
                            flexDirection  :"row",
                            justifyContent : "center",
                            alignItems : "center",
                        }}>
                            <Text style={{
                                fontSize : 18,
                                color  :"white",
                                fontFamily : FontStyle.REGULER,
                            }}>Kirim</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            {alert.isOpen && <AlertPrimary status={alert.status} message={alert.message}/>}
           {loading && <LoadingPage/>}
        </SafeAreaView>
    )
}

export default ResetPassword;