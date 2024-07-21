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

const Routers = ()=>{

    const dispatch = useDispatch();
   
    useEffect(()=>{
        socket.on("connection",()=>{
            console.log("server connected")
        })
        socket.on("getpop", async(val:string)=>{
        const checkIntertial = Appodeal.isLoaded(AppodealAdType.INTERSTITIAL);
        const showAdsense = Appodeal.canShow(AppodealAdType.INTERSTITIAL);
        console.log("check intertial ", checkIntertial, "check show ", showAdsense);
          try {
              const response = await axios.get(val, configHeaderPrimary);
              if(response.status == 200){

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