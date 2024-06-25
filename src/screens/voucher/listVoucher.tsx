import axios from "axios";
import { ImageBackground, SafeAreaView, ScrollView, Text, View, TouchableOpacity,Image } from "react-native"
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
import SettingActionType from "../../state/actions-type/setting.type";
import LoadingKonekyu from "../onboarding/LoadingKonekyu";
import LoadingPage from "../onboarding/LoadingPage";
import SettingUseCase from "../../use-case/setting.useCase";




const ListVoucher = () =>{
    const [showModal, setModal] = useState<boolean>(false);
    const [voucherData, setVoucherData] = useState<Array<VoucherEntities> | null>(null)
    const [voucherDataDetail, setVoucherDataDetail] = useState<VoucherEntities>()
    const {popData}  = LocationUseCase()
    const {authResult} = AuthUseCase();
    const {isLoading} =  SettingUseCase();
    const  dispatch = useDispatch()


    const getVoucher = async () =>{
        try{  
            const config = await configWithJwt();
            console.log(config);
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher?pop_id=${popData.popId}`, config);
            if(response.status == 200){
                setVoucherData(response.data.voucher_clients.data)
            }
        }catch(err:any){
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
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true
        })
        setModal(false);
        try {
            const config = await configWithJwt();
            const response = await axios.post(`${BaseUrl.baseProd}/member/voucher`, {
                "voucher": parseInt(String(voucherDataDetail?.id)),
                "pop_id" : popData.popId,
                 "email" : authResult?.email
            },config);
            if(response.status == 200){
                dispatch({
                    type : SettingActionType.SET_LOADING,
                    payload : false
                })
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
        <SafeAreaView style={{
            height : "100%",
        }}>
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
                                padding : 15,
                                marginLeft : 20,
                            }}>
                                <View style={{
                                    position : "absolute",
                                    width : "100%",
                                    justifyContent : "center",
                                    flexDirection  :"row",
                                    marginTop :10,
                                }}>
                                <Image source={require("../../../assets/icons/iconBack.png")}
                                resizeMode="contain"
                                style={{
                                    width : 120,
                                    height : 90,
                                    objectFit : "fill",
                                }}/>
                                </View>
                                <View style={{
                                    flexDirection  :"row",
                                    justifyContent : "space-between",
                                }}>
                                <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.white,
                                    fontSize : 14,
                                }}>{item.voucher.name}</Text>
                                        <View style={{
                                        backgroundColor  :Colors.ResColor.yellow2,
                                        // position : "absolute",
                                        // right : 0,
                                        elevation : 3,
                                        padding : 5,
                                        borderRadius : 10,
                                        marginRight : 20,
                                    }}>
                                    <Text style={{
                                            fontFamily :FontStyle.BOLD,
                                            color : Colors.ResColor.white,
                                        }}>Rp {item.voucher.price.toLocaleString()}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection  :"row",
                                }}>
                                <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.white,
                                    fontSize : 11,
                                    marginRight : 10,
                                }}>upload : {item.voucher.upload} {item.voucher.upload_unit}</Text>
                                 <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.white,
                                    fontSize : 11,
                                }}>download : {item.voucher.download} {item.voucher.download_unit}</Text>
                                </View>
                                <Text style={{
                                    fontFamily :FontStyle.BOLD,
                                    color : Colors.ResColor.yellow2,
                                    fontSize : 11,
                                }}>Berlaku : {item.voucher.start_date_formatted} - {item.voucher.end_date_formatted} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            }
            
            </ScrollView>
            {!voucherData && 
            <View style={{
                marginTop : 100,
                padding : 15,
            }}>
                <Image 
                resizeMode="contain"
                source={require("../../../assets/icons/iconNot.png")} style={{
                    width : 100,
                    height : 100,
                    objectFit : "fill",
                    alignSelf : "center",
                }}/>
                <Text style={{
                    textAlign : "center",
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.gray
                }}>Saat ini belum ada voucher yang tersedia. Silakan cek kembali nanti.</Text>
            </View>
            }
            <ModalVoucher onPress={handleBuyVoucher} name={String(voucherDataDetail?.voucher.name)} setModal={setModal} modalVisible={showModal}/>
            {isLoading && <LoadingPage/>}
        </SafeAreaView>
    )
}


export default ListVoucher;