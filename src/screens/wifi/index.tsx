import { useEffect, useState } from "react";
import { SafeAreaView,View , Text, Image, TouchableOpacity, Dimensions, Linking,ScrollView, Clipboard} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../components/colors/Colors";
import AuthActionType from "../../state/actions-type/auth.type";
import AuthUseCase from "../../use-case/auth.usecase";
import ModalPrimary from "./components/ModalPrimary";
import WifiManager, { WifiEntry } from "react-native-wifi-reborn";
import FontStyle from "../../types/FontTypes";
import LoadingKonekyu from "../onboarding/LoadingKonekyu";
import LoadingKonekyu2 from "../onboarding/loadingKonekyu2";
import { WifiIcon } from "../../components/icons/Icon";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import ModalConnection from "./components/ModalConnection";
import AdsenseBanner from "../../components/adsense/adsenseBanner";
import { DevSettings } from 'react-native';
const {height} = Dimensions.get("screen")
import DeviceInfo from 'react-native-device-info'; 
import {
    Appodeal,
    AppodealAdType,
    AppodealBanner,
    AppodealBannerEvent,
    AppodealGender,
    AppodealInterstitialEvent,
    AppodealLogLevel,
    AppodealRewardedEvent,
    AppodealSdkEvent
  } from 'react-native-appodeal';
import { BaseUrl, configWithJwt, configWithOpenGuest } from "../../../config/api";
import axios from "axios";
import appodeal from "react-native-appodeal/src/RNAppodeal";
import InputPrimary from "../../components/inputs/InputPrimary";
import ButtonLink from "../../components/buttons/ButtonLink";
import SettingUseCase from "../../use-case/setting.useCase";
import SettingActionType from "../../state/actions-type/setting.type";
import LocationUseCase from "../../use-case/location.usecase";
import { AlertEntities } from "../../state/setting-store/setting.store";
import AlertPrimary from "../../components/alert/AlertPrimary";
import LocationActionType from "../../state/actions-type/location.type";
import { initializeAppodeal } from "../../utils/appodealConfig";
import { Path, Svg } from "react-native-svg";
  
export const IconPaste = () =>{
    return (
        <Svg  width="24" height="24" viewBox="0 0 24 24">
            <Path fill="gray" d="M9 4h6v2H9zm11 7h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2"/>
            <Path fill="gray" d="M21 9V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v-9a2 2 0 0 1 2-2zM9 6V4h6v2z"/>
            </Svg>
    )
} 


