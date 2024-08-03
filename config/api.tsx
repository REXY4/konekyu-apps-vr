import AsyncStorage from "@react-native-async-storage/async-storage"

export const BaseUrl = {
    // baseProd : "https://ribit.bnet.id/api/v2",
    // baseUrl : "https://ribit.bnet.id",
    // hotspot : "http://hotspot.bnet.id/pop.html",
    // baseHotspot : "http://hotspot.bnet.id",
       baseProd : "https://ribit.bnet.id/api/v2",
    baseUrl : "https://ribit.bnet.id",
    socketUrl : 'http://ribit.bnet.id:3090',
    hotspot : "https://hotspot.bnet.id/pop.html",
    baseHotspot : "https://hotspot.bnet.id",
}

export const configHeaderPrimary = {
    headers : {
        "Content-Type" : "application/json",
    }
}

export const configWithOpenGuest = {
    headers : {
        "Content-Type" : "application/json",
        "apiKey" : "F7senIeAsLqi9TgKX0cyDiaZzCcrO6ptcs9o0sjCk18"
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
