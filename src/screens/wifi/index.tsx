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
import DeviceInfo,{getAndroidIdSync, getIpAddress, getIpAddressSync} from 'react-native-device-info'; 
import {
    Appodeal,
    AppodealAdType,
    AppodealInterstitialEvent,
    AppodealRewardedEvent,
  } from 'react-native-appodeal';
import { BaseUrl, configHeaderPrimary, configWithJwt, configWithOpenGuest } from "../../../config/api";
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
import { G, Path, Rect, Svg, ClipPath, Defs, err } from "react-native-svg";
import VoucherDash from "../home/components/Voucher";
import { GetMemberLocation } from "../../entities/location.entities";
import { TabBarIconVoucher } from "../../components/icons/TabBarIcon";
import Countdown from "../../components/timeCoundown";
import { TimeLeftEntity } from "../voucher/components/VoucherAktif";
import GetLocation from "react-native-get-location";
import socket from "../../helpers/socket";


export const IconPaste = () =>{
    return (
        <Svg  width="24" height="24" viewBox="0 0 24 24">
            <Path fill="gray" d="M9 4h6v2H9zm11 7h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2"/>
            <Path fill="gray" d="M21 9V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v-9a2 2 0 0 1 2-2zM9 6V4h6v2z"/>
            </Svg>
    )
} 

export const WifiNotIcon = ({size}:{size:number}) =>{
    return (
        <Svg width={size} height={size} viewBox="0 0 20 21" fill="none" >
        <G clip-path="url(#clip0_2851_2398)">
        <Path d="M10 18.3571C9.41667 18.3571 8.92361 18.1557 8.52083 17.7529C8.11806 17.3502 7.91667 16.8571 7.91667 16.2738C7.91667 15.6904 8.11806 15.1974 8.52083 14.7946C8.92361 14.3918 9.41667 14.1904 10 14.1904C10.5833 14.1904 11.0764 14.3918 11.4792 14.7946C11.8819 15.1974 12.0833 15.6904 12.0833 16.2738C12.0833 16.8571 11.8819 17.3502 11.4792 17.7529C11.0764 18.1557 10.5833 18.3571 10 18.3571ZM5.29167 13.6488L3.54167 11.8571C4.36111 11.0377 5.32306 10.3885 6.4275 9.9096C7.53194 9.43071 8.72278 9.19099 10 9.19043C11.2772 9.18987 12.4683 9.43293 13.5733 9.9196C14.6783 10.4063 15.64 11.066 16.4583 11.8988L14.7083 13.6488C14.0972 13.0377 13.3889 12.5585 12.5833 12.2113C11.7778 11.864 10.9167 11.6904 10 11.6904C9.08333 11.6904 8.22222 11.864 7.41667 12.2113C6.61111 12.5585 5.90278 13.0377 5.29167 13.6488ZM1.75 10.1071L0 8.3571C1.27778 7.05154 2.77083 6.03071 4.47917 5.2946C6.1875 4.55849 8.02778 4.19043 10 4.19043C11.9722 4.19043 13.8125 4.55849 15.5208 5.2946C17.2292 6.03071 18.7222 7.05154 20 8.3571L18.25 10.1071C17.1806 9.03765 15.9411 8.20099 14.5317 7.5971C13.1222 6.99321 11.6117 6.69099 10 6.69043C8.38833 6.68987 6.87806 6.9921 5.46917 7.5971C4.06028 8.2021 2.82056 9.03876 1.75 10.1071Z" fill="white"/>
        <Path d="M0.292919 2.56483C0.110761 2.37623 0.00996641 2.12362 0.0122448 1.86143C0.0145233 1.59923 0.119692 1.34842 0.3051 1.16301C0.490508 0.977602 0.741321 0.872433 1.00352 0.870155C1.26571 0.867877 1.51832 0.968671 1.70692 1.15083L17.7069 17.1508C17.8891 17.3394 17.9899 17.592 17.9876 17.8542C17.9853 18.1164 17.8801 18.3672 17.6947 18.5526C17.5093 18.7381 17.2585 18.8432 16.9963 18.8455C16.7341 18.8478 16.4815 18.747 16.2929 18.5648L0.292919 2.56483Z" fill="#FF6B6B"/>
        </G>
        <Defs>
        <ClipPath id="clip0_2851_2398">
        <Rect width={size} height={size} fill="white" transform="translate(0 0.857422)"/>
        </ClipPath>
        </Defs>
        </Svg>

    )
}

