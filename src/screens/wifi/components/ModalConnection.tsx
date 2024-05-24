import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions} from 'react-native';
import FontStyle from '../../../types/FontTypes';
import Colors from '../../../components/colors/Colors';
import { goBack, navigate } from '../../../routers/NavRef';
import ScreenActionType from '../../../routers/types/ScreenActionType';
import { useDispatch } from 'react-redux';
import AuthActionType from '../../../state/actions-type/auth.type';
import InputPrimary from '../../../components/inputs/InputPrimary';
import { WifiIcon } from '../../../components/icons/Icon';
const {width} = Dimensions.get("screen");
import WifiManager, { WifiEntry } from "react-native-wifi-reborn";


interface Props {
    modalVisible : boolean,
    ssid: string
    setModal : any
    reload :any
}
const ModalConnection = ({modalVisible, ssid, setModal, reload}:Props) => {
  const [password, setPassword] = useState<string>("");
const handleSubmit = () =>{
  WifiManager.connectToProtectedWifiSSID({
    ssid: ssid,
    password: password,
    isWEP: true,
    timeout: 3000
}).then(
    result=>{
        reload()
        setModal(false)
    },
    ()=>{
        console.log("fail to connect ")
    }
);   
}

    return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
                width : width / 1.5,
            }}>
                <View style={{
                    flexDirection  :"row",
                    alignItems  :"center",
                    marginBottom  :15,
                }}>
                <WifiIcon size={24} color={Colors.ResColor.yellow}/>
                <Text style={{
                    fontFamily :FontStyle.BOLD,
                    fontSize : 21,
                }}> {ssid}</Text> 
                </View>
                <InputPrimary label={""} type={"default"}
                 passwordIcon={true} 
                onChange={(val:string)=>setPassword(val)}
                placeholder={'Masukan Password'}/>
            </View>
            <View style={{
                        width : width /1.5,
                        flexDirection  :"row",
                        justifyContent : "space-between"
            }}>
                <Pressable
              style={[styles.button, styles.buttonClose,{ marginTop : 20,height : 50, width : "40%",borderRadius : 10, backgroundColor :Colors.ResColor.yellow}]}
              onPress={() => {
              setModal(false)
              }}>
              <Text style={styles.textStyle}>Batal</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose,{ marginTop : 20,height : 50, width : "40%",borderRadius : 10,}]}
              onPress={() => {
              handleSubmit()
              }}>
              <Text style={styles.textStyle}>Hubungkan</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.ResColor.blue,
  },
  buttonClose: {
    backgroundColor: Colors.ResColor.blue,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily :FontStyle.BOLD,
  },
  modalText: {
    marginBottom: 16,
    fontFamily  : FontStyle.MEDIUM,
    color : Colors.ResColor.black,
    textAlign: 'center',
  },
});

export default ModalConnection;