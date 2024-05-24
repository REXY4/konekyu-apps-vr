import { useEffect, useState } from "react";
import { SafeAreaView,View , Text, Image, TouchableOpacity, Dimensions, Linking,ScrollView} from "react-native";
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
import { BaseUrl, configWithJwt } from "../../../config/api";
import axios from "axios";
import appodeal from "react-native-appodeal/src/RNAppodeal";
import InputPrimary from "../../components/inputs/InputPrimary";
import ButtonLink from "../../components/buttons/ButtonLink";
import LoadingPage from "../onboarding/LoadingPage";
import SettingUseCase from "../../use-case/setting.useCase";
import SettingActionType from "../../state/actions-type/setting.type";
import LocationUseCase from "../../use-case/location.usecase";
import { AlertEntities } from "../../state/setting-store/setting.store";
import AlertPrimary from "../../components/alert/AlertPrimary";
import LocationActionType from "../../state/actions-type/location.type";
  
  const tokenAdsense=  {
    android : "a83e11e2d2c38c1262c56578aba658ff3c1160bdd24c2f4a"
  }

  const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER;
Appodeal.initialize(tokenAdsense.android, adTypes)



Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event: any) =>
    console.log("Interstitial loaded. Precache: ", event.isPrecache)
);
Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => 
    console.log("Interstitial shown")
);
Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
    console.log("Interstitial expired")
);
Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
    console.log("Interstitial was clicked")
);

Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
    console.log("Interstitial failed to load")
);
Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
    console.log("Interstitial failed to show")
);



    
const WifiScreen = () =>{
    const  {modal, authResult} = AuthUseCase();
    const [connection, setConnection] = useState<boolean>(false);
    const {isLoading, alert} = SettingUseCase();
    const [wifiList, setWifiList] = useState<Array<WifiEntry> | []>([])
    const [wifiSSID, setWIFISSID] = useState<string>('');
    const [valIn, setValIn] =  useState<boolean>(true);
    const [valOn, setValOn] =  useState<boolean>(false);
    const [voucherVal, setVoucherVal] = useState<string>("");
    const dispatch =  useDispatch();
    const {popData} = LocationUseCase();

    const OpenAdsense = () =>{
    //     if(popData.connect){

    //     Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () =>console.log("init main"));

    //     Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => 
    //     console.log("Interstitial shown")
    // );
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true
        })
        Appodeal.setUserId(String(authResult?.id))
        Appodeal.setCustomStateValue(17, 'appodeal_user_age');
        Appodeal.setCustomStateValue(25, 'levels_played');
        Appodeal.setCustomStateValue(10, 'user_rank');
        Appodeal.setCustomStateValue(true, 'paid');
        Appodeal.setExtrasValue("some value", 'attribuition_id');
        Appodeal.show(AppodealAdType.BANNER_TOP)
         Appodeal.show(AppodealAdType.INTERSTITIAL, 'your_placement')
         Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, handleInterstitialClosed);
    //  }else{
    //     dispatch({
    //         type : AuthActionType.MODAL_ALERT,
    //         modal : true
    //     })
    //  }
    }
    
 
    const handleConnect = async () =>{       
        try {
            const config = await configWithJwt();
            const response = await axios.post(`${BaseUrl.baseProd}/member/connect-internet?pop_id=${popData.popId}`,{
                'voucher_code' : null
            } ,config);
            if(response.status == 200){
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
                Linking.openURL(response.data.redirect)
            }
        } catch (error) {
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
            })
            setTimeout(()=>{
                DevSettings.reload();
            },5000);
            console.log(error);
        }
    }
    const handleInterstitialClosed = () => {
            handleConnect();
    };
    
   

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
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "error",
                message : error.response.data.message.voucher_code[0]
            }) 
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
            })
        }
    }

  

    useEffect(() => {
            WifiManager.setEnabled(true);
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
                <View style={{
                    marginBottom : 50,
                }}>
            <View style={{
                backgroundColor :Colors.ResColor.blue,
                position : "absolute",
                height : height / 3,
                width : "100%",
                borderBottomEndRadius : 200,
                borderBottomStartRadius : 100,
            }}/>
            <View style={{
                padding : 15,
                marginTop : 20,
            }}>
                <View style={{
                    flexDirection :"row",
                    justifyContent : "center",
                }}>
                    <View style={{
                        borderRadius : 1000,
                        backgroundColor  :Colors.ResColor.white,
                    }}>
                    <LoadingKonekyu2 />
                    </View>
                </View>
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
                    }}>{popData.connect ? 'Terhubung {">>"}' : "Bukan Koneksi Konekyu >>"}  </Text>
                    <Text style={{color : Colors.ResColor.yellow, fontSize : 18, fontFamily : FontStyle.BOLD}}>
                        <WifiIcon size={18} color={Colors.ResColor.white}/> {wifiSSID}</Text>
                    </View>
                    <View style={{
                        backgroundColor  :Colors.ResColor.darkBlue,
                        padding : 10,
                        borderRadius : 10,
                    }}>
                    <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                    }}>Pastikan terhubung ke jaringan koneksi konekyu sebelum menggunakan feature internet gratis dan voucher!</Text>
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
                    justifyContent : "space-between"
                }}>
            <TouchableOpacity 
                disabled={!popData}
                onPress={()=>{
                        setValIn(true)
                }}
                style={{
                    backgroundColor  :valIn ? Colors.ResColor.yellow :Colors.ResColor.gray,
                    padding : 15,
                    width : "45%",
                    borderRadius : 10,
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
                    width : "45%",
                    flexDirection  :"row",
                    justifyContent : "center",
                    backgroundColor  :!valIn ? Colors.ResColor.yellow :Colors.ResColor.gray,
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
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.black,
                    marginBottom : 15,
                    fontSize : 18,
                }}>Sambungkan Internet gratis!</Text>
                <TouchableOpacity 
                style={{
                    backgroundColor  :Colors.ResColor.blue,
                    padding : 15,
                    flexDirection  :"row",
                    justifyContent :"center",
                    borderRadius : 10,
                }}
                onPress={OpenAdsense}>
                    <Text style={{
                        fontFamily : FontStyle.BOLD,
                        color : Colors.ResColor.white,
                    }}>{popData.connect ? "Terhubung" : "Sambungkan"}</Text>
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
            <InputPrimary label={undefined} type={"ascii-capable"} passwordIcon={false} onChange={(val:string)=>setVoucherVal(val)} placeholder={"Masukan kode voucher"} />
            </View>
            <TouchableOpacity 
            style={{
                backgroundColor  :voucherVal !== "" ?  Colors.ResColor.blue : Colors.ResColor.gray,
                padding : 15,
                flexDirection  :"row",
                justifyContent :"center",
                borderRadius : 10,
            }}
            onPress={()=>{
                // if(popData.connect && voucherVal !== ""){
                    handleConnectVoucher();
                // }else{
                //     dispatch({
                //         type : AuthActionType.MODAL_ALERT,
                //         modal : true
                //     })
                // }
            }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.white,
                }}>{popData.connect ? "Terhubung" : "Sambungkan"}</Text>
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