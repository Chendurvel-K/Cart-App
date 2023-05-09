import {ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {signIn, signOut, signUp} from '../redux/reducer/authReducer';

  

const Routes = () => {
  console.log("Routes");
    const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const onAuthStateChanged = user => {
    setUser(user);
    if (user) {
      dispatch(signIn(user));
    } else {
      dispatch(signOut());
    }
    // if (initializing) {
    //   setInitializing(false);
    // }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // if (initializing) {
  //   return <ActivityIndicator />;
  // }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
