import axios from "axios";
import { Image, SafeAreaView, View, Dimensions, Text, ScrollView } from "react-native"
import { BaseUrl, configWithJwt } from "../../../config/api";
import { useEffect, useState } from "react";
import FontStyle from "../../types/FontTypes";
import Colors from "../../components/colors/Colors";
import RenderHtml, { HTMLElementModelRecord } from 'react-native-render-html';
import LocationUseCase from "../../use-case/location.usecase";
const {height, width} = Dimensions.get("window");

export interface DetailArtikle {
        "id": number,
        "category_id": number,
        "slug": string,
        "title": string,
        "content": string,
        "video_link": any,
        "published_at": string,
        "published_at_formatted": string,
        "category": {
            "id": number,
            "name": string
        },
        "main_image": [
            {
                "id": number,
                "entity_id": number,
                "url": string
            }
        ]
    }

const ArtikleScreen = () =>{
    const {detailId} = LocationUseCase();
    const [artikelData, setArtikelData] = useState<DetailArtikle | null>(null)

    const getDetailArtikle  = async () =>{
        try {
            const config = await configWithJwt();
            const response = await axios.get(`${BaseUrl.baseProd}/member/dashboard/articles/${detailId}`, config);
            if(response.status == 200){
                setArtikelData(response.data.article);
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log("check detail id ",detailId)

    useEffect(()=>{
        getDetailArtikle();
    },[]);


    return (
        <SafeAreaView>
            <ScrollView>
            {artikelData &&
            (
            <>
            <View style={{
                width : "100%",
                height : height / 2.5,
                elevation : 3,
            }}>
                <Image 
                resizeMode="cover"
                source={{uri : artikelData.main_image[0].url}} style={{
                    width : "100%",
                    height : "100%",
                    objectFit : "fill",
                }}/>
            </View>
            <View>
            <View style={{
                backgroundColor : Colors.ResColor.yellow,
                flexDirection  :"row",
                justifyContent : "flex-end",
                padding : 5,
                position :"absolute",
                right : 0,
                elevation : 3,
                borderBottomLeftRadius :10, 
            }}>
            <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.white,
                    fontSize : 14,
                }}>{artikelData.published_at_formatted}</Text>
            </View>
            <View  style={{
                padding  : 15,
                marginTop : 30,
            }}>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.black,
                    fontSize : 18,
                }}>{artikelData.title}</Text>
                <Text style={{
                    fontFamily : FontStyle.BOLD,
                    color : Colors.ResColor.yellow,
                    fontSize : 14,
                }}>{artikelData.category.name}</Text>
                <View style={{
                    borderBottomWidth : 1,
                    paddingTop : 10,
                    paddingBottom : 10,
                    borderBottomColor : Colors.ResColor.gray,
                }}/>
                <View >
                <RenderHtml 
                contentWidth={width}
                source={{html :artikelData.content }}/>
                </View>
            </View>
            </View>
            </>
            )
            }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ArtikleScreen;