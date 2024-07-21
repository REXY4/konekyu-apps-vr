import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity } from "react-native"
import Colors from "../colors/Colors";
import { useState } from "react";
import { CloseEyesIcon, OpenEyesIcon } from "../icons/Icon";
import { IconPaste } from "../../screens/wifi";
import { Path, Svg } from "react-native-svg";

interface Props { 
    label : string | undefined,
    type : KeyboardTypeOptions
    passwordIcon : boolean,
    onChange(val:string):void
    placeholder:string
    value:string | undefined,
    paste :boolean,
    onPresPaste: any
    searchIcon : boolean
    textContentType :| 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'creditCardExpiration'
    | 'creditCardExpirationMonth'
    | 'creditCardExpirationYear'
    | 'creditCardSecurityCode'
    | 'creditCardType'
    | 'creditCardName'
    | 'creditCardGivenName'
    | 'creditCardMiddleName'
    | 'creditCardFamilyName'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | 'birthdate'
    | 'birthdateDay'
    | 'birthdateMonth'
    | 'birthdateYear'
    | undefined; 
}


export const SearchIcon = ({size, color}:{size:number, color : string}) =>{
    return (
        <Svg  width={size} height={size} viewBox="0 0 24 24">
            <Path fill={color} d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/>
        </Svg>
    )
}

const InputPrimary = ({label, type, passwordIcon, onChange,placeholder, value, paste, onPresPaste, searchIcon, textContentType}:Props) =>{
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
        textContentType={textContentType}
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
            paddingLeft : searchIcon ? 50 : 10,
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
        {searchIcon &&
        <TouchableOpacity 
        onPress={onPresPaste}
        style={{
            position : "absolute",
            bottom : 0,
            left : 10,
            flexDirection :"row",
            alignItems : "center",
            height : 50
        }}>
            <SearchIcon size={24} color="gray"/>
        </TouchableOpacity>}
        </>

    )
}


export default InputPrimary;