import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BtnComponent from '../components/BtnComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const Home = ({navigation}: any) => {

 
  const [data, setData] = useState([
    {name: 'Fname Lname', age: 12, address: 'abcd'},
  ]);

  const onPressbtn = () => {
    navigation.navigate('Employee');
  };


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


  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getData();
    }
  }, [isFocus]);

  useEffect(() => {
   console.log("data======",data)
  }, [data]);

  return (
    <SafeAreaView style={styles.mainCont}>
      <View style={styles.cont}>
        <BtnComponent
          title={'add employee'}
          onPress={() => {
            onPressbtn();
          }}
        />
        <FlatList
          data={data}
          extraData={data}
          renderItem={({item}) => {
            return (
              <View style={styles.flatCont}>
                <Text style={styles.flatname1} numberOfLines={1}>{item.name}</Text>
                <View
                  style={styles.flatRow}>
                  <Text style={styles.flatname}>
                    Age: {item.age}
                  </Text>
                  <Text style={styles.flatname}>
                    Address: {item.address}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
    mainCont:{backgroundColor: '#fff', flex: 1,},
    cont:{marginHorizontal: 10,marginBottom:100},
    flatCont:{backgroundColor: '#e8e8e8', padding: 10,marginBottom:10,borderRadius:8},
    flatRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      flatname1:{color: '#000', fontSize: 20,maxWidth:"98%",fontWeight:"bold"},
      flatname:{color: '#000', fontSize: 18,maxWidth:"45%"}
});
