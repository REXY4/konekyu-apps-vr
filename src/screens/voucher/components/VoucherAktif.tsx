import { View, Dimensions, Text, ScrollView, RefreshControl, Image } from "react-native";
import VoucherNot from "./VoucherNot";
import axios from "axios";
import { BaseUrl, configWithJwt, configWithOpenGuest } from "../../../../config/api";
import LocationUseCase from "../../../use-case/location.usecase";
import { useEffect, useState } from "react";
import { VoucherAvailIcon, VoucherNotAvailIcon } from "../../../components/icons/Icon";
import FontStyle from "../../../types/FontTypes";
import Colors from "../../../components/colors/Colors";
import AuthUseCase from "../../../use-case/auth.usecase";
import { VoucherSerialEnt } from "./VoucherKu";
import Countdown from "../../../components/timeCoundown";
import { FormatTime } from "../../wifi";
import VoucherNotActive from "./VoucherNotActive";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import SettingActionType from "../../../state/actions-type/setting.type";
import LocationActionType from "../../../state/actions-type/location.type";
const {height} = Dimensions.get("screen")


interface VoucherDetail {
    id: number;
    client_id: number;
    voucher_id: number;
    code: string;
    status: string;
    sold_at: string;
    sell_price: number;
    time_left: number;
    used_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    active_user: number;
    activation_date: string | null;
    expired_date: string | null;
    use_date: string;
}

interface VoucherInfo {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    lifetime: string;
    download: string;
    download_unit: string;
    upload: string;
    upload_unit: string;
    limit_user: number;
    price: number;
    one_day: number;
    type: string;
    is_gift: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    voucher_detail: VoucherDetail;
}


interface ClientDetails {
    id: number;
    parent_id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    logo: string | null;
    pictures: Array<{
        id: number;
        entity_id: number;
        url: string;
    }>;
    parent: {
        id: number;
        name: string;
        logo: string;
    };
}



export interface TimeLeftEntity {
    id: number;
    member_id: number;
    client_id: number;
    voucher_id: number;
    connect_method: string;
    voucher_serial: string;
    profile: string;
    time_left: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    ip_address: string | null;
    type: string | null;
    uniq_id: string | null;
  }
  

