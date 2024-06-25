import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import FontStyle from '../../../types/FontTypes';
import Colors from '../../../components/colors/Colors';
import { goBack, navigate } from '../../../routers/NavRef';
import ScreenActionType from '../../../routers/types/ScreenActionType';
import { useDispatch } from 'react-redux';
import AuthActionType from '../../../state/actions-type/auth.type';

interface Props {
    modalVisible : boolean,
    setModal :any
    name : string
    onPress:any
}
const ModalVoucher = ({modalVisible, setModal, name, onPress}:Props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require("../../../../assets/icons/iconVo.png")} style={{
              width : 40,
              height :40,
              objectFit : "fill",
              marginBottom : 10,
            }}/>
            <Text style={styles.modalText}>Silahkan klik beli untuk melanjutkan pembelians voucher <Text style={{
                color : Colors.ResColor.blue,
            }}>{name}</Text>!</Text>
            <View style={{
                flexDirection  :"row",
            }}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setModal(false);
                // dispatch({
                //   type : AuthActionType.MODAL_ALERT,
                //   modal : false
                // })
                // navigate(ScreenActionType.HOME);
              }}>
              <Text style={styles.textStyle}>Batalkan</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}>
              <Text style={styles.textStyle}>Beli</Text>
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
    borderRadius: 10,
    width : "45%",
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.ResColor.yellow,
    marginRight : 20,
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

export default ModalVoucher;