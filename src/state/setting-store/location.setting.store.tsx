import { GetMemberLocation } from "../../entities/location.entities";

export interface PopData {
    popId : any,
    connect: boolean
}

export interface ConVoucherInterface {
    
        val : string,
        condition : boolean,
        time : number,
        currentTime : number,
    
}

interface LocationSettiingStore {
    locationData : Array<GetMemberLocation> | null
    detailLocation : GetMemberLocation | null
    detailId : any
    xenditLink :string
    popData : PopData
    voucherData : string
    connectData: boolean,
    conVoucher : ConVoucherInterface 


    GetLocationMember():Promise<void>
    getConnection():Promise<void>
}


export type {LocationSettiingStore}