export function FormatTime(seconds:number) {
    // Menghitung jam, menit, dan detik
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;

    // Format untuk menambahkan leading zero jika diperlukan
    var formattedTime = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (secs < 10 ? '0' : '') + secs;

    return formattedTime;
}

export const IconOff = ({size, color}:any)=>{
    return(
        <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" >
<Path d="M15.7991 14.0736C17.112 12.7601 17.8495 10.9789 17.8495 9.12165C17.8495 7.26443 17.112 5.48323 15.7991 4.16965C15.149 3.51956 14.3773 3.00388 13.528 2.65205C12.6787 2.30022 11.7684 2.11914 10.8491 2.11914C9.92975 2.11914 9.01944 2.30022 8.17012 2.65205C7.32079 3.00388 6.54909 3.51956 5.89907 4.16965C4.58616 5.48323 3.84863 7.26443 3.84863 9.12165C3.84863 10.9789 4.58616 12.7601 5.89907 14.0736L7.42007 15.5726L9.46307 17.5576L9.59607 17.6756C10.3711 18.3036 11.5061 18.2636 12.2361 17.5576L14.6711 15.1876L15.7991 14.0736ZM10.8491 12.1186C10.0534 12.1186 9.29036 11.8026 8.72775 11.24C8.16514 10.6774 7.84907 9.9143 7.84907 9.11865C7.84907 8.323 8.16514 7.55993 8.72775 6.99733C9.29036 6.43472 10.0534 6.11865 10.8491 6.11865C11.6447 6.11865 12.4078 6.43472 12.9704 6.99733C13.533 7.55993 13.8491 8.323 13.8491 9.11865C13.8491 9.9143 13.533 10.6774 12.9704 11.24C12.4078 11.8026 11.6447 12.1186 10.8491 12.1186Z" fill="#0074E1"/>
</Svg>

    )
}




