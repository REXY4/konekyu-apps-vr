import axios from "axios";
import { Dimensions, ImageBackground, SafeAreaView, ScrollView, StatusBar, View, StyleSheet  } from "react-native";
import { BaseUrl, configWithJwt } from "../../../config/api";
import CarrouselPrimary from "../../components/carrousels/CarrouselPrimary";
import Colors from "../../components/colors/Colors";
import AuthUseCase from "../../use-case/auth.usecase";
import { useEffect, useState } from "react";
import { ArticleDash, DashboardSlider } from "../../entities/dashboard.entities";
import Connect from "./components/Connect";
import VoucherDash from "./components/Voucher";
import HostpotTerdekat from "./components/hostpotTerdekat";
import ArtikelData from "./components/ArtikelData";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import LocationUseCase from "../../use-case/location.usecase";
import MapLocation from "../locations/components/MapLocation";
const height = Dimensions.get("window").height;

const HomeScreen = () =>{
    const [sliderData, setSliderData] = useState<Array<DashboardSlider> | null>(null)
    const [artikelData, setArtikelData] = useState<Array<ArticleDash> | null>(null)
    const {GetLocationMember}= LocationUseCase();
    const getSlideData = async () =>{
        try{
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/dashboard/sliders`, config);
            if(response.status == 200){
                setSliderData(response.data.featured_sliders)
            }else{
                setSliderData(null)
            }
        }catch(err){
            console.log("check err",err)
        }
    }

    const getArtikel = async () =>{
        try{
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/dashboard/articles`, config);
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
                <CarrouselPrimary data={sliderData}/> : null}
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
                  <MapLocation/>
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