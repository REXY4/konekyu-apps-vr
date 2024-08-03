import React, { ReactNode, useEffect } from "react";
import MyStack from "./StackNav";
import socket from "../helpers/socket";
import axios from "axios";
import { useDispatch } from "react-redux";
import LocationActionType from "../state/actions-type/location.type";
import { BaseUrl, configHeaderPrimary, configWithOpenGuest } from "../../config/api";
import { initializeAppodeal } from "../utils/appodealConfig";
import { Appodeal, AppodealAdType } from "react-native-appodeal";
import { err } from "react-native-svg";
import SettingActionType from "../state/actions-type/setting.type";
import { getUniqueIdSync,   getIpAddressSync} from "react-native-device-info";
// import { getIp } from '@mobeuv/react-native-check-ip';

const Routers = ()=>{

    const dispatch = useDispatch();
    
    useEffect(()=>{
        socket.on("connection",()=>{
            console.log("server connected")
        })

        socket.on("getpop", async(val:string)=>{
        const checkIntertial = Appodeal.isLoaded(AppodealAdType.INTERSTITIAL);
        const showAdsense = Appodeal.canShow(AppodealAdType.INTERSTITIAL);
        const getIp = getIpAddressSync();
        const parts = getIp.split('.');
        parts.pop();
        const newIp = parts.join(".");
       
        try {
              const response = await axios.get(val, configHeaderPrimary);
              if(response.status == 200){
                await axios.post(`${BaseUrl.baseProd}/connect-internet-open/host`, {
                    'ip_address' : getIpAddressSync(),
                    'uniq_id' : getUniqueIdSync(),
                    "network" : newIp,
                },configWithOpenGuest);
                const response5 = await axios.get(`${BaseUrl.baseHotspot}/status.html`, configHeaderPrimary);
                const regex = /rizk_connect/;
                const match = response5.data.match(regex);
                if(match){
                    console.log("ketemu")
                    dispatch({
                        type : LocationActionType.CON,
                        payload : true
                    })
                }
                else{
                 
                    const logoutLink = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
                    await axios.post(logoutLink,{
                        "mac" : getUniqueIdSync(),
                        "pop_id" : response.data.toString().trim(),
                    },configWithOpenGuest);
                    dispatch({
                        type : LocationActionType.CON,
                        payload : false
                    })
                }

                dispatch({
                    type : LocationActionType.SET_POP,
                    popId : response.data.toString().trim(),
                    connect : true
                })
              
              }              
          } catch (error) {
            axios.get(`${BaseUrl.baseProd}/member/pop-news/default`, configWithOpenGuest)
            .then((result:any)=>{
             
                    dispatch({
                        type : LocationActionType.SET_POP,
                        popId : result.data.client.id,
                        connect : false
                    })
                    dispatch({
                        type : LocationActionType.CON_VOUCHER,
                        val : "",
                        condition : false,
                        time : 0,
                        currentTime : 0,
                       })
                       
                       dispatch({
                        type : LocationActionType.CON,
                        payload : false,
                    });
            }).catch(err=>{
                dispatch({
                    type : LocationActionType.SET_POP,
                    popId : 0,
                    connect : false
                })
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
            });
          }
        });
    },[socket])

    return(
        <>
        <MyStack/>
        </>
            );
}
export default Routers;