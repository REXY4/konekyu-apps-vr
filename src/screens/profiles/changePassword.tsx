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

interface From {
    "old_password": string,
    "password":string,
    "password_confirmation": string,
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
                marginBottom  :15,
            }}>
                <InputPrimary label={"Kata sandi lama"} type={"default"} passwordIcon={true} onChange={(val:string)=>onChange("old_password", val)} placeholder={"Masukan Password Lama"} />
            </View>
            <View style={{
                marginBottom  :15,
            }}>
                <InputPrimary label={"Kata sandi baru"} type={"default"} passwordIcon={true} onChange={(val:string)=>onChange("password", val)} placeholder={"Masukan Password Baru"} />
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

export default ChangePassword;