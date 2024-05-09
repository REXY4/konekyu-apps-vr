import { Image, Text, TouchableOpacity, View } from "react-native"
import InputPrimary from "../../../../components/inputs/InputPrimary";
import ButtonContainer from "../../../../components/buttons/ButtonContainer";
import { useEffect, useState } from "react";
import { RequestLoginEntities } from "../../../../entities/auth.entities";
import Colors from "../../../../components/colors/Colors";
import ButtonLink from "../../../../components/buttons/ButtonLink";
import FontStyle from "../../../../types/FontTypes";

const RegisterForm = () =>{
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [form, setForm] = useState<RequestLoginEntities>({
        username:   "",
        password:   "",
        token_name: "userhostpot",
        pop_id:     243,
    });
    const handleChange = (name:string, val:string) =>{
        setForm({
            ...form,
            [name] : val
        })
    }

    useEffect(()=>{
        if(form.username !== "" && form.password !== ""){
            setDisableButton(false)
        }else{
            setDisableButton(true)
        }
    },[form.password, form.username])
    return (
        <View style={{marginTop : 20}}>
             <View style={{
                marginBottom :15,
            }}>
                <InputPrimary
                placeholder="Masukan nama lengkap"
                onChange={(val:string)=>handleChange("password", val)}
                passwordIcon={false} type="default" label="Nama Lengkap"/>
            </View>
            <View style={{
                marginBottom : 15,
            }}>
            <InputPrimary 
            placeholder="Masukan email"
            onChange={(val:string)=>handleChange("username", val)}
            passwordIcon={false} type="email-address" label="Email"/>
            </View>
            <View style={{
                marginBottom :15,
            }}>
                <InputPrimary
                placeholder="Masukan kata sandi"
                onChange={(val:string)=>handleChange("password", val)}
                passwordIcon type="default" label="Kata sandi"/>
            </View>
            <View style={{
                marginBottom :30,
            }}>
                <InputPrimary
                placeholder="Masukan konfirmasi kata sandi"
                onChange={(val:string)=>handleChange("password", val)}
                passwordIcon type="default" label="Konfirmasi kata sandi"/>
            </View>
            <View  >
                <ButtonContainer 
                disable={disableButton}
                background={!disableButton ? Colors.ResColor.blue : undefined}
                textColor={undefined}
                label="Daftar" onPress={()=>console.log("hallo")}/>
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
                <TouchableOpacity style={{
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
        </View>
    )
}


export default RegisterForm;