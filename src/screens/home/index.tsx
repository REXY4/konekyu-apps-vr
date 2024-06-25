import axios from "axios";
import { Dimensions, ImageBackground, SafeAreaView, ScrollView, StatusBar, View, StyleSheet  } from "react-native";
import { BaseUrl, configWithJwt, configWithOpenGuest } from "../../../config/api";
import  CarrouselPrimary from "../../components/carrousels/CarrouselPrimary"
import Colors from "../../components/colors/Colors";
import { Suspense, lazy, useEffect, useState } from "react";
import { ArticleDash, DashboardSlider } from "../../entities/dashboard.entities";
import Connect from "./components/Connect";
import VoucherDash from "./components/Voucher";
import HostpotTerdekat from "./components/hostpotTerdekat";
import ArtikelData from "./components/ArtikelData";
import LocationUseCase from "../../use-case/location.usecase";
import MapLoader from "../../components/loading/MapLoader";
import GetLocation from "react-native-get-location";
import LoadingPage from "../onboarding/LoadingPage";
const height = Dimensions.get("window").height;

const MapLocation = lazy(()=>import("../locations/components/MapLocation"))

const HomeScreen = () =>{
    const [sliderData, setSliderData] = useState<Array<DashboardSlider> | null>(null)
    const [artikelData, setArtikelData] = useState<Array<ArticleDash> | null>(null)
    const [myLocation, setMyLocation] = useState<any|null>(null)
    
    const {GetLocationMember, getConnection}= LocationUseCase();
    const getSlideData = async () =>{
        try{
            const response = await axios.get(`${BaseUrl.baseProd}/member/landing/sliders`, configWithOpenGuest);
            if(response.status == 200){
                setSliderData(response.data.featured_sliders)
            }else{
                setSliderData(null)
            }
        }catch(err){
            console.log("check err",err)
        }
    }



    useEffect(()=>{
        const interval = setInterval(()=>{
          getConnection()
        },10000);
    
        return ()=> clearInterval(interval);
      },[]);

    const handleGetLocation =async ()=>{
        await  GetLocation.getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 6000,
        })
        .then(location => {
          setMyLocation(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
     }

    const getArtikel = async () =>{
        try{
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/articles?pop_id=28`, configWithOpenGuest);
            if(response.status == 200){
                setArtikelData(response.data.articles)
            }else{
                setArtikelData(null)
            }
        }catch(err){
            console.log("check err",err)
        }
    }

    useEffect(()=>{
        getSlideData();
        getArtikel();
        handleGetLocation()
        GetLocationMember();
    },[]);

    return (
        <SafeAreaView style={{
            height : "100%",
            backgroundColor : Colors.ResColor.lightBlue
        }}>
            <StatusBar backgroundColor={Colors.ResColor.blue}/>
          <ScrollView>
            <View style={{
                marginBottom : 50
            }}>
            <ImageBackground 
            resizeMode="cover"
            style={{
                height : height / 3,
                paddingTop : 25,
            }}
            source={require("../../../assets/images/appbar_dashboard.png")}>
                {sliderData !== null ?
                <CarrouselPrimary data={sliderData}/> 
                 : null}
            </ImageBackground>
            <View style={{
                paddingTop : 15,
                padding : 15,
                backgroundColor : Colors.ResColor.white,
                elevation : 3,
            }}>
                <Connect/>
                <View style={{
                    marginTop : 20,
                }}>
                <VoucherDash/>
                </View>
            </View>
            <View style={{
                marginTop : 15,
               
                  backgroundColor : Colors.ResColor.white,
                  elevation : 3,
            }}>
                <HostpotTerdekat/>
                <View>
                <View style={{
                    height : 300,
                    // marginTop : 10,
                    backgroundColor  :Colors.ResColor.grayOpacity,
                    marginBottom : 20,
                }}>
                    <Suspense fallback={<MapLoader/>}>
                        <MapLocation myLocation={myLocation}/>
                  </Suspense>
                </View>
            </View>
            </View>
            <View style={{
                paddingTop : 15,
                padding : 15,
                backgroundColor : Colors.ResColor.white,
                elevation : 3,
                marginTop  :20,
                height  :"100%"
            }}>
                {artikelData !== null &&
                <ArtikelData data={artikelData}/>
                }
            </View>
            </View>
           
            </ScrollView>
           
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default HomeScreen;