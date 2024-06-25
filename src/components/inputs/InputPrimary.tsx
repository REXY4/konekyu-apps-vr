import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity } from "react-native"
import Colors from "../colors/Colors";
import { useState } from "react";
import { CloseEyesIcon, OpenEyesIcon } from "../icons/Icon";
import { IconPaste } from "../../screens/wifi";

interface Props { 
    label : string | undefined,
    type : KeyboardTypeOptions
    passwordIcon : boolean,
    onChange(val:string):void
    placeholder:string
    value:string | undefined,
    paste :boolean,
    onPresPaste: any
}

const InputPrimary = ({label, type, passwordIcon, onChange,placeholder, value, paste, onPresPaste}:Props) =>{
    const [focus, setFocus] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <>
        {label &&
        <Text style={{
            fontSize : 18,
            color : Colors.ResColor.black,
            marginBottom :10,
            // textTransform : "capitalize"
        }}>{label}</Text>
        }        
        <TextInput 
        value={value}
        onChangeText={onChange}
        textContentType="password"
        secureTextEntry={!showPassword}
        // multiline
        autoCapitalize={'none'}
        placeholder={placeholder}
        onFocus={()=>setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType={type}
        style={{
            width : "auto",
            borderWidth  :0.5,
            height : 50,
            borderRadius : 10,
            paddingLeft : 10,
            borderColor : focus ?Colors.ResColor.blue : Colors.ResColor.gray,
            backgroundColor : focus ? Colors.ResColor.white : Colors.ResColor.grayOpacity
        }}/>
        {passwordIcon &&
        <TouchableOpacity 
        onPress={()=>{
            if(showPassword){
                setShowPassword(false)
            }else{
                setShowPassword(true)
            }
        }}
        style={{
            position : "absolute",
            bottom : 0,
            right : 20,
            flexDirection :"row",
            alignItems : "center",
            height : 50
        }}>
            {showPassword ? <CloseEyesIcon size={24} color={Colors.ResColor.gray}/>:
            <OpenEyesIcon size={24} color={Colors.ResColor.gray}/>}
        </TouchableOpacity>}
        {paste &&
        <TouchableOpacity 
        onPress={onPresPaste}
        style={{
            position : "absolute",
            bottom : 0,
            right : 20,
            flexDirection :"row",
            alignItems : "center",
            height : 50
        }}>
            <IconPaste/>
        </TouchableOpacity>}
        </>

    )
}


export default InputPrimary;