const WifiScreen = () =>{
    const [status, setStatus] = useState<boolean>(false);
    const  {modal, authResult} = AuthUseCase();
    const [statusModal, setStatusModal] = useState<boolean>(false);
    const [connection, setConnection] = useState<boolean>(false);
    const [mac, setMac] = useState<string>("");
    const {isLoading, alert} = SettingUseCase();
    const [wifiList, setWifiList] = useState<Array<WifiEntry> | []>([])
    const [wifiSSID, setWIFISSID] = useState<string>('');
    const [valIn, setValIn] =  useState<boolean>(true);
    const [valOn, setValOn] =  useState<boolean>(false);
    const [voucherVal, setVoucherVal] = useState<string>("");
    const dispatch =  useDispatch();
    const {popData, getConnection} = LocationUseCase();


    const handleFail = async () =>{
        await dispatch({
            type : SettingActionType.SET_LOADING,
            payload : false,
        })
        await dispatch({
            type : SettingActionType.SET_ALERT,
            isOpen : true,
            status : "error",
            message : "gagal memuat iklan!"
        }) 
    }

    const OpenAdsense = async () =>{
        setStatusModal(false);
        try{
            if(popData.connect){
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : true,
                })
                const linloginTrial = `${BaseUrl.baseProd}/member/connect-internet-open/trial`;
                console.log('running on')
                const loginTrial = await axios.post(linloginTrial,{
                    "mac" : mac,
                    "pop_id" : popData.popId
                },configWithOpenGuest);
                await axios.get(loginTrial.data.redirect)
                

                const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/status.html`);
                // console.log("check status ", checkStatus);
                if(checkStatus.status == 200){
                    
                    const checkInitial = Appodeal.isInitialized(AppodealAdType.INTERSTITIAL);        
                    if(checkInitial){
                        const loadedAds = Appodeal.isLoaded(AppodealAdType.INTERSTITIAL)                        
                        if(loadedAds){
                               Appodeal.show(AppodealAdType.INTERSTITIAL);
                            appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>handleInterstitialClosed());
                        }else{
                            Appodeal.show(AppodealAdType.REWARDED_VIDEO);
                            appodeal.addEventListener(AppodealRewardedEvent.CLOSED, () =>handleInterstitialClosed());
                        }
                    }
                }
         
                appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
                    handleFail()
                );
                 appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
                    handleInterstitialClosed()
                );
        
                appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
                    handleInterstitialClosed()
                );

                
                appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
                    handleFail()
            );
            appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
                handleFail()
                );
             }else{
                dispatch({
                    type : AuthActionType.MODAL_ALERT,
                    modal : true
                })
             }
        }catch(err){
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "error",
                message : "connect internet failed!"
            }) 
        }
        
    }


    const PasteButton =async () =>{
            const text = await Clipboard.getString();
            setVoucherVal(text);
    }
    
 
    const handleConnect = async () =>{ 
        try {
            const response = await axios.post(`${BaseUrl.baseProd}/member/connect-internet-open?pop_id=${popData.popId}`,{
                'voucher_code' : null
            } ,configWithOpenGuest);
            if(response.status == 200){
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
                await axios.get(`${BaseUrl.baseHotspot}/logout`);  
               const connect = await axios.get(response.data.redirect);
               if(connect.status == 200){
                if(!statusModal){
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen : true,
                        status : "success",
                        message : "Selamat kamu sudah terkoneksi dengan Konekyu!"
                    })
                    setStatusModal(true); 
                }
               } 
            }
                } catch (error :any) {
                    if (error.response) {
            // Server responded with a status other than 200 range
            console.log('Response error:', error.response.status, error.response.data);
            } else if (error.request) {
            // No response was received from the server
            console.log('Request error:', error.request);
            } else {
            // An error occurred in setting up the request
            console.log('Error', error.message);
            }
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
            })
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "error",
                message : "connect internet gagal!"
            }) 
            // setTimeout(()=>{
            //     DevSettings.reload();
            // },5000);
            // console.log(error);
        }
    }
    const handleInterstitialClosed = () => {
            handleConnect();
    };


    const checkConnection =  async() =>{
        try {
            const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/status.html`);
            if(checkStatus.status == 200){
                setStatus(true)
            }
        } catch (error) {
            setStatus(false);
            // await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
        }       
    }


    const logoutConnect = async () =>{
        try {
            const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
            if(checkStatus.status == 200){
                // setStatus(false)
                console.log(checkStatus);
            }
        } catch (error) {
            setStatus(false);
            // await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
        }    
    }


   

    const handleConnectVoucher = async () =>{
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true
        })
        
        try {
            const config = await configWithJwt();
            const response = await axios.post(`${BaseUrl.baseProd}/member/connect-internet?pop_id=${popData.popId}`,{
                'voucher_code' : voucherVal
            } ,config);
            if(response.status == 200){
                Linking.openURL(response.data.redirect)
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
                dispatch({
                    type : LocationActionType.VAL_VOUCHER,
                    payload : voucherVal
                })
            }else{
                const alertData:AlertEntities = {
                    isOpen : true,
                    status : "error",
                    message : response.data.message.voucher_code[0]
                }
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen : true,
                    status : "error",
                    message : response.data.message.voucher_code[0]
                }) 
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
            }
        } catch (error:any) {
            console.log(error)
             dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
            })
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "error",
                message : "Voucher gagal!"
            }) 
           
        }
    }


    useEffect(()=>{
        initializeAppodeal()
        DeviceInfo.getAndroidId().then((mac) => {
            setMac(mac);
          }).catch((err)=>console.log("get mac error ", err));
       
        const interval = setInterval(()=>{
          checkConnection();
          getConnection()
        },5000);
    
        return ()=> clearInterval(interval);
      },[]);

  

    useEffect(() => {
            // initializeAppodeal();
            // WifiManager.setEnabled(true);

            WifiManager.loadWifiList().then(
                result =>{
                    setWifiList(result)
                },
                ()=>{
                    console.log("Cannto get List wifi")
                }
            )
            WifiManager.getCurrentWifiSSID().then(
                ssid => {
                setWIFISSID(ssid);
                dispatch({
                    type: AuthActionType.MODAL_ALERT,
                    modal: false,
                     });
                },
                () => {
                setWIFISSID("")
                dispatch({
                type: AuthActionType.MODAL_ALERT,
                modal: true,
                 });
              }
            );
      }, []); 

      const conditionWif = async ()=>{
        return WifiManager.isEnabled();
      }
      useEffect(()=>{
        WifiManager.getCurrentWifiSSID().then(
            ssid => {
            setWIFISSID(ssid);
          
            },
            () => {
            setWIFISSID("")
         
          }
        );
      },[conditionWif])
     

    return(
        <SafeAreaView style={{
            height : "100%",
            backgroundColor  :Colors.ResColor.white,
        }}>
            <ScrollView>
            <View  style={{
                    paddingTop : 50,
                    marginBottom  :0,
                    flexDirection :"row",
                    justifyContent : "center",
                    backgroundColor : Colors.ResColor.blue,
                    height : height / 4,
                    borderBottomLeftRadius : 100, 
                    borderBottomRightRadius : 100, 
                    elevation : 3,
                }}>
                    <View style={{
                        position :"absolute",
                        left : -100,
                        top : -100,
                        borderWidth : 30,
                        borderColor : "#0081FA",
                        width: 200,
                        height: 200,
                        borderRadius : 100,

                    }}/>
                    <View style={{
                        position :"absolute",
                        right : -100,
                        top : -150,
                        borderWidth : 30,
                        borderColor : "#0081FA",
                        width: 200,
                        height: 200,
                        borderRadius : 100,

                    }}/>
                    <View style={{
                        borderRadius : 100,
                        height : 110,
                        backgroundColor  :Colors.ResColor.white,
                    }}>
                    <LoadingKonekyu2 />
                    </View>
                </View>
                <View style={{
                    marginBottom : 50,
                }}>
             
            <View style={{
                padding : 15,
                marginTop : 0,
            }}>
                
                <View style={{
                    backgroundColor  :Colors.ResColor.blue,
                    padding : 10,
                    borderRadius : 10,
                    elevation : 3,
                    marginTop : 20,
                    borderTopColor : Colors.ResColor.white,
                    borderTopWidth : 2,
                }}>
                    <View style={{
                            flexDirection  :"row",
                            justifyContent : "space-between",
                            alignItems : "center",
                    }}>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.BOLD,
                        fontSize : 14,
                    }}>{popData.connect ? 'Terhubung ' : "Belum Terhubung "}  </Text>
                    <Text style={{color : Colors.ResColor.yellow, fontSize : 18, fontFamily : FontStyle.BOLD}}>
                        <WifiIcon size={18} color={Colors.ResColor.white}/> {wifiSSID}</Text>
                    </View>
                    <View style={{
                        backgroundColor  :"#0365BE",
                        padding : 15,
                        borderRadius : 10,
                    }}>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        width : "80%",
                    }}>
                        Ikuti instruksi untuk terhubung jaringan KonekYu:
                    </Text>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        paddingLeft : 5,

                    }}>
                        1. Klik cari jaringan KonekYu 
                    </Text>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        paddingLeft : 5,
                    }}>
                        2 .Hubungkan dengan jaringan KonekYu
                    </Text>
                    </View>
                    <TouchableOpacity
                    onPress={async () => {
                        WifiManager.setEnabled(true);
                    }}
                    style={{
                        backgroundColor  : Colors.ResColor.yellow,
                        borderRadius : 10,
                        padding : 5,
                        elevation : 3,
                        marginTop : 15,
                        marginBottom : 10,
                        height : 50,
                        flexDirection  :"row",
                        alignItems  :"center",
                        justifyContent : "center",
                    }}>
                        <Text style={{
                            fontFamily : FontStyle.BOLD,
                            color : Colors.ResColor.white,
                        }}>Cari Jaringan Konekyu {">"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                width : "100%",
                padding : 15,
                backgroundColor  :Colors.ResColor.white,
                elevation : 3,
                borderRadius : 10,
            }}>
                <View style={{
                    flexDirection  :"row",
                    width  :"100%",
                    justifyContent : "space-between",
                    borderWidth : 1,
                    borderColor : Colors.ResColor.blue,
                    borderRadius : 12,
                }}>
            <TouchableOpacity 
                disabled={!popData}
                onPress={()=>{
                        setValIn(true)
                }}
                style={{
                    backgroundColor  :valIn ? Colors.ResColor.blue :Colors.ResColor.white,
                    padding : 15,
                    width : "50%",
                    borderRadius : 12,
                    flexDirection  :"row",
                    justifyContent : "center",
                }}
               >
                    <Text style={{
                        fontFamily : FontStyle.BOLD,
                        color : valIn ? Colors.ResColor.white : Colors.ResColor.black,
                        borderRadius : 10,
                    }}>Internet Gratis</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    setValIn(false)
                }}
                style={{
                    width : "50%",
                    flexDirection  :"row",
                    justifyContent : "center",
                    backgroundColor  :!valIn ? Colors.ResColor.blue :Colors.ResColor.white,
                    padding : 15,
                    borderRadius : 10,
                }}
                >
                    <Text style={{
                        fontFamily : FontStyle.BOLD,
                        color : !valIn ? Colors.ResColor.white : Colors.ResColor.black,

                    }}>Voucher</Text>
                </TouchableOpacity>
                </View>
                {valIn ? 
                <View style={{
                    marginTop : 20,
                }}>
                <View style={{
                    flexDirection  :"row",
                    marginBottom : 15,
                }}>
                <View style={{
                    width : 35,
                    height : 35,
                    borderRadius  :5,
                    elevation :3,
                    flexDirection :"row",
                    alignItems  :"center",
                    justifyContent : "center",
                    backgroundColor : Colors.ResColor.blue,
                }}>
                    <Text style={{
                         fontFamily : FontStyle.BOLD,
                         color : Colors.ResColor.white,
                         fontSize : 12,
                    }}>FREE</Text>
                </View>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.black,
                    marginBottom : 15,
                    fontSize : 16,
                    paddingLeft : 10,
                    paddingTop : 3,
                }}>Sambungkan Internet gratis!</Text>
                </View>
                <TouchableOpacity 
                style={{
                    backgroundColor  :Colors.ResColor.blue,
                    padding : 15,
                    flexDirection  :"row",
                    justifyContent :"center",
                    borderRadius : 10,
                }}
                onPress={()=>status ? logoutConnect(): OpenAdsense() }>
                    <Text style={{
                        fontFamily : FontStyle.BOLD,
                        color : Colors.ResColor.white,
                    }}>{status ? "Terhubung" : "Hubungkan"}</Text>
                </TouchableOpacity>
            </View> :
             <View style={{
                marginTop : 20,
            }}>
                <View style={{
                    flexDirection  :"row",
                    justifyContent  :"space-between",
                    alignItems : "center",
                }}>
            <Text style={{
                fontFamily : FontStyle.BOLD,
                color : Colors.ResColor.black,
                marginBottom : 15,
                fontSize : 18,
                paddingTop : 10,
            }}>Punya Voucher ?</Text>
            <ButtonLink label={"Voucherku"} onPress={()=>navigate(ScreenActionType.VOUCHER)} textColor={Colors.ResColor.blue} disable={false} size={14} style={undefined} />
            </View>
            <View style={{
                marginBottom  :15,
            }}>
            <InputPrimary label={undefined} type={"visible-password"}
            onPresPaste={PasteButton}
            value={voucherVal}
            passwordIcon={false} paste={true} onChange={(val:string)=>setVoucherVal(val)} placeholder={"Masukan kode voucher"} />
            </View>
            <TouchableOpacity 
            disabled={voucherVal == ""}
            style={{
                backgroundColor  :voucherVal !== "" ?  Colors.ResColor.blue : Colors.ResColor.gray,
                padding : 15,
                flexDirection  :"row",
                justifyContent :"center",
                borderRadius : 10,
            }}
            onPress={()=>{
                if(popData.connect && voucherVal !== ""){
                    handleConnectVoucher();
                 }else{
                     dispatch({
                         type : AuthActionType.MODAL_ALERT,
                         modal : true
                     })
                 }
            }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.white,
                }}>{popData.connect ? "Terhubung" : "Hubungkan"}</Text>
            </TouchableOpacity>
        </View>
            }
            </View>
           
            {/* <AppodealBanner
             onAdLoaded = {() => console.log("Banner view did load")}
             onAdExpired = {() => console.log("Banner view expired")}
             onAdClicked = {() => console.log("Banner view is clicked")}
             onAdFailedToLoad = {() => console.log("Banner view is failed to load")}
            style = {{
                height: 50,
                width: '100%',
                
                backgroundColor: "transparent",
                alignContent: 'stretch',
            }}
            adSize = 'phone'
            usesSmartSizing // (iOS specific) on Android smart banners are enabled by default.
        /> */}
        </View>
        </ScrollView>
            <ModalPrimary  modalVisible={modal} />
            {alert.isOpen &&
             <AlertPrimary status={alert.status} message={alert.message}/> }     
        </SafeAreaView>
    )
}

export default WifiScreen;