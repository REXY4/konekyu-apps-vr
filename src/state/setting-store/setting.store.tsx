
export interface AlertEntities {
    status : "error" | "success",
    isOpen: boolean,
    message : string
}


interface SettingStore {
    isLoading : boolean,
    alert : AlertEntities
}

export type {SettingStore}