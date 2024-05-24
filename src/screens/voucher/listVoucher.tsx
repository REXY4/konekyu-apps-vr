import axios from "axios";
import { ImageBackground, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native"
import { BaseUrl, configWithJwt } from "../../../config/api";
import { useEffect, useState } from "react";
import { VoucherEntities } from "../../entities/voucher.entities";
import {  } from "react-native-gesture-handler";
import Colors from "../../components/colors/Colors";
import FontStyle from "../../types/FontTypes";
import ModalVoucher from "./components/ModalVoucher";
import AuthUseCase from "../../use-case/auth.usecase";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import { useDispatch } from "react-redux";
import LocationActionType from "../../state/actions-type/location.type";
import LocationUseCase from "../../use-case/location.usecase";




const ListVoucher = () =>{
    const [showModal, setModal] = useState<boolean>(false);
    const [voucherData, setVoucherData] = useState<Array<VoucherEntities> | null>(null)
    const [voucherDataDetail, setVoucherDataDetail] = useState<VoucherEntities>()
    const {popData}  = LocationUseCase()
    const {authResult} = AuthUseCase();
    const  dispatch = useDispatch()
    const getVoucher = async () =>{
        try{  
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher?pop_id=${popData.popId}`, config);
            if(response.status == 200){
                setVoucherData(response.data.voucher_clients.data)
            }
        }catch(err){
            console.log("err get voucher : ", err);
        }
    }

    useEffect(()=>{
        getVoucher();
    },[]);


    const handleOpenModal = (item:VoucherEntities) =>{
        setModal(true)
        setVoucherDataDetail(item)
    }

    const handleBuyVoucher = async () =>{
        console.log({
            "voucher": parseInt(String(voucherDataDetail?.id)),
            "pop_id" : 318,
             "email" : authResult?.email
        })
        try {
            const config = await configWithJwt();
            const response = await axios.post(`${BaseUrl.baseProd}/member/voucher`, {
                "voucher": parseInt(String(voucherDataDetail?.id)),
                "pop_id" : popData.popId,
                 "email" : authResult?.email
            },config);
            if(response.status == 200){
                console.log(response.data.payment_url)
                dispatch({
                    type : LocationActionType.BUY_VOUCHER,
                    payload : response.data.payment_url
                })
                navigate(ScreenActionType.BUY_VOUCHER)
            }
        } catch (error) {
            console.log("buy voucher : ", error);
        }
    }




    return (
        <SafeAreaView>
           <ScrollView> 
            {voucherData &&
            <View style={{
                paddingTop : 10,
                padding : 15,
            }}>
                {voucherData.map((item:VoucherEntities)=>{
                    return(
                        <TouchableOpacity 
                        onPress={()=>handleOpenModal(item)}
                        style={{
                            width : "100%",
                            // padding : 20,
                            height : 100,
                            marginBottom : 10,
                            borderRadius : 10,
                            elevation : 3,
                            backgroundColor  :Colors.ResColor.blue,
                        }}>
                            <View style={{
                                flexDirection  :"row",
                                justifyContent : "space-between",
                                position : "absolute",
                                width : "100%",
                                top : 24,
                            }}>
                                <View style={{
                                    borderRadius : 1000,
                                    backgroundColor : Colors.ResColor.white,
                                    width : 50,
                                    height : 50,
                                    position : "relative",
                                    right : 25,
                                    borderRightColor : Colors.ResColor.grayOpacity,
                                    borderRightWidth : 1,
                                }}/>
                                <View style={{
                                    borderRadius : 1000,
                                    backgroundColor : Colors.ResColor.white,
                                    width : 50,
                                    height : 50,
                                    position : "relative",
                                    left : 25,
                                    borderLeftColor : Colors.ResColor.grayOpacity,
                                    borderLeftWidth : 1,
                                }}/>
                            </View>
                            <View style={{
                                backgroundColor  :Colors.ResColor.yellow,
                                position : "absolute",
                                right : 0,
                                padding : 5,
                                borderTopRightRadius : 10,
                                borderBottomLeftRadius : 10,
                            }}>
                            <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.white,
                                }}>Rp {item.voucher.price.toLocaleString()}</Text>
                            </View>
                            <View style={{
                                padding : 15,
                                marginLeft : 20,
                            }}>
                                <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.white,
                                    fontSize : 18,
                                }}>{item.voucher.name}</Text>
                                <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.yellow,
                                    fontSize : 12,
                                }}>Berlaku : {item.voucher.start_date_formatted} - {item.voucher.end_date_formatted} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            }
            </ScrollView>
            <ModalVoucher onPress={handleBuyVoucher} name={String(voucherDataDetail?.voucher.name)} setModal={setModal} modalVisible={showModal}/>
        </SafeAreaView>
    )
}


export default ListVoucher;