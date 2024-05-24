import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

import { BackHandler } from 'react-native';
import LocationUseCase from '../../use-case/location.usecase';
import { navigate } from '../../routers/NavRef';
import ScreenActionType from '../../routers/types/ScreenActionType';



const XenditVoucher = () => {
    const [url, setUrl] = useState<string>('');
    const {xenditLink} = LocationUseCase();
  
    // const dispatch = useDispatch();



    useEffect(() => {
        if (url == 'https://my.bnet.id/login' || url == 'https://mydev1.bnet.id/login' || url == 'https://lapakaep.id/lapakaep-prod/id/') {
            // dispatch({
            //     type: SettingActionType.SET_ALERT,
            //     message: 'Pembayaran success',
            //     status: 'success',
            //     condition: true,
            // });
            // navigate('MainScreen');
        }
    }, [url]);

    const handleBack = (urls: string) => {
        setUrl(urls);
        if (urls == 'https://my.bnet.id/login' || urls == 'https://mydev1.bnet.id/login' || urls == 'https://lapakaep.id/lapakaep-prod/id/') {
            // dispatch({
            //     type: SettingActionType.SET_ALERT,
            //     message: 'Pembayaran success',
            //     status: 'success',
            //     condition: true,
            // });
             navigate(ScreenActionType.HOME);
        }
    };

    useEffect(() => {
        const backAction = () => {
            // navigate('MainScreen');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [url]);

    return (
        <WebView
            source={{ uri: xenditLink }}
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
            domStorageEnabled={true}
            cacheEnabled={true}
            allowFileAccessFromFileURLs={true}
            allowFileAccess={true}
            cacheMode="LOAD_NO_CACHE"
            onNavigationStateChange={(navState: any) => handleBack(navState.url)}
        />
    );
};

export default XenditVoucher;
