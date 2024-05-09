import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type RootStackParamList = {
    MainScreen: undefined;
    LoginScrene: undefined,
    RegisterScreen: undefined
};

export const navigationRef = React.createRef<NavigationContainerRef<NativeStackNavigationProp<RootStackParamList>>>();

const navigate = (url: any) => {
    navigationRef.current?.navigate(url);
};

const goBack = () => {
    navigationRef.current?.goBack();
};

export { navigate, goBack };


