import { RequestLoginEntities, ResultLogin } from "../../entities/auth.entities"

interface AuthSettingStore {
    isLogin : boolean,
    authResult : ResultLogin | null
    modal: boolean,
    voucherVal : string
    //function
    AuthLogin(body:RequestLoginEntities):Promise<void>
}

export type {AuthSettingStore}