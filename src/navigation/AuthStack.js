import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from '../screens/LoginPage';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AuthStack;
