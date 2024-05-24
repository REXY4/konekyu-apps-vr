import { SafeAreaView, View } from 'react-native';
import {
    Appodeal,
    AppodealAdType
} from 'react-native-appodeal';

export enum TokenIdAdsense {
    android = "a83e11e2d2c38c1262c56578aba658ff3c1160bdd24c2f4a"
}

const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER;
Appodeal.initialize(TokenIdAdsense.android, adTypes)

 
// static String appKey = Platform.isAndroid
// ? "a83e11e2d2c38c1262c56578aba658ff3c1160bdd24c2f4a"
// : "2eeec23792082718b1392995eaec91b0ebffdbd4aba12dd6";

const AdsenseBanner = () =>{
    return (
        <View>
      
        </View>
    )
}

export default AdsenseBanner;