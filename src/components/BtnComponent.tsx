import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const BtnComponent = (props: any) => {
  return (
    <TouchableOpacity style={styles.btnCont} onPress={() => props.onPress()}>
      <Text style={styles.txtStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default BtnComponent;

const styles = StyleSheet.create({
  btnCont: {backgroundColor: '#de572f', marginVertical: 20, borderRadius: 8},
  txtStyle: {padding: 10, textAlign: 'center', color: '#fff', fontSize: 20,fontWeight:"bold"},
});
