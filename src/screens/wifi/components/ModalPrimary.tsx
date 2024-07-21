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
}
const ModalPrimary = ({modalVisible}:Props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          dispatch({
            type : AuthActionType.MODAL_ALERT,
            modal : false
          })
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pastikan kamu sudah terhubung ke jaringan koneksi <Text style={{color : Colors.ResColor.yellow}}>KonekYu</Text>!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                dispatch({
                  type : AuthActionType.MODAL_ALERT,
                  modal : false
                })
              }}>
              <Text style={styles.textStyle}>Mengerti</Text>
            </Pressable>
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

export default ModalPrimary;