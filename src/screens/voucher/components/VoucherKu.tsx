import { View, Dimensions, Text ,ScrollView, TouchableOpacity, Linking} from "react-native";
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
    const [voucherSerial,setVoucherSerial] = useState<Array<VoucherSerialEnt> | []>([]);
    const dispatch = useDispatch();
    const getVoucher = async() =>{
        try {
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial`, config);
            console.log(response.data)
            if(response.status == 200){
                setVoucherSerial(response.data.voucher_serials.data);
            }
        } catch (error) {
            console.log("get voucher ku ", error)
        }
    }

    useEffect(()=>{
        getVoucher();
    },[]);

    const handleConnectVoucher = async (voucherVal:string) =>{
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

    return(
        <View>
            {voucherSerial[0] !== undefined ?
            ( 
                <ScrollView>
                    <View style={{
                        marginBottom : 100,
                        marginTop : 20,
                    }}>
                        {voucherSerial.map((item:VoucherSerialEnt)=>{
                            return(
                                <View style={{
                                    backgroundColor  :Colors.ResColor.white,
                                    width : "90%",
                                    marginLeft : 3,
                                    elevation : 3,
                                    height : 140,
                                    borderRadius : 10,
                                    borderWidth : 0.3,
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
                                        backgroundColor  : Colors.ResColor.yellow,
                                        borderTopRightRadius : 10, 
                                        borderBottomLeftRadius : 10,
                                        position : "absolute",
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
                                    }}>{item.voucher.lifetime_humans}</Text>
                                    </View>
                                    <View style={{
                                        paddingLeft : 35,
                                        paddingRight : 35,
                                        marginTop : 26,
                                    }}>
                                    <Text style={{
                                        fontFamily : FontStyle.BOLD,
                                        fontSize : 14,
                                        color : Colors.ResColor.darkBlue,
                                        textAlign :"center",
                                    }}>{item.voucher.name}</Text>
                                                                        <Text style={{
                                        fontFamily : FontStyle.BOLD,
                                        fontSize : 12,
                                        color : Colors.ResColor.gray,
                                        textAlign :"center",
                                    }}>Berlaku : {item.voucher.start_date_formatted} - {item.voucher.end_date_formatted} </Text>
                                    <View style={{
                                        flexDirection  :"row",
                                        justifyContent : "center",
                                        marginTop : 5,
                                    }}>
                                        <TouchableOpacity 
                                        onPress={()=>{
                                            if(popData.connect){
                                                handleConnectVoucher(item.code)
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
                                        }}>
                                            <Text style={{
                                                fontFamily : FontStyle.BOLD,
                                                color : Colors.ResColor.white,
                                                fontSize : 12,
                                            }}>Gunakan</Text>
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <ModalPrimary modalVisible={modal} />
                </ScrollView>
            )
            :
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNot/>
        </View>}
        </View>
    ) 
}

export default VoucherKu;