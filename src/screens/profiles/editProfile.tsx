import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import InputPrimary from "../../components/inputs/InputPrimary";
import { useEffect, useState } from "react";
import Colors from "../../components/colors/Colors";
import FontStyle from "../../types/FontTypes";
import axios from "axios";
import { BaseUrl, configWithJwt } from "../../../config/api";
import { useDispatch } from "react-redux";
import SettingActionType from "../../state/actions-type/setting.type";
import AlertPrimary from "../../components/alert/AlertPrimary";
import { AlertEntities } from "../../state/setting-store/setting.store";
import SettingUseCase from "../../use-case/setting.useCase";
import LoadingPage from "../onboarding/LoadingPage";
import AuthUseCase from "../../use-case/auth.usecase";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

interface From {
    'name': string,
        'email': string,
        'phone': string,
        'birth_date': string,
        'gender': string
}


export const ProfIcons = ({size}:{size:number})=>{
    return (
        <Svg width="70" height="57" viewBox="0 0 70 57" fill="none" >
<G clip-path="url(#clip0_2789_5790)">
<Path d="M24.5 28.4668C32.2328 28.4668 38.5 22.1996 38.5 14.4668C38.5 6.73399 32.2328 0.466797 24.5 0.466797C16.7672 0.466797 10.5 6.73399 10.5 14.4668C10.5 22.1996 16.7672 28.4668 24.5 28.4668ZM34.3 31.9668H32.4734C30.0453 33.0824 27.3438 33.7168 24.5 33.7168C21.6562 33.7168 18.9656 33.0824 16.5266 31.9668H14.7C6.58437 31.9668 0 38.5512 0 46.6668V51.2168C0 54.1152 2.35156 56.4668 5.25 56.4668H35.3172C35.0547 55.7231 34.9453 54.9356 35.0328 54.1371L35.7766 47.4762L35.9078 46.2621L36.7719 45.3981L45.2266 36.9434C42.5469 33.9137 38.6641 31.9668 34.3 31.9668ZM39.2547 47.859L38.5109 54.5309C38.3906 55.6465 39.3313 56.5871 40.4359 56.4559L47.0969 55.7121L62.1797 40.6293L54.3375 32.7871L39.2547 47.859ZM69.2344 29.8777L65.0891 25.7324C64.0719 24.7152 62.4094 24.7152 61.3922 25.7324L57.2578 29.8668L56.8094 30.3152L64.6625 38.1574L69.2344 33.5855C70.2516 32.5574 70.2516 30.9059 69.2344 29.8777Z" fill="#0074E1"/>
</G>
<Defs>
<ClipPath id="clip0_2789_5790">
<Rect width="70" height="56" fill="white" transform="translate(0 0.466797)"/>
</ClipPath>
</Defs>
</Svg>

    )
}

const EditProfile = () =>{
    const {authResult} =  AuthUseCase();
    const [form, setForm] = useState<From>({
        'name': String(authResult?.name),
        'email': String(authResult?.email),
        'phone': "",
        'birth_date': "",
        'gender': ""
    });
    const [disable, setDisable] = useState<boolean>(true);
    const dispatch =  useDispatch();
    
    const {isLoading, alert} = SettingUseCase();

    const onChange = (name:string,val:string) =>{
        setForm({
            ...form,
            [name] : val
        })
    }


    const handleSubmit = async () =>{
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload :  true,
        })
        try {
            const config = await configWithJwt();
            const response = await axios({
                method: 'put',
                url: `${BaseUrl.baseProd}/member/profile`,
                data: {
                    ...form,
                },
                headers : config.headers
              });
            if(response.status == 200){
                if(response.data.message.password[0] ==  "The password and old password must be different." ){
                    const aleret:AlertEntities = {
                        isOpen : true,
                        message : response.data.message.password[0],
                        status : "error",
                    }
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen: aleret.isOpen,
                        message : aleret.message,
                        status : aleret.status
                    })
                    dispatch({
                        type : SettingActionType.SET_LOADING,
                        payload :  false,
                    })
                }else{
                    dispatch({
                        type : SettingActionType.SET_LOADING,
                        payload :  false,
                    })
                    const aleret:AlertEntities = {
                        isOpen : true,
                        message : response.data.message.password[0],
                        status : "success",
                    }
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen: aleret.isOpen,
                        message : aleret.message,
                        status : aleret.status
                    })
                }
               
            }else{
                const aleret:AlertEntities = {
                    isOpen : true,
                    message : response.data.message.password[0],
                    status : "error",
                }
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen: aleret.isOpen,
                    message : aleret.message,
                    status : aleret.status
                })
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload :  false,
                })
            }
        } catch (error:any) {
            console.log(error)
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload :  false,
            })
       
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                message : error.response.data.message.password[0],
                status : "success",
            })
        }
    }

    useEffect(()=>{
        if(form.name !== "" && form.phone !== ""){
            setDisable(false)
        }else{
            setDisable(true)
        }
    },[form.name, form.phone])
    
    return (
        <SafeAreaView style={{
            height : "100%"
        }}>
            <View style={{
                alignItems  :"center",
                marginTop : 20,
            }}>
                <ProfIcons size={80}/>
                <Text  style={{
                    fontFamily : FontStyle.MEDIUM,
                    marginTop : 20,
                }}>Lengkapi atau ubah data profil</Text>
            </View>
            <View style={{
                padding : 15,
                marginTop : 20,
            }}>
            <View style={{
                marginBottom  :15,
            }}>
                <InputPrimary value={authResult?.email} label={"Email"}   type={"visible-password"} passwordIcon={false}  onChange={(val:string)=>console.log()} placeholder={"Masukkan Password Lama"} />
            </View>
            <View style={{
                marginBottom  :15,
            }}>
                <InputPrimary value={authResult?.name} label={"Name"} type={"visible-password"} passwordIcon={false} onChange={(val:string)=>onChange("name", val)} placeholder={"Masukkan Password Baru"} />
            </View>
            <View style={{
                marginBottom  :20,
            }}>
                <InputPrimary value={form.phone} label={"No Handphone"} type={"number-pad"} passwordIcon={false} onChange={(val:string)=>onChange("phone", val)} placeholder={"Masukkan nomor handphone"} />
            </View>
       
            <View >
                <TouchableOpacity 
                disabled={disable}
                onPress={handleSubmit}
                style={{
                    backgroundColor : disable ? Colors.ResColor.gray : Colors.ResColor.blue,
                    padding : 15,
                    borderRadius : 10,
                }}>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.BOLD,
                        color : disable ? Colors.ResColor.black: Colors.ResColor.white,
                        textAlign : "center"
                    }}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            {alert.isOpen && 
            <AlertPrimary status={alert.status} message={alert.message}/> 
            } 
            {isLoading &&
            <LoadingPage/>}
        </SafeAreaView>
    )
}

export default EditProfile;