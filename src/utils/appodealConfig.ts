// AppodealConfig.js
import {
    Appodeal,
    AppodealAdType,
    AppodealInterstitialEvent,
    AppodealLogLevel,
} from 'react-native-appodeal';

export const initializeAppodeal = () => {
    console.log("initital")
    const tokenAdsense=  {
        android : "a83e11e2d2c38c1262c56578aba658ff3c1160bdd24c2f4a"
      }
    // Menonaktifkan auto cache untuk iklan interstitial
    Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, true);
    // Mengaktifkan mode pengujian
    // Mengatur level logging ke DEBUG
    Appodeal.setLogLevel(AppodealLogLevel.DEBUG);

    // Mengatur perlakuan tidak diarahkan kepada anak
    Appodeal.setChildDirectedTreatment(false);
    // Inisialisasi SDK Appodeal dengan App Key Anda
    Appodeal.initialize(tokenAdsense.android, AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.REWARDED_VIDEO);
};
