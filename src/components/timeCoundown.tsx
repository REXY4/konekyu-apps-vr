import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import socket from '../helpers/socket';
import AuthUseCase from '../use-case/auth.usecase';
import { useDispatch } from 'react-redux';
import SettingActionType from '../state/actions-type/setting.type';
import axios from 'axios';
import { BaseUrl, configWithOpenGuest } from '../../config/api';
import LocationUseCase from '../use-case/location.usecase';
import LocationActionType from '../state/actions-type/location.type';

interface CountdownProps {
  lifetimeInSeconds: number; // Lifetime dalam detik
  idVoucher : number | string
  code :  string
}

const Countdown: React.FC<CountdownProps> = ({ lifetimeInSeconds,idVoucher, code }) => {
  const [remainingTime, setRemainingTime] = useState<number>(lifetimeInSeconds);
  const {popData, connectData} = LocationUseCase();
  const {authResult, isLogin} = AuthUseCase();
  const dispatch = useDispatch();

  const logoutConnect = async () =>{
    try {
        dispatch({
            type : SettingActionType.SET_LOADING,
        payload : true,
        })

        
        const linloginTrial = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
        const loginTrial = await axios.post(linloginTrial,{
            "mac" : code,
            "pop_id" : popData.popId
        },configWithOpenGuest);
        
        if(loginTrial.status == 200){
            const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
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
        const checkStatus = await axios.get(`${BaseUrl.baseHotspot}/logout.html`);
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


  
 useEffect(()=>{
    setRemainingTime(lifetimeInSeconds)
 },[])
  useEffect(() => {
    if (remainingTime <= 0) {
         logoutConnect()
      return; // Stop countdown if remainingTime is zero or negative
    }
    socket.emit("update_time_voucher_paid",{
        id : idVoucher,
        time : remainingTime
    });

    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

   
    
    return () => clearInterval(interval); // Cleanup function
  }, [remainingTime]);


  // Helper function to format remaining time
  const formatTime = (seconds: number): string => {
    if (seconds <= 0) {
      return '00:00:00'; // Handle case when remainingTime is zero or negative
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  return (
    <View>
      <Text>{formatTime(remainingTime)}</Text>
    </View>
  );
};

export default Countdown;
