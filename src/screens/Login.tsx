import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import BtnComponent from '../components/BtnComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

  const onPressLogin = () => {
    if (userName == '') {
      Alert.alert('please enter valid username');
    } else if (password == '') {
      Alert.alert('please enter valid password');
    } else {
      apiCall();
    }
  };

  const apiCall = () => {
    setLoader(true);
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: userName,
        password: password,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          Alert.alert(data.error);
        } else {
          storeData(data.token);
          navigation.navigate('Home');
        }
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {!loader ? (
        <View style={{marginHorizontal: 10}}>
          <CustomTextInput
            label={'Username'}
            placeholder={'Username'}
            value={userName}
            onChangeText={(txt: any) => {
              setUserName(txt);
            }}
          />
          <CustomTextInput
            label={'Password'}
            placeholder={'Password'}
            value={password}
            onChangeText={(txt: any) => {
              setPassword(txt);
            }}
            secureTextEntry={true}
          />
          <BtnComponent
            title={'login'}
            onPress={() => {
              onPressLogin();
            }}
          />
        </View>
      ) : (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#8735E1" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: '#fff', flex: 1, paddingVertical: 10},
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    width: '100%',
  },
});
