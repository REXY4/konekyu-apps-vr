import { View, Dimensions, Text ,ScrollView, TouchableOpacity, Linking, RefreshControl} from "react-native";
import VoucherNot from "./VoucherNot";
import axios from "axios";
import { BaseUrl, configWithJwt } from "../../../../config/api";
import { useEffect, useState } from "react";
import { VoucherDetailEnt, VoucherEntities } from "../../../entities/voucher.entities";
import Colors from "../../../components/colors/Colors";
import FontStyle from "../../../types/FontTypes";
import { useDispatch } from "react-redux";
import SettingActionType from "../../../state/actions-type/setting.type";
import LocationUseCase from "../../../use-case/location.usecase";
import { AlertEntities } from "../../../state/setting-store/setting.store";
import AuthActionType from "../../../state/actions-type/auth.type";
import ModalPrimary from "../../wifi/components/ModalPrimary";
import AuthUseCase from "../../../use-case/auth.usecase";
import LocationActionType from "../../../state/actions-type/location.type";
import ModalVoucherUse from "./ModalVoucherUse";
import AlertPrimary from "../../../components/alert/AlertPrimary";
import SettingUseCase from "../../../use-case/setting.useCase";
const {height} = Dimensions.get("screen")

export interface VoucherSerialEnt {
               "id": number,
                "client_id": number,
                "voucher_id": number,
                "code": string,
                "status": string,
                "sold_at": any,
                "sell_price": number,
                "time_left": number,
                "sold_at_formatted": any,
                "time_left_humans": string,
                "time_left_clock": string,
                "client": {
                    "id": number,
                    "name": string
                },
                "voucher": VoucherDetailEnt
}

