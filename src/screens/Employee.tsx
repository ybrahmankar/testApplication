import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import BtnComponent from '../components/BtnComponent';

const Employee = ({navigation}:any) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [add, setAdd] = useState('');
  const [age, setAge] = useState('');

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');

      //    return jsonValue != null ? JSON.parse(jsonValue) : {};
      setData(JSON.parse(jsonValue));
      console.log('get=======');
    } catch (e) {
      console.log('get error============', e);

      // error reading value
    }
  };


  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userData', jsonValue);
      navigation.navigate("Home")
      
    } catch (e) {
      // saving error
      console.log('error============', e);
    }
  };

  useEffect(() => {
    getData()
  }, []);

  const save = () => {
    
    if (name == '' || add == '' || age == '') {
      Alert.alert('please enter valid data');
    }
    else{
        updateData()
    }
  };

 const  updateData = async ()=>{
if(data)
{
  let arr = data
  arr = [...arr,{name: name, age: age, address: add}]
  await storeData(arr)

}else{
  let arr = []
  arr = [...arr,{name: name, age: age, address: add}]
  await storeData(arr)

}
  }



  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{marginHorizontal: 10}}>
        <View style={{marginHorizontal: 10}}>
          <CustomTextInput
            label={'Name'}
            placeholder={'Name'}
            value={name}
            onChangeText={(txt: any) => {
              setName(txt);
            }}
          />
          <CustomTextInput
            label={'Address'}
            placeholder={'Address'}
            value={add}
            onChangeText={(txt: any) => {
              setAdd(txt);
            }}
          />
          <CustomTextInput
            label={'Age'}
            placeholder={'Age'}
            value={age}
            onChangeText={(txt: any) => {
              setAge(txt);
            }}
          />
          <BtnComponent
            title={'Save'}
            onPress={() => {
              save();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Employee;

const styles = StyleSheet.create({});
