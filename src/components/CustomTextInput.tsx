import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomTextInput = (props: any) => {
  return (
    <View style={{marginVertical:10}}>
      <Text style={styles.labelStyle}>{props?.label}</Text>
      <TextInput
        style={{borderColor: 'gray', borderWidth: 1,borderRadius:8,color:"#000",}}
        placeholderTextColor={'gray'}
        value={props?.value}
        onChangeText={props?.onChangeText}
        placeholder={props?.placeholder}
        keyboardType={props.keyboardType ? props.keyboardType :'default'}
        secureTextEntry={props.secureTextEntry ?props.secureTextEntry:false}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({labelStyle:{fontSize:16,color:"#000",marginVertical:5,fontWeight:"bold"},
});
