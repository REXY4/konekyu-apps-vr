import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import FontStyle from '../../../types/FontTypes';
import Colors from '../../../components/colors/Colors';
import { goBack, navigate } from '../../../routers/NavRef';
import ScreenActionType from '../../../routers/types/ScreenActionType';
import { useDispatch } from 'react-redux';
import AuthActionType from '../../../state/actions-type/auth.type';

interface Props {
    modalVisible : boolean,
    setShow : any
    onPress : any
}
const ModalVoucherUse = ({modalVisible, setShow, onPress}:Props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          setShow(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Apakah kamu yakin akan menggunakan voucher ini !</Text>
            <View style={{
                flexDirection  :"row",
                justifyContent : "space-between",
            }}>
            <Pressable
              style={[styles.button,{width : "35%"}, styles.buttonOpen]}
              onPress={() => {
                setShow(false);
              }}>
              <Text style={styles.textStyle}>Batalkan</Text>
            </Pressable>
            <Pressable
              style={[styles.button2, {width : "35%", marginLeft : 10},styles.buttonOpen2]}
              onPress={onPress}>
              <Text style={styles.textStyle}>Ya</Text>
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
    padding: 10,
    elevation: 2,
  },
  button2: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen2: {
    backgroundColor: Colors.ResColor.blue,
  },
  buttonOpen: {
    backgroundColor: Colors.ResColor.yellow2,
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

export default ModalVoucherUse;