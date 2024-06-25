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
const {height} = Dimensions.get("screen")


interface VoucherInfoEntities {
            "id": number,
            "client_id": number,
            "code": string,
            "time_left": number,
            "connect_method": string,
            "time_left_humans": string,
            "time_left_clock": string,
            "client": {
                "id": number,
                "name": string
            }
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

const VoucherAktif = () =>{
    const {popData, voucherData,} = LocationUseCase();
    const {voucherVal} =  AuthUseCase();
    const [clientData, setClientData] = useState<ClientDetails | null>(null)
    const [refresh, setRefresh] =  useState<boolean>(false)
    const [voucherInfo, setVoucherInfo] = useState<VoucherInfoEntities | null>(null)
    const [voucherSerial,setVoucherSerial] = useState<VoucherSerialEnt | null>(null);

    
    const getPopId = async () =>{
        try {
            const response = await axios.get(`${BaseUrl.baseProd}/member/pop-news/detail/${popData.popId}`, configWithOpenGuest);
            console.log(response.data.client)
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
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial/active?pop_id=${popData.popId}`, config);
            if(response.status == 200){
                setVoucherInfo(response.data.voucher_info);
                setRefresh(false);
            }else{
                setRefresh(false);
            }
        } catch (error) {
            setRefresh(false);
            console.log("error", error)
        }
    }

    const getVoucher = async() =>{
        try {
            const config = await configWithJwt();
            console.log(config.headers.Authorization);
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial?pop_id=30`, config);
            if(response.status == 200){
                setVoucherSerial(response.data.voucher_serials.data.filter((fil:VoucherSerialEnt)=>fil.voucher_id == parseInt(voucherVal))[0]);
                setRefresh(false)
            }
        } catch (error) {
            console.log("get voucher ku ", error)
            setRefresh(false)
        }
    }






    const onRefresh = () =>{
        setRefresh(true);
        getVoucherAktive();
        getVoucher();
        getPopId();
    }
    useEffect(()=>{
        getVoucherAktive()
        getVoucherAktive();
        getVoucher();
        getPopId();
    },[]);

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
        {voucherInfo !== null && 
        <View style={{
            marginTop : height / 5,
            height : "100%",
            paddingRight : 30,
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
           {clientData !== null && 
           <View style={{
            marginTop : 20,
            padding :20,
            flexDirection :"row",
            justifyContent : "space-between",
           }}>
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
                            backgroundColor : "#37D13A",
                            borderRadius :100,
                            marginTop : 10,
                            elevation : 5,
                        }}/>
                        <Text style={{
                            paddingTop : 10,
                            paddingLeft : 10,
                        }}>Aktif</Text>
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
                                        <Text>{voucherSerial?.voucher.upload} {voucherSerial?.voucher.upload_unit}</Text>
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
                                <Text>{voucherSerial?.voucher.download} {voucherSerial?.voucher.download_unit}</Text>
                                </View>
                            </View>
                           
                        </View>
                        <View  style={{
                            marginTop : 10,
                        }}>
                                <Text>Exp</Text>
                                <Text>{voucherSerial?.voucher.end_date_formatted}</Text>
                        </View>

                  </View>
           </View>
        }
         
           </View>
        </View>
        
        }
        {voucherInfo == null &&
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNot/> 
        </View>}
        </ScrollView>
        </View>
    )
}

export default VoucherAktif;