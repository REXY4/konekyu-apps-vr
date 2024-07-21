import { Image, Text, TouchableOpacity, View } from "react-native"
import InputPrimary from "../../../../components/inputs/InputPrimary";
import ButtonContainer from "../../../../components/buttons/ButtonContainer";
import { useEffect, useState } from "react";
import { RequestLoginEntities } from "../../../../entities/auth.entities";
import Colors from "../../../../components/colors/Colors";
import ButtonLink from "../../../../components/buttons/ButtonLink";
import FontStyle from "../../../../types/FontTypes";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { BaseUrl, configHeaderPrimary } from "../../../../../config/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import AuthActionType from "../../../../state/actions-type/auth.type";
import LocationUseCase from "../../../../use-case/location.usecase";
import SettingActionType from "../../../../state/actions-type/setting.type";
import LoadingPage from "../../../onboarding/LoadingPage";
import SettingUseCase from "../../../../use-case/setting.useCase";
import AlertPrimary from "../../../../components/alert/AlertPrimary";
import dynamicLinks from "@react-native-firebase/dynamic-links"

const RegisterForm = () =>{
    const {popData} = LocationUseCase();
    const {isLoading, alert} = SettingUseCase()
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [form, setForm] = useState<any>({
        name:   "",
        password:   "",
        email:   "",
        token_name: "userhostpot",
        pop_id:     popData.popId,
    });

    const dispatch = useDispatch()

    const handleChange = (name:string, val:string) =>{
        setForm({
            ...form,
            [name] : val
        })
    }


    async function buildLink(email:string, password:string) {
        
        const link = await dynamicLinks().buildShortLink({
          link: `https://ribit.bnet.id/member?page=konfirmasi&email=${email}&password=${password}`,
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

    const handleRegister = async () =>{
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true
        })
        
        try {
            const getLink = await buildLink(form.email, form.password);
            const response = await axios.post(`${BaseUrl.baseProd}/member/register/store`,{
                ...form,
                password_confirmation : form.password,
                url : getLink,
            }, configHeaderPrimary)
          
            if(response.status == 200){
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen: true,
                    message :response.data.message,
                    status : "success"
                })
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
            }else{
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen: true,
                    message :"Coba check kembali data anda!",
                    status : "error"
                })
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
            }
        } catch (error) {
            console.log("check data error ",error);
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
            })
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen: true,
                message :"Coba check kembali data anda!",
                status : "error"
            })
        }
    }

    useEffect(()=>{
        if(form.username !== "" && form.password !== ""){
            setDisableButton(false)
        }else{
            setDisableButton(true)
        }
    },[form.password, form.username])


    const googleLogin = async () => {
        return GoogleSignin.hasPlayServices().then((hasPlayService) => {
             if (hasPlayService) {
                 GoogleSignin.signIn().then(async (userInfo) => {
                     const getToken = await GoogleSignin.getTokens();
                     console.log("check token ", getToken.accessToken)
                     const response = await axios.post(`${BaseUrl.baseProd}/auth/login/google/callback?token=${getToken.accessToken}`);
                     if(response.status == 200){
                        dispatch({
                            type : AuthActionType.LOGIN,
                            payload : response.data.result
                        })
                     };
                 }).catch((e) => {
                    GoogleSignin.revokeAccess();
                     // dispatch({
                     //     type: SettingActionType.SET_ALERT,
                     //     message: e.message,
                     //     status: 'error',
                     //     condition: true,
                     // });
                 });
             }
         }).catch((e) => {
             // dispatch({
             //     type: SettingActionType.SET_ALERT,
             //     message: e.message,
             //     status: 'error',
             //     condition: true,
             // });
         });
    };

    useEffect(()=>{
        GoogleSignin.configure({
            iosClientId: "670486900808-4f58ur7enln3p623aqofo2q0ujpdkpba.apps.googleusercontent.com", 
            offlineAccess: false,
        })  
    },[])
    
    return (
        <View style={{marginTop : 20}}>
             <View style={{
                marginBottom :15,
            }}>
                <InputPrimary
                placeholder="Masukkan nama lengkap"
                onChange={(val:string)=>handleChange("name", val)}
                passwordIcon={false} type="visible-password" label="Nama Lengkap"/>
            </View>
            <View style={{
                marginBottom : 15,
            }}>
            <InputPrimary 
            placeholder="Masukkan email"
            onChange={(val:string)=>handleChange("email", val)}
            passwordIcon={false} type="email-address" label="Email"/>
            </View>
            <View style={{
                marginBottom :15,
            }}>
                <InputPrimary
                placeholder="Masukkan kata sandi"
                onChange={(val:string)=>handleChange("password", val)}
                passwordIcon type="default" label="Kata sandi"/>
            </View>
            {/* <View style={{
                marginBottom :30,
            }}>
                <InputPrimary
                placeholder="Masukkan konfirmasi kata sandi"
                onChange={(val:string)=>handleChange("password", val)}
                passwordIcon type="default" label="Konfirmasi kata sandi"/>
            </View> */}
            <View  >
                <ButtonContainer 
                
                disable={disableButton}
                background={!disableButton ? Colors.ResColor.blue : undefined}
                textColor={undefined}
                label="Daftar" onPress={()=>handleRegister()}/>
            </View>
            <View style={{
                flexDirection  :"row",
                justifyContent : "space-between",
                // flexWrap : "wrap",
                marginTop : 20,
                marginBottom : 20,
            }}>
                <View style={{
                    borderTopColor : Colors.ResColor.gray,
                    borderTopWidth : 2,
                    width : "40%",
                    position : "relative",
                    top : 12,
                }}/>
                <Text style={{
                    fontSize : 16,
                    fontFamily : FontStyle.MEDIUM,
                }}>Atau</Text>
                <View style={{
                    borderTopColor : Colors.ResColor.gray,
                    borderTopWidth : 2,
                    width : "40%",
                    position : "relative",
                    top : 12,
                }}/>
            </View>
            <View>
                <TouchableOpacity 
                onPress={googleLogin}
                style={{
                    backgroundColor : Colors.ResColor.grayOpacity,
                    borderRadius : 10,
                    height : 50,
                    elevation : 3,
                    justifyContent : "center",
                    flexDirection  :"row",
                    alignItems : "center",
                }}>
                    <View style={{
                        flexDirection : "row",
                        alignItems  :"center",
                    }}>
                    <Image 
                    resizeMode="contain"
                    style={{
                        width : 40,
                        height : 40,
                        objectFit : "fill",
                        marginRight : 10,
                    }}
                    source={require("../../../../../assets/images/google.png")}/>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.BOLD,
                    }}>Daftar dengan Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
         
            {alert.isOpen && <AlertPrimary status={alert.status} message={alert.message}/>}
        </View>
    )
}


export default RegisterForm;