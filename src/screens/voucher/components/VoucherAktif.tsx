import { View, Dimensions, Text } from "react-native";
import VoucherNot from "./VoucherNot";
import axios from "axios";
import { BaseUrl, configWithJwt } from "../../../../config/api";
import LocationUseCase from "../../../use-case/location.usecase";
import { useEffect, useState } from "react";
import { VoucherAvailIcon, VoucherNotAvailIcon } from "../../../components/icons/Icon";
import FontStyle from "../../../types/FontTypes";
import Colors from "../../../components/colors/Colors";
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

const VoucherAktif = () =>{
    const {popData, voucherData} = LocationUseCase();
    const [voucherInfo, setVoucherInfo] = useState<VoucherInfoEntities | null>(null)
    const getVoucherAktive = async () =>{
        try {
            // const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial/active?voucher_code=${voucherData}&pop_id=${popData.popId}`);
            const config =  await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/voucher/serial/active?voucher_code=${"IY8KE9IBWR"}&pop_id=${popData.popId}`, config);
            console.log(response)
            if(response.status == 200){
                setVoucherInfo(response.data.voucher_info);
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(()=>{
        getVoucherAktive()
    },[]);

    return(
        <>
        {voucherInfo !== null && 
        <View style={{
            marginTop : height / 5,
        }}>
            <View style={{
                alignItems : "center"
            }}>
            <VoucherAvailIcon size={100} color=""/>
            <Text style={{
                fontFamily : FontStyle.BOLD,
                fontSize : 21,
            }}>Voucher : {voucherInfo.code}</Text>
             <Text style={{
                fontFamily : FontStyle.BOLD,
                fontSize : 21,
                color : Colors.ResColor.yellow,
            }}>Aktif</Text>
            </View>
        </View>
        }
        {voucherInfo == null &&
        <View style={{
            marginTop : height / 5,
        }}> 
           <VoucherNot/> 
        </View>}
        </>
    )
}

export default VoucherAktif;