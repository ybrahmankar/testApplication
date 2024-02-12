import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splashscreen = ({navigation}: any) => {

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        navigation.reset({
          index:0,
          routes:[{name:"Home"}]
        })
      }else{

        navigation.reset({
          index:0,
          routes:[{name:"Login"}]
        })
       
      }
    } catch (e) {
      // error reading value
    }
  };


  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 2000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.imgStyle}
        source={require('../assets/logo.png')}
      />
    </View>
  );
};





export default Splashscreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    height: 100, width: 100
  },
});
