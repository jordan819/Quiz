import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native';
import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage';

function WelcomeScreen ({navigation}) {

  goToHome = () => {
    console.log('Going Home');
  }

  return (
    <View style={styles.root}>
      <Text>Testowy Tekst</Text>
      <Button
        onPress={() => navigation.navigate('Home')} // replace
        title='Click me'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: '80%',
  },
});

export default WelcomeScreen;
