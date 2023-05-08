import {ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import useAuth from './useAuth';

const Routes = () => {
  const {initializing, user} = useAuth();
  if (initializing) {
    return <ActivityIndicator />;
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
