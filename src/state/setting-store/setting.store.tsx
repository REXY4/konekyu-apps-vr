
export interface AlertEntities {
    status : "error" | "success",
    isOpen: boolean,
    message : string
}


interface SettingStore {
    splashScreen : boolean,
    isLoading : boolean,
    alert : AlertEntities
    conVoucher : boolean
}

export type {SettingStore}