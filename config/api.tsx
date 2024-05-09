import AsyncStorage from "@react-native-async-storage/async-storage"

export const BaseUrl = {
    baseProd : "https://konekyu.id/api/v2"
}

export const configHeaderPrimary = {
    headers : {
        "Content-Type" : "application/json",
    }
}


export const configWithJwt = async ()=>{
    const token = await AsyncStorage.getItem("token");
    return  {
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }
}
