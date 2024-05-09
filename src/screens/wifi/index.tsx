import { SafeAreaView, Text, View } from "react-native"
import ModalPrimary from "./components/ModalPrimary";
import { useEffect, useState } from "react";
import Colors from "../../components/colors/Colors";
import AuthUseCase from "../../use-case/auth.usecase";
import { useDispatch } from "react-redux";
import AuthActionType from "../../state/actions-type/auth.type";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BaseUrl, configWithJwt } from "../../../config/api";

const WifiScreen = () =>{
    const  {modal} = AuthUseCase();
    const dispatch =  useDispatch();
    useEffect(() => {
        // Dispatch action to handle modal state when the screen is opened
        dispatch({
          type: AuthActionType.MODAL_ALERT,
          modal: true,
        });
      }, []); 
    return(
        <SafeAreaView style={{
            height : "100%",
            backgroundColor  :Colors.ResColor.lightBlue
        }}>
            <ModalPrimary  modalVisible={modal} />
        </SafeAreaView>
    )
}

export default WifiScreen;