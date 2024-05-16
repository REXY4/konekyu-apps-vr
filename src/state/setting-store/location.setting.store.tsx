import { GetMemberLocation } from "../../entities/location.entities";

interface LocationSettiingStore {
    locationData : Array<GetMemberLocation> | null
    detailLocation : GetMemberLocation | null

    GetLocationMember():Promise<void>
}


export type {LocationSettiingStore}