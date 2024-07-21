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
import { Path, Svg } from "react-native-svg";

interface From {
    "old_password": string,
    "password":string,
    "password_confirmation": string,
}

export const LockIcon = ({size}:{size:number}) =>{
    return (
        <Svg width={size} height={size} viewBox="0 0 71 71" fill="none" >
<Path d="M18.2157 64.6328C16.6115 64.6328 15.2387 64.0621 14.0973 62.9207C12.9559 61.7793 12.3843 60.4056 12.3823 58.7995V29.6328C12.3823 28.0286 12.954 26.6559 14.0973 25.5145C15.2407 24.3731 16.6134 23.8014 18.2157 23.7995H21.1323V17.9661C21.1323 13.9314 22.5547 10.4927 25.3994 7.6499C28.2441 4.80712 31.6829 3.38476 35.7157 3.38281C39.7484 3.38087 43.1882 4.80323 46.0348 7.6499C48.8815 10.4966 50.3029 13.9353 50.299 17.9661V23.7995H53.2157C54.8198 23.7995 56.1936 24.3711 57.3369 25.5145C58.4802 26.6578 59.0509 28.0306 59.049 29.6328V58.7995C59.049 60.4036 58.4783 61.7774 57.3369 62.9207C56.1955 64.0641 54.8218 64.6348 53.2157 64.6328H18.2157ZM35.7157 50.0495C37.3198 50.0495 38.6936 49.4788 39.8369 48.3374C40.9802 47.196 41.5509 45.8223 41.549 44.2161C41.547 42.61 40.9764 41.2373 39.8369 40.0978C38.6975 38.9584 37.3237 38.3867 35.7157 38.3828C34.1076 38.3789 32.7348 38.9506 31.5973 40.0978C30.4598 41.245 29.8882 42.6178 29.8823 44.2161C29.8765 45.8145 30.4482 47.1882 31.5973 48.3374C32.7465 49.4866 34.1193 50.0573 35.7157 50.0495ZM26.9657 23.7995H44.4657V17.9661C44.4657 15.5356 43.615 13.4696 41.9136 11.7682C40.2122 10.0668 38.1462 9.21615 35.7157 9.21615C33.2851 9.21615 31.2191 10.0668 29.5177 11.7682C27.8164 13.4696 26.9657 15.5356 26.9657 17.9661V23.7995Z" fill="#0074E1"/>
</Svg>

    )
}

const ChangePassword = () =>{
    const [form, setForm] = useState<From>({
        old_password : "",
        password : "",
        password_confirmation : ""
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
                url: `${BaseUrl.baseProd}/auth/change-password`,
                data: {
                    ...form,
                },
                headers : config.headers
              });
            console.log(response.data.message.password[0])
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
        if(form.old_password !== "" && form.password !== "" && form.password_confirmation !== ""){
            setDisable(false)
        }else{
            setDisable(true)
        }
    },[form.old_password, form.password, form.password_confirmation])
    
    return (
        <SafeAreaView style={{
            height : "100%"
        }}>
            <View style={{
                padding : 15,
                marginTop : 20,
            }}>
                <View style={{
                    alignItems : "center",
                    marginBottom : 20,
                }}>
                    <LockIcon size={80}/>
                    <Text style={{
                        fontSize : 18,
                        fontFamily : FontStyle.MEDIUM,
                    }}>
                        Ubah Password
                    </Text>
                    <Text style={{
                        fontSize : 14,
                        textAlign : "center",
                        fontFamily : FontStyle.REGULER,
                    }}>
                        Gunakan password yang mudah diingat dan unik
                    </Text>
                </View>
            <View style={{
                marginBottom  :15,
            }}>
                <InputPrimary label={"Kata sandi lama"} type={"default"} passwordIcon={true} onChange={(val:string)=>onChange("old_password", val)} placeholder={"Masukkan Password Lama"} />
            </View>
            <View style={{
                marginBottom  :15,
            }}>
                <InputPrimary label={"Kata sandi baru"} type={"default"} passwordIcon={true} onChange={(val:string)=>onChange("password", val)} placeholder={"Masukkan Password Baru"} />
            </View>
            <View style={{
                marginBottom  :20,
            }}>
                <InputPrimary label={"Konfirmasi kata sandi baru"} type={"default"} passwordIcon={true} onChange={(val:string)=>onChange("password_confirmation", val)} placeholder={"Konfirmasi Password Baru"} />
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
                        Simpan Perubahan
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

export default ChangePassword;