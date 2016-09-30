/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
const firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCeA4jrsADE9EMjlTWsWIQRNb0MkyOacbA",
  authDomain: "hashapps-mobilebe-test.firebaseapp.com",
  databaseURL: "https://hashapps-mobilebe-test.firebaseio.com",
  storageBucket: "hashapps-mobilebe-test.appspot.com",
  messagingSenderId: "552571618641"
};
firebase.initializeApp(config);

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import Login from './Screens/Login'
import Signup from './Screens/Signup'
import ForgetPassword from './Screens/ForgetPassword'
import FriendsList from './Screens/FriendsList'
import Chat from './Screens/Chat'

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
const Router = createRouter(() => ({
  login: () => Login,
  signup: () => Signup,
  forgetPassword: () => ForgetPassword,
  friendsList: () => FriendsList,
  chat: () => Chat
}));

export default class Firechat extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content"/>
        <NavigationProvider router={Router}>
          <StackNavigation initialRoute={Router.getRoute('login') } />
        </NavigationProvider>
      </View>
    );
  }
}