const WifiScreen = () =>{
    const [status, setStatus] = useState<boolean>(false);
    const  {modal, authResult, isLogin} = AuthUseCase();
    const [statusModal, setStatusModal] = useState<boolean>(false);
    const [connection, setConnection] = useState<boolean>(false);
    const [mac, setMac] = useState<string>("");
const [timeLeft, setTimeLeft] = useState<TimeLeftEntity| null>(null)
const [locationRekomendasi, setLocationRekomendasi] = useState<Array<GetMemberLocation> | null>(null)
const [myLocation, setMyLocation] = useState<any|null>(null)
const {isLoading, alert} = SettingUseCase();
const [wifiList, setWifiList] = useState<Array<WifiEntry> | []>([])
const [wifiSSID, setWIFISSID] = useState<string>('');
const [valIn, setValIn] =  useState<boolean>(true);
const [valOn, setValOn] =  useState<boolean>(false);
const [voucherVal, setVoucherVal] = useState<string>("");
const dispatch =  useDispatch();
const {popData, getConnection, connectData, conVoucher, GetLocationMember, locationData} = LocationUseCase();
const [showYoutube, setShowYoutube] = useState<boolean>(false);
const [loadingButton, setLoadingButton ] = useState<boolean>(false);



const handleGetLocation =async ()=>{
    await  GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 6000,
    })
    .then(location => {
      setMyLocation(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
 }

const handleGetDistanceLocation = async () =>{
    try {
     const response = await axios.get(`${BaseUrl.baseProd}/member/pop-news/range/${myLocation.latitude}/${myLocation.longitude}`, configWithOpenGuest);
   
     if(response.status == 200){
       setLocationRekomendasi(response.data.clients);
     }
    } catch (error) {
     console.log("get distance ",error);
    }
  }


  useEffect(()=>{
        handleGetLocation()
        handleGetDistanceLocation()
    return()=>{
        handleGetLocation()
        handleGetDistanceLocation()
    }
  },[])


    const ConnectWifi = async () =>{
       
        const check =  wifiList.filter(fil=>fil.SSID === "#KonekYu_gratis");
        if(check[0] !== undefined){
            WifiManager.connectToProtectedSSID(
                 check[0].SSID,
                  null,
                false,
                false
            ).then(
                 (result)=>{
                    setWIFISSID("#KonekYu_gratis");
                    socket.emit("check-connect","")
                    const handleData:any = async () =>{
                        const response5 = await axios.get(`${BaseUrl.baseHotspot}/status.html`, configHeaderPrimary);
                        const regex = /rizk_connect/;
                        const match = response5.data.match(regex);
                        return match
                    }
                    const getCondition = handleData();
                    if(getCondition){
                        dispatch({
                            type : SettingActionType.SET_ALERT,
                            isOpen : true,
                            status : "success",
                            message : "Silahkan Hubungkan dengan Internet Gratis Atau Menggunakan Voucher!"
                        })                         
                    }else{
                        dispatch({
                            type : SettingActionType.SET_ALERT,
                            isOpen : true,
                            status : "error",
                            message : "Jaringan tidak Tervalidasi!"
                        }) 
                    }

                   
                },
                ()=>{
                    console.log("fail to connect ")
                }
            ); 
        }else{
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "error",
                message : "Jaringan tidak Ditemukan!"
            }) 
        }
         
    }
    



    const getParameterByName = (name:string, url:string) => {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`, 'i');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      };

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
        Appodeal.show(AppodealAdType.INTERSTITIAL);
        try{
            if(popData.connect && !connectData){
                setLoadingButton(true);
                dispatch({
                    type : SettingActionType.SET_LOADING,
                payload : true,
                }) 
                dispatch({
                    type : LocationActionType.CON_VOUCHER,
                    val : "",
                    condition : false
                   })
                let status = 0;
                if(!loadingButton){
                let response2:any ;   
                const linloginTrial = `${BaseUrl.baseProd}/member/connect-internet-open/trial`;
                const loginTrial = await axios.post(linloginTrial,{
                    "mac" : mac,
                    "pop_id" : popData.popId
                },configWithOpenGuest);
                     status = (await axios.get(loginTrial.data.redirect)).status;
                }else{
                    status = 200;
                }
                if(status == 200){
                        const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/status.html`);
                        const checkInitial = Appodeal.isInitialized(AppodealAdType.INTERSTITIAL);
                        if(checkInitial){       
                            const loadedAds = Appodeal.isLoaded(AppodealAdType.INTERSTITIAL)
                            const loadedVideos = Appodeal.isLoaded(AppodealAdType.REWARDED_VIDEO)
                            const canShowInters = Appodeal.canShow(AppodealAdType.INTERSTITIAL);
                            const canShowVideo = Appodeal.canShow(AppodealAdType.REWARDED_VIDEO);
                            if(loadedAds || loadedVideos){
                                setLoadingButton(false)
                                const logoutUrl = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
                                if(canShowInters){
                                    setStatusModal(false);
                                     await axios.post(logoutUrl,{
                                        "mac" : mac,
                                        "pop_id" : popData.popId
                                    },configWithOpenGuest);
                                    
                                    Appodeal.show(AppodealAdType.INTERSTITIAL);
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>handleInterstitialClosed());
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
                                        handleInterstitialClosed()
                                    );
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
                                        handleInterstitialClosed()
                                    );
                                }else if(canShowVideo){
                                  
                                    Appodeal.show(AppodealAdType.REWARDED_VIDEO);
                                    appodeal.addEventListener(AppodealRewardedEvent.CLOSED, () =>handleInterstitialClosed());
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
                                        handleInterstitialClosed()
                                    );
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
                                        handleInterstitialClosed()
                                    );
                                }
                               
                            }else{
                                
                            const canShowInters2 = Appodeal.canShow(AppodealAdType.INTERSTITIAL);
                            const canShowVideo2 = Appodeal.canShow(AppodealAdType.REWARDED_VIDEO);
                                if(canShowInters2){
                                    setLoadingButton(false)
                                    setStatusModal(false);
                                    Appodeal.show(AppodealAdType.INTERSTITIAL);
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>handleInterstitialClosed());
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
                                        handleInterstitialClosed()
                                    );
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
                                        handleInterstitialClosed()
                                    );
                                }else if(canShowVideo2){
                                    setLoadingButton(false)
                                    Appodeal.show(AppodealAdType.REWARDED_VIDEO);
                                    appodeal.addEventListener(AppodealRewardedEvent.CLOSED, () =>handleInterstitialClosed());
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
                                        handleInterstitialClosed()
                                    );
                                    appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
                                        handleInterstitialClosed()
                                    );
                                }
                            }
                        }
                }
            //     appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
            //         handleFail()
            //     );
               
            //     appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
            //         handleFail()
            // );
            // appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
            //     handleFail()
            //     );
             }else{
                if(!connectData){
                    dispatch({
                        type : AuthActionType.MODAL_ALERT,
                        modal : true
                    })
                }
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

    useEffect(()=>{
        let interval:any;
        if(loadingButton){
            interval = setInterval(() => {
                OpenAdsense();
              }, 5000);
        }else{
            setTimeout(()=>{
                dispatch({
                    type : SettingActionType.SET_LOADING,
                  payload : false,
              })  
        },10000);
        }
        return () => {
            if (interval) {
              clearInterval(interval);
            }
          };
    },[isLoading])

    useEffect(()=>{
        setTimeout(()=>{
            dispatch({
                type : SettingActionType.SET_LOADING,
              payload : false,
          })  
    },50000);
    },[isLoading])


    const PasteButton =async () =>{
            const text = await Clipboard.getString();
            setVoucherVal(text);
    }

    

    const handleConnect = async () =>{ 
        setLoadingButton(false)
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true
        })
        try {
            const logoutUrl = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
            setLoadingButton(false)

            await axios.post(logoutUrl,{
                "mac" : mac,
                "pop_id" : popData.popId
            },configWithOpenGuest);
            const getIp = await getIpAddress();
            await axios.post(logoutUrl,{
                "mac" : getIp,
                "pop_id" : popData.popId
            },configWithOpenGuest);
            
            const response = await axios.post(`${BaseUrl.baseProd}/member/connect-internet-open?pop_id=${popData.popId}`,{
                'voucher_code' : null
            } ,configWithOpenGuest);

            if(response.status == 200){
                await axios.get(`${BaseUrl.baseHotspot}/logout`);
                let username = getParameterByName("username",response.data.redirect);
                setMac(username??"");

               const connect = await axios.get(response.data.redirect);
               if(connect.status == 200){
                if(!connectData){
                    appodeal.removeAllListeners();
                    setStatusModal(true);
                    dispatch({
                        type : SettingActionType.SET_LOADING,
                        payload : false
                    }) 
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen : true,
                        status : "success",
                        message : "Selamat kamu sudah terkoneksi dengan Konekyu!"
                    })
                    dispatch({
                        type : LocationActionType.CON,
                        payload : true
                    })
                   
                }
               } 
            }
                } catch (error :any) {
          
            dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
            })
            dispatch({
                type : LocationActionType.CON,
                payload : false
            })
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "error",
                message : "connect internet gagal!"
            }) 
        }
    }
    const handleInterstitialClosed = () => {
        if(!status){
            handleConnect();
        }
    };



    const logoutConnect = async (voc:boolean | undefined) =>{
        try {
            dispatch({
                type : SettingActionType.SET_LOADING,
            payload : true,
            })
            const linloginTrial = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
            const loginTrial = await axios.post(linloginTrial,{
                "mac" : voc ? voucherVal : mac,
                "pop_id" : popData.popId
            },configWithOpenGuest);
            
            if(loginTrial.status == 200){
                const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
                setStatusModal(false);
                dispatch({
                    type : LocationActionType.CON,
                    payload : false,
                });
                dispatch({
                    type : LocationActionType.CON_VOUCHER,
                    val : "",
                    condition : false,
                    time : 0,
                    currentTime : 0,
                   })
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen : true,
                    status : "success",
                    message : "Koneksi telah di matikan!"
                }) 
                dispatch({
                    type : SettingActionType.SET_LOADING,
                payload : false,
                }) 
            }
       
        } catch (error) {
            dispatch({
                type : LocationActionType.CON_VOUCHER,
                val : "",
                condition : false,
                time : 0,
                currentTime : 0,
               })
            setStatus(false);
            const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
            setStatusModal(false);
            dispatch({
                type : LocationActionType.CON,
                payload : false,
            });
            dispatch({
                type : SettingActionType.SET_ALERT,
                isOpen : true,
                status : "success",
                message : "Koneksi telah di matikan!"
            }) 
        }    
    }


    const getVoucherAktive = async () =>{
        try {
            const config =  await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial/active?pop_id=${popData.popId}&member_id=${authResult?.id}`, config);
            if(response.status == 200){
               
                setTimeLeft(response.data.time_left);
              
            }
        } catch (error) {
            
        }
    }

    const handleConnectVoucher = async () =>{
        if(!isLogin){
            navigate(ScreenActionType.LOGIN_SCREEN);
            return;
        }
        try {
            dispatch({
                type : SettingActionType.SET_LOADING,
            payload : true,
            }) 
            if(connectData){
                const linloginTrial = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
                 await axios.post(linloginTrial,{
                    "mac" : mac,
                    "pop_id" : popData.popId
                },configWithOpenGuest); 
                dispatch({
                    type : LocationActionType.CON,
                    payload : false,
                });
            }
            const configData = isLogin ? await configWithJwt() : configWithOpenGuest;
            const response = await axios.post(`${BaseUrl.baseProd}/member/${isLogin ? "connect-internet" :  "connect-internet-open"}?pop_id=${popData.popId}`,{
                'voucher_code' : voucherVal,
                'type' : "free",
                'ip_address' : getIpAddressSync(),
                'uniq_id' : getAndroidIdSync(),
            } ,configData);
            if(response.status == 200){
                await getVoucherAktive();
               await axios.get(response.data.redirect, configHeaderPrimary);
               dispatch({
                type : LocationActionType.CON_VOUCHER,
                val : voucherVal,
                condition : true,
                time : response.data.voucher.lifetime,
                currentTime : response.data.voucher.lifetime,
               })
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen : true,
                    status : "success",
                    message : "Selamat kamu sudah terkoneksi dengan Konekyu!"
                })
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
                    type : LocationActionType.CON_VOUCHER,
                    val : voucherVal,
                    condition : false
                   })
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
                type : LocationActionType.CON_VOUCHER,
                val : voucherVal,
                condition : false
               })
               if(error.response.status === 422){
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen : true,
                    status : "error",
                    message : error.response.data.message.voucher_code[0]
                }) 
               }else{
                dispatch({
                    type : SettingActionType.SET_ALERT,
                    isOpen : true,
                    status : "error",
                    message : "Koneksi dengan Voucher gagal!"
                }) 
               }
             dispatch({
                type : SettingActionType.SET_LOADING,
                payload : false
             })
        }
    }


    // useEffect(()=>{
    //     initializeAppodeal()
    //   },[]);

  

    useEffect(() => {
        GetLocationMember();
            // initializeAppodeal();
            // WifiManager.setEnabled(true);
            DeviceInfo.getAndroidId().then((mac:string) => {
                        setMac(mac);
                      }).catch((err)=>console.log("get mac error ", err));
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
                // dispatch({
                // type: AuthActionType.MODAL_ALERT,
                // modal: true,
                //  });
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
      },[myLocation])


      
     

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
                    }}>
                        {!connectData ? <WifiNotIcon size={16}/> : <WifiIcon size={18} color={Colors.ResColor.white}/>}  {connectData ? 'Terhubung ' : "Belum Terhubung"}  </Text>
                    <Text style={{color : Colors.ResColor.yellow, fontSize : 18, fontFamily : FontStyle.BOLD}}>
                         {wifiSSID.substring(0, 10) } {wifiSSID.length > 10 ? "..." : ""}</Text>
                    </View>
                    <View style={{
                        backgroundColor  :"#0365BE",
                        padding : 15,
                        borderRadius : 10,
                    }}>
                        {!connectData ?
                        <>
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
                    </> :  <Text style={{
                        color : Colors.ResColor.white,
                        fontFamily : FontStyle.REGULER,
                        fontSize : 12,
                        width : "80%",
                    }}>
                        Selamat kamu sudah terhubung ke jaringan KonekYu!
                    </Text>

                        }
                    </View>
                    <TouchableOpacity
                    onPress={async () => {
                        // WifiManager.setEnabled(true);
                        // navigate(ScreenActionType.SEARCH_WIFI);
                        ConnectWifi();
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
                        }}>Cari Jaringan KonekYu </Text>
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

                    }}>Voucher Wifi</Text>
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
                    backgroundColor  :connectData ?Colors.ResColor.white : Colors.ResColor.blue,
                    padding : 15,
                    flexDirection  :"row",
                    justifyContent :"center",
                    borderRadius : 10,
                    borderWidth : connectData ? 1 : 0,
                    borderColor : connectData ? Colors.ResColor.blue : ""
                }}
                onPress={()=>connectData && popData.connect ? logoutConnect(false) : OpenAdsense() }>
                    <Text style={{
                        fontFamily : FontStyle.BOLD,
                        color : connectData ? Colors.ResColor.blue: Colors.ResColor.white,
                    }}>{connectData ? "Matikan Internet" : "Hubungkan"}</Text>
                </TouchableOpacity>
            </View> :
             <View style={{
                marginTop : 20,
            }}>
                {conVoucher.condition ? 
                (
                    <>
                        <View style={{
                            backgroundColor : "#E1F1FF",
                            elevation : 3,
                            borderRadius : 10,
                        }}>
                            <View style={{
                                backgroundColor : "#A6DAFF",
                                padding : 15,
                                borderTopLeftRadius :10,
                                borderTopRightRadius : 10,
                                flexDirection : "row",
                                justifyContent : "space-between"
                            }}>
                                <Text style={{
                                    fontFamily:  FontStyle.MEDIUM,
                                    fontSize : 14,
                                    color : "#0365BE",
                                }}>Voucher Digunakan : </Text>
                                <Text style={{
                                    fontFamily:  FontStyle.BOLD,
                                    fontSize : 14,
                                    color : "#0365BE",
                                }}>{conVoucher.val}</Text>
                            </View>
                            <View style={{
                                padding :  20,
                                flexDirection  :"row",
                                justifyContent : "space-between"
                            }}>
                                <View style={{
                                    alignItems : "center",
                                }}>
                                    <WifiIcon size={24} color="#0074E1"/>
                                    {timeLeft != null &&
                                     <Text style={{
                                        marginTop : 10,
                                    }}>{<Countdown idVoucher={timeLeft.id} lifetimeInSeconds={timeLeft.time_left} code={timeLeft.voucher_serial}/>}</Text> }
                                </View>
                                <View style={{
                                       alignItems : "center",
                                }}>
                                    <IconOff size={24}/>
                                    <Text>{locationData?.filter((fil:GetMemberLocation)=>fil.id == popData.popId)[0].name}</Text>
                                </View>
                            </View>
                            <View style={{
                                padding : 15,
                            }}>
                                        <TouchableOpacity 
                            style={{
                                backgroundColor  :conVoucher.condition ?Colors.ResColor.white : Colors.ResColor.blue,
                                padding : 15,
                                flexDirection  :"row",
                                justifyContent :"center",
                                borderRadius : 10,
                                borderWidth : conVoucher.condition ? 1 : 0,
                                borderColor : conVoucher.condition ? Colors.ResColor.blue : ""
                            }}
                            onPress={()=>logoutConnect(true)}>
                                <Text style={{
                                    fontFamily : FontStyle.BOLD,
                                    color : conVoucher.condition ? Colors.ResColor.blue: Colors.ResColor.white,
                                }}>{"Matikan Internet" }</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
                :
                (
                    <>
                <View style={{
                    flexDirection  :"row",
                    justifyContent  :"space-between",
                    alignItems : "center",
                }}>
                    <View style={{
                        flexDirection  :"row",
                    }}>
                        <View style={{
                               transform: [{ rotate: '140deg' }],
                               marginRight : 25,
                               position : "relative",
                               bottom : 20,
                        }}>
                        <TabBarIconVoucher size={24} color={Colors.ResColor.blue}/>
                        </View>
            <Text style={{
                fontFamily : FontStyle.BOLD,
                color : Colors.ResColor.black,
                marginBottom : 15,
                fontSize : 18,
                paddingTop : 10,
            }}>Punya Voucher ?</Text>
            </View>
            <ButtonLink label={"Voucherku"} onPress={()=>navigate(ScreenActionType.VOUCHER)} textColor={Colors.ResColor.blue} disable={false} size={14} style={undefined} />
            </View>
            <View style={{
                marginBottom  :15,
            }}>
            <InputPrimary label={undefined} type={"visible-password"}
            onPresPaste={PasteButton}
            value={voucherVal}
            passwordIcon={false} paste={true} onChange={(val:string)=>setVoucherVal(val)} placeholder={"Masukkan kode voucher"} />
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
                }}>{"Hubungkan"}</Text>
            </TouchableOpacity>
                </>)}
            </View>
                
            }
    </View>
            <View style={{
                marginBottom : 50,
                marginTop : 20,
                padding: 15,
            }}>
                <VoucherDash/>
            </View>
        </View>
        </ScrollView>
            <ModalPrimary  modalVisible={modal} />
            {alert.isOpen &&
             <AlertPrimary status={alert.status} message={alert.message}/> }     
        </SafeAreaView>
    )
}

export default WifiScreen;