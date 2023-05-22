import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { signIn, signOut } from "../redux/reducer/authReducer";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      dispatch(signIn(user));
    } else {
      dispatch(signOut());
    }
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    console.log("UseAuth");
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return { initializing, user };
};

export default useAuth;
