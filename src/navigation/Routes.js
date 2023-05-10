import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import { signIn, signOut } from "../redux/reducer/authReducer";

const Routes = () => {
  console.log("Routes");
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      dispatch(signIn(user));
    } else {
      dispatch(signOut());
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
