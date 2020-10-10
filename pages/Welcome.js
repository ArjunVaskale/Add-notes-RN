import React from 'react';
import {
  View,
  Text,TextInput,StyleSheet,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyAwClDpTnpHdVie-J1e6UHjXWrsCknE4nw",
    authDomain: "fireapp-25930.firebaseapp.com",
    databaseURL: "https://fireapp-25930.firebaseio.com",
    projectId: "fireapp-25930",
    storageBucket: "fireapp-25930.appspot.com",
    messagingSenderId: "1047324398097",
    appId: "1:1047324398097:web:52e5531cb5732cf84c57b0",
    measurementId: "G-44SF1G5KN1"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } 

  
  //9013151515


const Stack = createStackNavigator();

function welcomeNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Signup" component={Signup} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default welcomeNav ;
