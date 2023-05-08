import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext, AuthProvider} from '../navigation/AuthProvider';
import useAuth from '../navigation/useAuth';

const SearchScreen = () => {
  // const {user} = useContext(AuthContext);
  const {user, initializing} = useAuth();
  console.log(user);
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
