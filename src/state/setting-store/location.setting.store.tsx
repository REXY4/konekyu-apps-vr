import { GetMemberLocation } from "../../entities/location.entities";

export interface PopData {
    popId : any,
    connect: boolean
}

interface LocationSettiingStore {
    locationData : Array<GetMemberLocation> | null
    detailLocation : GetMemberLocation | null
    detailId : any
    xenditLink :string
    popData : PopData
    voucherData : string

    GetLocationMember():Promise<void>
    getConnection():Promise<void>
}


export type {LocationSettiingStore}