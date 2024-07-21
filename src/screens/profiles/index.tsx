import { Image, ImageBackground, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native"
import { View } from "react-native";
import Colors from "../../components/colors/Colors";
import AuthUseCase from "../../use-case/auth.usecase";
import FontStyle from "../../types/FontTypes";
import { ArrowRightIcon, LockIcon, LogoutIcon, PinLocIcon, StarIcon, WifiIcon } from "../../components/icons/Icon";
import { TabBarIconProfile, TabBarIconVoucher } from "../../components/icons/TabBarIcon";
import { useDispatch } from "react-redux";
import AuthActionType from "../../state/actions-type/auth.type";
import { navigate } from "../../routers/NavRef";
import ScreenActionType from "../../routers/types/ScreenActionType";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Profiles = () =>{
    const {authResult} = AuthUseCase();
    const dispatch = useDispatch()
    const GetName = (name:string) =>{
        const splitName = name.split(' ');
        console.log(splitName.length)
        if(splitName.length == 1){
            return name.split(' ')[0].substring(0,1).toUpperCase()
         }else if(splitName.length == 2){
            return name.split(' ')[0].substring(0,1).toUpperCase() + name.split(' ')[1].substring(0,1).toUpperCase() 
         }else if(splitName.length > 2){
            return name.split(' ')[0].substring(0,1).toUpperCase() + name.split(' ')[1].substring(0,1).toUpperCase() + name.split(' ')[2].substring(0,1).toUpperCase() 
         }
    }
    return (
        <SafeAreaView style={{
            height : "100%",
            backgroundColor  :Colors.ResColor.lightBlue,
        }}>
            <ImageBackground
            resizeMode="cover"
             source={require("../../../assets/images/appbar_dashboard.png")}
            style={{
                padding : 15,
                elevation : 3,
                zIndex : 2,
            }}>
                <View style={{
                    backgroundColor : Colors.ResColor.white,
                    width : 50,
                    borderRadius : 100,
                    alignSelf : "flex-end"
                }}>
                    <Image 
                    resizeMode="contain"
                    source={require("../../../assets/icons/iconNot.png")} 
                        style={{
                            width : 50,
                            height : 50,
                            objectFit : "fill",
                        }}
                    />
                </View>
                <View style={{
                    alignItems : "center"
                }}>
                    <View style={{
                        borderRadius : 100,
                        borderColor : Colors.ResColor.white,
                        borderWidth : 2,
                        width : 80,
                        height : 80,
                        flexDirection : "row",
                        alignItems : "center",
                        justifyContent : "center",
                    }}>
                        <View style={{
                            backgroundColor  : Colors.ResColor.white,
                            borderRadius  :100,
                            width : 70,
                            height : 70,
                            flexDirection : "row",
                            alignItems : "center",
                            justifyContent : "center",
                        }}>
                        <Text style={{
                            textTransform : "uppercase",
                            fontFamily :FontStyle.MEDIUM,
                            color : Colors.ResColor.blue,
                            fontSize : 21,
                        }}>{ GetName(String(authResult?.name)) }</Text>
                        </View>
                    </View>
                    <View>
                            <Text style={{
                                fontFamily : FontStyle.MEDIUM,
                                fontSize : 21,
                                color : Colors.ResColor.white,
                                marginTop : 5,
                            }}>{authResult?.name}</Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView>
            <View style={{
                backgroundColor :Colors.ResColor.yellow,
                width : "30%",
                borderBottomRightRadius : 10,
                paddingLeft : 10,
                elevation : 3,
                zIndex : 1,
            }}>
            <Text style={{
                fontFamily : FontStyle.BOLD,
                fontSize : 18,
                color : Colors.ResColor.white
            }}>Hostpot</Text>
            </View>
            <View style={{
                backgroundColor : Colors.ResColor.white,
                padding : 15,
                position : "relative",
                bottom : 5,
                elevation : 3,
                paddingTop : 20,
            }}>
                {/* <TouchableOpacity style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                    borderBottomColor : Colors.ResColor.black,
                    borderBottomWidth : 0.5,
                    paddingBottom : 15,
                    marginBottom  :15,
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 5,
                        }}>
                    <WifiIcon size={18} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}> Riwayat Wifi</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity> */}
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.LIST_LOCATION)}
                style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                    // borderBottomColor : Colors.ResColor.black,
                    // borderBottomWidth : 0.5,
                    // paddingBottom : 15,
                    // marginBottom  :15,
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 5,
                        }}>
                    <PinLocIcon size={18} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}>Lokasi Hotspot</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems : "flex-end",
                zIndex : 10,
            }}>
                <View style={{
                    backgroundColor :Colors.ResColor.yellow,
                    width : "30%",
                    borderBottomLeftRadius : 10,
                    paddingLeft : 10,
                    elevation : 3,
                    zIndex : 10,
                    position : "relative",
                    bottom : 5,
                }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    fontSize : 18,
                    color : Colors.ResColor.white
                }}>Profile</Text>
                </View>
            </View>
            <View style={{
                backgroundColor : Colors.ResColor.white,
                padding : 15,
                position : "relative",
                bottom : 8,
                elevation : 3,
                paddingTop : 20,
                zIndex : 5
            }}>
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.VOUCHER)}
                style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                    borderBottomColor : Colors.ResColor.black,
                    borderBottomWidth : 0.5,
                    paddingBottom : 15,
                    marginBottom  :15,
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 10,
                            transform: [{ rotate: '140deg' }]
                        }}>
                    <TabBarIconVoucher size={18} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}>Voucher</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.EDIT_PROFILE)}
                style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                    borderBottomColor : Colors.ResColor.black,
                    borderBottomWidth : 0.5,
                    paddingBottom : 15,
                    marginBottom  :15,
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 10,
                        }}>
                    <TabBarIconProfile size={18} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}>Ubah Data Profile</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>navigate(ScreenActionType.CHANGE_PASSWORD)}
                style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 10,
                        }}>
                    <LockIcon size={18} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}>Ubah Password</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems : "flex-start",
                zIndex : 8,
            }}>
                <View style={{
                    backgroundColor :Colors.ResColor.yellow,
                    width : "30%",
                    borderBottomRightRadius : 10,
                    paddingLeft : 10,
                    elevation : 3,
                    zIndex : 10,
                    position : "relative",
                    bottom : 8,
                }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    fontSize : 18,
                    color : Colors.ResColor.white
                }}>Lainya...</Text>
                </View>
            </View>
            <View style={{
                backgroundColor : Colors.ResColor.white,
                padding : 15,
                position : "relative",
                bottom : 10,
                elevation : 3,
                paddingTop : 20,
                zIndex : 5
            }}>
                <TouchableOpacity 
                onPress={()=>Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLScW908vfFY8xVZA8g5iScZtSRxVGFFDB-6W6fHkRlpshYimCw/viewform")}
                style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                    borderBottomColor : Colors.ResColor.black,
                    borderBottomWidth : 0.5,
                    paddingBottom : 15,
                    marginBottom  :15,
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 10,
                            transform: [{ rotate: '140deg' }]
                        }}>
                    <StarIcon size={24} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}>Nilai Kami</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    dispatch({
                        type : AuthActionType.LOGOUT
                    })
                    GoogleSignin.revokeAccess();
                    // navigate(ScreenActionType.LOGIN_SCREEN)
                }}
                style={{
                    flexDirection :"row",
                    justifyContent : "space-between",
                    alignItems  :"center",
                }}>
                    <View style={{
                        flexDirection  :"row",
                        alignItems : "center",
                    }}>
                        <View style={{
                            position : "relative",
                            bottom : 1,
                            marginRight : 10,
                        }}>
                    <LogoutIcon size={24} color={Colors.ResColor.black}/>
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontFamily : FontStyle.MEDIUM,
                        color : Colors.ResColor.black,
                    }}>Logout</Text>
                    </View> 
                    <ArrowRightIcon color={Colors.ResColor.gray} size={18}/>
                </TouchableOpacity>
               
            </View>
              
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profiles;