import { View,Text, Dimensions, Image, Animated  } from "react-native"
import Colors from "../colors/Colors"
import FontStyle from "../../types/FontTypes";
import { Path, Svg } from "react-native-svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SettingActionType from "../../state/actions-type/setting.type";
import SettingUseCase from "../../use-case/setting.useCase";

const {height} = Dimensions.get("screen")

interface Props { 
    status : "error" | "success",
    message : string;
}

const NotFoundIcon = () =>{
    return (
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
         <Path d="M12 5.5H6.75C5.75544 5.5 4.80161 5.89509 4.09835 6.59835C3.39509 7.30161 3 8.25544 3 9.25V21.75C3 22.7446 3.39509 23.6984 4.09835 24.4017C4.80161 25.1049 5.75544 25.5 6.75 25.5H10.5V32.745L18.78 25.5H29.25C30.1314 25.4999 30.9845 25.1894 31.6598 24.623C32.335 24.0566 32.7891 23.2704 32.9425 22.4025C33.9157 21.6079 34.7762 20.6844 35.5 19.6575V21.75C35.5 22.5708 35.3383 23.3835 35.0242 24.1418C34.7102 24.9001 34.2498 25.5891 33.6694 26.1694C33.0891 26.7498 32.4001 27.2102 31.6418 27.5242C30.8835 27.8383 30.0708 28 29.25 28H19.72L12.0625 34.7C11.7082 35.0098 11.2721 35.2109 10.8065 35.2794C10.3409 35.3479 9.86541 35.2808 9.43691 35.0862C9.0084 34.8916 8.64501 34.5777 8.39019 34.182C8.13538 33.7863 7.99991 33.3256 8 32.855V28H6.75C5.0924 28 3.50269 27.3415 2.33058 26.1694C1.15848 24.9973 0.5 23.4076 0.5 21.75V9.25C0.5 7.5924 1.15848 6.00269 2.33058 4.83058C3.50269 3.65848 5.0924 3 6.75 3H13.6425C13.0058 3.77122 12.4551 4.6095 12 5.5ZM24.25 23C27.2337 23 30.0952 21.8147 32.205 19.705C34.3147 17.5952 35.5 14.7337 35.5 11.75C35.5 8.76631 34.3147 5.90483 32.205 3.79505C30.0952 1.68526 27.2337 0.5 24.25 0.5C21.2663 0.5 18.4048 1.68526 16.295 3.79505C14.1853 5.90483 13 8.76631 13 11.75C13 14.7337 14.1853 17.5952 16.295 19.705C18.4048 21.8147 21.2663 23 24.25 23ZM23 6.75C23 6.41848 23.1317 6.10054 23.3661 5.86612C23.6005 5.6317 23.9185 5.5 24.25 5.5C24.5815 5.5 24.8995 5.6317 25.1339 5.86612C25.3683 6.10054 25.5 6.41848 25.5 6.75V11.75C25.5 12.0815 25.3683 12.3995 25.1339 12.6339C24.8995 12.8683 24.5815 13 24.25 13C23.9185 13 23.6005 12.8683 23.3661 12.6339C23.1317 12.3995 23 12.0815 23 11.75V6.75ZM25.8125 16.75C25.8125 17.1644 25.6479 17.5618 25.3549 17.8549C25.0618 18.1479 24.6644 18.3125 24.25 18.3125C23.8356 18.3125 23.4382 18.1479 23.1451 17.8549C22.8521 17.5618 22.6875 17.1644 22.6875 16.75C22.6875 16.3356 22.8521 15.9382 23.1451 15.6451C23.4382 15.3521 23.8356 15.1875 24.25 15.1875C24.6644 15.1875 25.0618 15.3521 25.3549 15.6451C25.6479 15.9382 25.8125 16.3356 25.8125 16.75Z"
          fill="#dc3545"/>
        </Svg>
    )
}

const AlertPrimary = ({status, message}:Props) =>{
    const [marginTopAnim] = useState(new Animated.Value(-100));
    const {alert} = SettingUseCase();
    const dispatch = useDispatch();

    useEffect(()=>{
        Animated.timing(
            marginTopAnim,
            {
                toValue: 50, // Target marginTop value
                duration: 500, // Duration of animation (in milliseconds)
                useNativeDriver: false, // This is required when animating layout properties
            }
        ).start(); // Start the animation
        setTimeout(()=>{
            dispatch({
                type : SettingActionType.SET_ALERT,
                status : "error",
                isOpen : false,
                message : ""
            })
        },3000)
    },[alert.isOpen])


    return (
        <View style={{
            flexDirection : "row",
              justifyContent : "center",
              position : "absolute",
              width  :"100%",
            //   height : height,
              zIndex :100
        }}>
            <Animated.View style={{
                backgroundColor  :Colors.ResColor.white,
                width : "80%",
                // height : 150,
                marginTop : marginTopAnim,
                elevation : 3,
                padding : 15,
                borderRadius : 10,
                flexDirection  :"row",
                alignItems :"center"
            }}>
                {status == "success" &&
                <>
                <Image source={require("../../../assets/images/check_success.png")} 
                style={{
                    width : 24,
                    height :24,
                    objectFit : "fill",
                }}                
                />
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.blue,
                    paddingLeft : 10,
                }}>{message} </Text>
                </>
                }
                {status == "error" &&
                <>
                <NotFoundIcon/>
                <Text style={{
                    width : 200,
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.red,
                    paddingLeft : 10,
                }}>{message}</Text>
                </>}
            </Animated.View>
        </View>
    )
}

export default AlertPrimary;