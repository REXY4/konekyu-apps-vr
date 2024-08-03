import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Animated } from "react-native"
import WifiManager, { WifiEntry, connectToProtectedWifiSSID } from "react-native-wifi-reborn";
import Colors from "../../components/colors/Colors";
import { LockWifiIcon, RefreshIcon, WifiIcon } from "../../components/icons/Icon";
import FontStyle from "../../types/FontTypes";
import ModalConnection from "./components/ModalConnection";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import SettingActionType from "../../state/actions-type/setting.type";
import { useDispatch } from "react-redux";


const SearchWifiScreen = ()=>{
    const [wifiList, setWifiList] = useState<Array<WifiEntry> | []>([])
    const [wifiSSID, setWIFISSID] = useState<string>('');
    const rotateValue = useRef(new Animated.Value(0)).current;
    const [modalConnection, setModalConnection] = useState<boolean>(false);
    const [ssidForm, setSsidForm] = useState<string>("");
    const dispatch = useDispatch();

    const startRotateAnimation = () => {
        rotateValue.setValue(0); // Reset the value
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000, // 2 seconds
          useNativeDriver: true, // Use native driver for better performance
        }).start();
      };

    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1080deg'],
      });

    const handleWifiManager = () =>{
        startRotateAnimation();
        WifiManager.reScanAndLoadWifiList().then((result:any)=>{
            console.log("jalan", result)
        });
        WifiManager.loadWifiList().then(
            result =>{
                setWifiList(result)
                console.log("jalan")
            },
            ()=>{
                console.log("Cannto get List wifi")
            }
        )
        WifiManager.getCurrentWifiSSID().then(
            ssid => {
            setWIFISSID(ssid);
            },
            () => {
            setWIFISSID("")
          })
         
    }

    const handleModalConnection = (ssid:string, condition:boolean) =>{
        setSsidForm(ssid);
        if(condition){
            setModalConnection(true)   
        }else{
            WifiManager.connectToProtectedWifiSSID({
                ssid : ssid,
                password:  null,
            }).then(
                result=>{
                    handleWifiManager()
                    navigate(ScreenActionType.WIFI);
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen : true,
                        status : "success",
                        message : "Jaringan KonekYu Valid!"
                    }) 
                },
                ()=>{
                    console.log("fail to connect ") 
                    dispatch({
                        type : SettingActionType.SET_ALERT,
                        isOpen : true,
                        status : "error",
                        message : "Jaringan KonekYu tidak Valid!"
                    }) 
                }
            );   
        }
      }

    useEffect(() => {
            handleWifiManager();
      }, []);
   
            
    return (
        <SafeAreaView style={{
            height : "100%"
        }}>
            <View>
                <View style={{
                    backgroundColor :Colors.ResColor.blue,
                    padding : 15,
                }}>
                    <View style={{
                        backgroundColor :Colors.ResColor.darkBlue,
                        padding :10,
                        borderRadius : 5,
                    }}>
                        <Text style={{
                            color : Colors.ResColor.white,
                            fontFamily :FontStyle.MEDIUM,
                        }}>Silahkan pilih jaringan <Text style={{
                            color : Colors.ResColor.yellow,
                            fontWeight :"bold"
                        }}> KonekYu </Text> untuk menikmati fasilitas internet gratis dan paket voucher dari <Text style={{
                            color : Colors.ResColor.yellow,
                            fontWeight :"bold"
                        }}> KonekYu </Text>!</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{
                        padding : 15,
                    }}>
                        {wifiList[0] !== undefined && 
                        wifiList.filter(fil=>fil.SSID == "#KonekYu_gratis").map((item:WifiEntry)=>{
                            return(
                                <View style={{
                                    marginBottom : 20,
                                    borderBottomWidth : 0.5,
                                    paddingBottom : 20,
                                    borderBottomColor : Colors.ResColor.darkBlue,
                                    flexDirection  :"row",
                                    alignItems  :"center",
                                    justifyContent : "space-between"
                                }}>
                                    <View style={{
                                        flexDirection :"row",
                                        alignItems : "center"
                                    }}>
                                 <WifiIcon size={24} color={Colors.ResColor.black}/>
                                <Text style={{
                                    fontSize : 18,
                                    fontFamily : Colors.ResColor.black,
                                    paddingLeft : 10,
                                }}>{item.SSID} </Text>
                                {item.capabilities !== "[ESS]" && item.SSID !== wifiSSID &&
                                <LockWifiIcon size={21} color={Colors.ResColor.yellow}/>
                                }
                            </View>
                             <View style={{
                                    alignItems  :"flex-end"
                                }}>
                                    {item.SSID == wifiSSID ? 
                                (
                                    <TouchableOpacity
                                    // onPress={()=>WifiManager.disconnectFromSSID}
                                    style={{
                                        backgroundColor  :Colors.ResColor.blue,
                                        padding : 10,
                                        borderRadius : 10,
                                        elevation : 3,
                                    }}>
                                        <Text style={{
                                            color : Colors.ResColor.white,
                                            fontFamily : FontStyle.BOLD,
                                            fontSize : 14,
                                        }}>Terhubung</Text>
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity 
                                    onPress={()=>handleModalConnection(item.SSID, item.capabilities !== "[ESS]" ? true : false)}
                                    style={{
                                        backgroundColor  :Colors.ResColor.yellow,
                                        padding : 10,
                                        borderRadius : 10,
                                        elevation : 3,
                                    }}>
                                        <Text style={{
                                            color : Colors.ResColor.white,
                                            fontFamily : FontStyle.BOLD,
                                            fontSize : 14,
                                        }}>Hubungkan</Text>
                                    </TouchableOpacity>
                                )    
                                } 
                            </View>
                            </View>
                            )
                        })
                        }
                    </View>
                </ScrollView>
            </View>
                <Animated.View style={{
                    position : "absolute",
                    bottom : 50,
                    right : 15,
                    transform : [{rotate : rotateInterpolation}]
                }}>
                    <TouchableOpacity 
                    onPress={handleWifiManager}
                    style={{
                        backgroundColor  :Colors.ResColor.yellow,
                        borderRadius : 100,
                        padding : 10,
                    }}>
                        <RefreshIcon color={Colors.ResColor.white} size={40}/>
                    </TouchableOpacity>
            </Animated.View>
            <ModalConnection 
            reload={handleWifiManager} 
            setModal={setModalConnection} ssid={ssidForm} modalVisible={modalConnection}/>
        </SafeAreaView>
    )
}

export default SearchWifiScreen;