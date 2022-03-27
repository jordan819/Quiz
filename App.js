import React, { useEffect, useState, useRef } from 'react';
import { Button, View, Image, StyleSheet, Text, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/screens/Home';
import TestScreen from './src/screens/Test';
import ResultsScreen from './src/screens/Results';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

export default function App() {
  const { getItem, setItem } = useAsyncStorage('@isFirstRun');
  // const { initialRoute, setInitialRoute } = useState("Home");

  const [ isFirstRun, setIsFirstRun ] = useState(false);

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const storeData = async (value) => {
    await setItem(JSON.stringify(false));
  }

  const getData = async () => {
    const value = await AsyncStorage.getItem('@isFirstRun')
    if(value !== 'false') {
      setIsFirstRun(true);
      console.log('Opening WelcomeScreen');
    } else {
      setIsFirstRun(false);
      console.log('Opening app');
    }
  }

  useEffect(() => {
    getData();
    storeData();
    console.log(isFirstRun);
  }, []);


  /////////////////////////////// SPLASH ////////////////////////////
  const [authLoaded, setAuthLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 3000);
  }, []);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };

  if (!authLoaded) {
    return (
      <View style={styles.root}>
        <LottieView
          ref={animation => {
            ref.current = animation;
          }}
          style={styles.lottieView}
          source={require('./splash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={onAnimationFinish}
        />
      </View>
    );
  }



  if (isFirstRun) {
    return (
      <SafeAreaView style={{
        flex: 1,
        paddingHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{fontSize: 40, marginBottom: 20}}>Regulamin</Text>
        <Text style={{textAlign: 'center', marginBottom: 40}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at lacinia est.
          Aliquam commodo luctus semper. Sed quis tempor lectus, quis varius neque. Curabitur odio
          felis, accumsan id faucibus sit amet, pharetra ut dui. Fusce aliquam justo ut metus
          commodo suscipit. Etiam in erat nisi. Fusce vitae metus a ligula maximus varius.
          Vestibulum tempor mauris id augue suscipit, in sollicitudin enim sagittis. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Vestibulum scelerisque, purus sed euismod eleifend, sapien enim pharetra odio, et
          finibus leo neque id erat. Curabitur ac ornare tellus. Sed rutrum viverra risus, ac
          convallis lorem tristique scelerisque.
        </Text>
        <Button
          onPress={() => setIsFirstRun(false)}
          title='Akceptuję'
        />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home' screenOptions={{
        drawerStyle: {
          backgroundColor: '#4db6ac',
          width: 240,
        },
        headerStyle: {
          backgroundColor: '#00857c',
        },
        headerTitleAlign: 'center',
      }}>
        <Drawer.Screen name="Home" component={HomeScreen}
        options={{
          drawerIcon: config => <Icon
              size={23}
              name={'home-outline'}
              color={'black'}></Icon>
            }}/>
        <Drawer.Screen name="Test" component={TestScreen}
          options={{
            drawerIcon: config => <Icon
                size={23}
                name={'ballot-outline'}
                color={'black'}></Icon>
          }}
        />
        <Drawer.Screen name="Results" component={ResultsScreen}
          options={{
            drawerIcon: config => <Icon
                size={23}
                name={'bookmark-check-outline'}
                color={'black'}></Icon>
              }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: '80%',
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
