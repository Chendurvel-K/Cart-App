import {View, Text} from 'react-native';
import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';

const Navigate = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Navigate;