const VoucherAktif = ({setTab, tabButton}:{setTab:any,tabButton:boolean}) =>{
    const {authResult} = AuthUseCase();
    const {popData, voucherData, connectData} = LocationUseCase();
    const {voucherVal} =  AuthUseCase();
    const [clientData, setClientData] = useState<ClientDetails | null>(null)
    const [refresh, setRefresh] =  useState<boolean>(false)
    const [voucherInfo, setVoucherInfo] = useState<VoucherInfo | null>(null)
    const [voucherSerial,setVoucherSerial] = useState<VoucherSerialEnt | null>(null);
    const [timeLeft, setTimeLeft] = useState<TimeLeftEntity| null>(null)
    const dispatch =  useDispatch();
    const getPopId = async () =>{
        try {
            const response = await axios.get(`${BaseUrl.baseProd}/member/pop-news/detail/${popData.popId}`, configWithOpenGuest);
                if(response.status == 200){
                    setClientData(response.data.client);
                }
        } catch (error) {
            console.log(error)
        }
    }
    const getVoucherAktive = async () =>{
        try {
            const config =  await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial/active?pop_id=${popData.popId}&member_id=${authResult?.id}`, config);
            if(response.status == 200){
                setVoucherInfo(response.data.data.voucher);
                setTimeLeft(response.data.time_left);
                setRefresh(false);
            }else{
                setRefresh(false);
            }
        } catch (error) {
            console.log("check error ", error)
            setRefresh(false);
        }
    }


    const logoutConnect = async () =>{
        try {
            dispatch({
                type : SettingActionType.SET_LOADING,
            payload : true,
            })
    
            
            const linloginTrial = `${BaseUrl.baseProd}/member/connect-internet-open/logout`;
            const loginTrial = await axios.post(linloginTrial,{
                "mac" : voucherInfo?.voucher_detail.code,
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

   
    const onRefresh = () =>{
        setRefresh(true);
        getVoucherAktive();
        getPopId();
    }

    useEffect(()=>{
        getVoucherAktive()
        getVoucherAktive();
        getPopId();
        return () => {
            getVoucherAktive()
            getVoucherAktive();
            getPopId();
        };
    },[tabButton]);

    return(
        <View onTouchStart={()=>onRefresh()}>
        <ScrollView 
        style={{
        }}
        refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }>
        {voucherInfo !== null && connectData && timeLeft?.type == "paid" &&
        <View style={{
            marginTop : height / 7,
            height : "100%",
            paddingRight : 30,
            paddingBottom : 20,
        }}>
            <View style={{
                backgroundColor  :Colors.ResColor.white,
                borderRadius : 5,
                elevation : 3,
                borderWidth : 0.3,
                position : "relative",
                right : 0,
            }}>
           <View style={{
                borderBottomWidth : 0.3,
                padding :  10,
           }}>
                <Text style={{
                    textAlign :"center",
                    fontFamily : FontStyle.BOLD,
                }}>Informasi Voucher</Text>

           </View>
           {voucherInfo !== null && 
           (
            <>
           <View style={{
            flexDirection  :"row",
            alignItems : "center",
            justifyContent : "center",
            paddingTop : 20,
           }}>
                <Text style={{
                    fontSize : 18,
                    fontFamily:  FontStyle.BOLD,
                    color : Colors.ResColor.yellow,
                }}>{voucherInfo.voucher_detail.code}</Text>
           </View>
           <View style={{
            // marginTop : 20,
            padding :20,
            flexDirection :"row",
            justifyContent : "space-between",
           }}>
            <View>
                        <View style={{
                            width : 100,
                            height : 100,
                            backgroundColor  :"white",
                            borderRadius : 10,
                            elevation : 3,
                            marginBottom : 20,
                        }}>
                        <Image 
                        resizeMode="cover"
                        source={{uri :`${BaseUrl.baseUrl}${clientData?.pictures[0].url}`}} style={{
                            width : 100,
                            height : 100,
                            objectFit : "fill",
                            borderRadius : 10,
                        }}/>
                        <View style={{
                            flexDirection  :"row",
                            alignItems  :"center",
                            justifyContent : "center",
                        }}>
                        <View style={{
                            width : 15,
                            height : 15,
                            backgroundColor : timeLeft?.time_left < 0 ? Colors.ResColor.red: "#37D13A",
                            borderRadius :100,
                            marginTop : 10,
                            elevation : 5,
                        }}/>
                        <Text style={{
                            paddingTop : 10,
                            paddingLeft : 10,
                        }}>{timeLeft?.time_left < 0 ? "Waktu Habis" : "Aktif"}</Text>
                        </View>
                        
                </View>
                        <View style={{
                            marginTop : 15,
                            flexDirection : "row",
                            justifyContent : "center",
                        }}>
                            <Countdown idVoucher={timeLeft.id} code={voucherInfo.voucher_detail.code} lifetimeInSeconds={timeLeft?.time_left < 0 ? 0 : timeLeft?.time_left}/>
                        </View>

                </View>
                

                  <View>
                        <View style={{
                            backgroundColor : "#F6F7FD",
                            borderRadius : 5,
                            padding : 10,
                            paddingLeft : 15,
                            paddingRight : 15,
                            elevation : 3,
                        }}>
                            <Text style={{
                                fontSize : 16,
                                fontFamily : FontStyle.BOLD,
                                color : Colors.ResColor.black2
                            }}>{clientData.name}</Text>
                        </View>
                        <View style={{
                            flexDirection  :"row",
                            justifyContent : "space-between",
                            marginTop : 10,
                        }}>
                            <View style={{
                               
                            }}>
                                <Text>Upload</Text>
                                <View style={{
                                    flexDirection  :"row",
                                    backgroundColor : "#E3FFE4",
                                    padding : 5,
                                    borderRadius : 10,
                                    alignItems : "center",
                                    marginTop : 15,
                                }}>
                                    <Image source={require("../../../../assets/icons/upload.png")}style={{
                                        width : 24,
                                        height : 24,
                                        marginRight : 10,
                                    }}/>
                                        <Text>{voucherInfo.upload} {voucherInfo.upload_unit}</Text>
                                </View>
                            </View>
                            <View style={{
                                
                            }}>
                                <Text>Download</Text>
                                <View style={{
                                     flexDirection  :"row",
                                     backgroundColor : "#DEEFFF",
                                     padding : 5,
                                     borderRadius : 10,
                                     alignItems : "center",
                                     marginTop : 15,
                                }}>
                                     <Image source={require("../../../../assets/icons/download.png")}style={{
                                        width : 24,
                                        height : 24,
                                        marginRight : 10,
                                    }}/>
                                <Text>{voucherInfo.download} {voucherInfo.download_unit}</Text>
                                </View>
                            </View>
                           
                        </View>
                        <View  style={{
                            marginTop : 10,
                        }}>
                                <Text>Exp</Text>
                                <Text>{voucherInfo.end_date}</Text>
                        </View>
                        <View>
                    
                  </View>
                  </View>
                
           </View>
           <View style={{
            padding : 15,
           }}>
           <TouchableOpacity 
           onPress={logoutConnect}
           style={{
            backgroundColor  :Colors.ResColor.blue,
            borderRadius : 10,
            height: 50,
            elevation : 3,
            flexDirection : "row",
            justifyContent :"center",
            alignItems  :"center",
           }}>
                        <Text style={{
                            textAlign : "center",
                            fontSize : 18,
                            fontFamily : FontStyle.REGULER,
                            color : "white",
                        }}>Matikan Koneksi</Text>
        </TouchableOpacity>
        </View>
           </>
           )
        }
         
           </View>
        </View>
        
        }
        {timeLeft?.type !== "paid" && 
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNotActive setTab={setTab}/> 
        </View>}
        </ScrollView>
        </View>
    )
}

export default VoucherAktif;