const VoucherKu = () =>{
    const {popData} = LocationUseCase();
    const {modal} = AuthUseCase()
    const {alert} = SettingUseCase();
    const [idVoucher, setIdVoucher ] = useState<number>(0)
    const [voucherId, setVoucherId ] = useState<number>(0)
    const [refresh, setRefresh] = useState<boolean>(false);
    const [voucherSerial,setVoucherSerial] = useState<Array<VoucherSerialEnt> | []>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [voucherVal, setVoucherVal] =  useState<string>('');
    const dispatch = useDispatch();



    const getVoucher = async() =>{
        try {
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial?pop_id=${popData.popId}`, config);
            if(response.status == 200){
                setVoucherSerial(response.data.voucher_serials.data);
                setRefresh(false)
            }
        } catch (error) {
            console.log("get voucher ku ", error)
            setRefresh(false)
        }
    }

    useEffect(()=>{
        getVoucher();
    },[]);

    const handleConnectVoucher = async () =>{
        dispatch({
            type : SettingActionType.SET_LOADING,
            payload : true
        })
        dispatch({
            type : AuthActionType.VOUCHER_VAL,
            payload : `${voucherId}`
        })
        setShowModal(false);
        try {
            const config = await configWithJwt();
            const response = await axios.post(`${BaseUrl.baseProd}/member/connect-internet?pop_id=${popData.popId}`,{
                'voucher_code' : voucherVal
            } ,config);
            if(response.status == 200){
                const connect = await axios.get(response.data.redirect);
                if(connect.status == 200){
                    dispatch({
                        type : SettingActionType.SET_LOADING,
                        payload : false
                    })
                    dispatch({
                        type : LocationActionType.VAL_VOUCHER,
                        payload : voucherId
                    })
                   
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen : true,
                        status : "success",
                        message : "Koneksi Terhubung!"
                    })
                }else{
                    dispatch({
                        type : SettingActionType.SET_LOADING,
                        payload : false
                    })
                    dispatch({
                        type : AuthActionType.VOUCHER_VAL,
                        payload : ''
                    })
                    dispatch({
                        type : LocationActionType.VAL_VOUCHER,
                        payload : voucherVal
                    })
                };
                
            }else{
                const alertData:AlertEntities = {
                    isOpen : true,
                    status : "error",
                    message : response.data.message.voucher_code[0]
                }
                dispatch({
                    type : AuthActionType.VOUCHER_VAL,
                    payload : ''
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
                type : AuthActionType.VOUCHER_VAL,
                payload : ''
            })
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

    const handleSelectVoucher = (id:number, val:string,idVouch:number) =>{
        setIdVoucher(id)
        setVoucherVal(val)
        setVoucherId(idVouch)
    }

    const onRefresh = () =>{
        setRefresh(true)
        getVoucher();
    }

    return(
        <View style={{
            height : "100%",
        }}>
            {voucherSerial[0] !== undefined ?
            ( 
                <>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }>
                    <View style={{
                        marginBottom : 100,
                        marginTop : 20,
                    }}>
                        {voucherSerial.map((item:VoucherSerialEnt)=>{
                            return(
                                <TouchableOpacity
                                onPress={()=>handleSelectVoucher(item.id, item.code, item.voucher_id)}
                                style={{
                                    backgroundColor  :item.id == idVoucher ?Colors.ResColor.blue : Colors.ResColor.white,
                                    width : "90%",
                                    marginLeft : 3,
                                    elevation : 3,
                                    height : 140,
                                    borderRadius : 10,
                                    borderWidth : 0.3,
                                    marginBottom : 20,
                                }}>
                                    <View style={{
                                        position : "absolute",
                                        flexDirection  :"row",
                                        width : "100%",
                                        justifyContent : "space-between",
                                        top : 24,
                                    }}>
                                    <View style={{
                                        backgroundColor  :Colors.ResColor.white,
                                        borderRightWidth : 1,
                                        borderRightColor : Colors.ResColor.gray,
                                        height : 70,
                                        width:  60,
                                        position : "relative",
                                        right : 23,
                                        borderRadius : 1000,
                                    }}/>
                                    <View style={{
                                        backgroundColor  :Colors.ResColor.white,
                                        height : 70,
                                        width:  60,
                                        position : "relative",
                                        left : 23,
                                        borderLeftWidth : 1,
                                        borderRadius : 1000,
                                        borderLeftColor : Colors.ResColor.gray,
                                    }}/>
                                    </View>
                                    
                                    <View style={{
                                        paddingLeft : 50,
                                        paddingRight : 50,
                                        marginTop : 26,
                                    }}>
                                        <View style={{
                                            flexDirection  :"row",
                                            justifyContent : "space-between",
                                        }}>
                                        <Text style={{
                                        fontFamily : FontStyle.BOLD,
                                        fontSize : 14,
                                        color : item.id == idVoucher ? Colors.ResColor.white : Colors.ResColor.blue,
                                        textAlign :"start",
                                    }}>{item.voucher.name}</Text>
                                                <View style={{
                                                backgroundColor  : Colors.ResColor.yellow,
                                               borderRadius :10,
                                                paddingLeft : 5,
                                                paddingRight : 5,
                                                right : 0, 
                                                elevation : 3,
                                            }}>
                                            <Text style={{
                                                fontFamily : FontStyle.BOLD,
                                                fontSize : 14,
                                                color : Colors.ResColor.white,
                                                textAlign :"center",
                                            }}>{item.time_left} Jam</Text>
                                            </View>
                                        </View>
                                   
                                    <Text style={{
                                        fontFamily : FontStyle.BOLD,
                                        fontSize : 12,
                                        color : item.id == idVoucher ?Colors.ResColor.white : Colors.ResColor.gray,
                                        textAlign :"start",
                                    }}>Code : <Text style={{
                                        color : item.id == idVoucher ? Colors.ResColor.yellow2 : Colors.ResColor.blue,
                                    }}>{item.code}</Text> </Text>
                                        <Text style={{
                                        fontFamily : FontStyle.BOLD,
                                        fontSize : 12,
                                        width : 400,
                                        marginTop : 30,
                                        position : "relative",
                                        right : 15,
                                        color : item.id == idVoucher ? Colors.ResColor.white : Colors.ResColor.gray,
                                        textAlign :"start",
                                    }}>Berlaku : {item.voucher.start_date_formatted} - {item.voucher.end_date_formatted} </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <ModalPrimary modalVisible={modal} />
                </ScrollView>
                               <View style={{
                                        flexDirection  :"row",
                                        justifyContent : "center",
                                        marginTop : 5,
                                        position : "absolute",
                                        bottom : 100,
                                        width : "100%",
                                    }}>
                                        <TouchableOpacity 
                                        onPress={()=>{
                                            if(popData.connect){
                                                // handleConnectVoucher("")
                                                if(voucherVal !== ""){
                                                    setShowModal(true);
                                                }
                                            }else{
                                                dispatch({
                                                    type : AuthActionType.MODAL_ALERT,
                                                    payload : true,
                                                })
                                            }
                                        }}
                                        style={{
                                            backgroundColor : Colors.ResColor.blue,
                                            padding : 5,
                                            borderRadius : 10,
                                            elevation : 3,
                                            width : 300,
                                            height : 40,
                                            position : "relative",
                                            right : 10,
                                        }}>
                                            <Text style={{
                                                fontFamily : FontStyle.MEDIUM,
                                                color : Colors.ResColor.white,
                                                fontSize : 18,
                                                textAlign : "center",
                                            }}>Gunakan</Text>
                                        </TouchableOpacity>
                                    </View>
                </>
            )
            :
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNot/>
        </View>}
        <ModalVoucherUse onPress={handleConnectVoucher} setShow={setShowModal} modalVisible={showModal}/>
        {alert.isOpen &&
             <AlertPrimary status={alert.status} message={alert.message}/> }  
        </View>
    ) 
}

export default VoucherKu;