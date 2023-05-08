import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {signIn, signOut, signUp} from '../redux/reducer/authReducer';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    console.log('1111', user);
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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {initializing, user};
};

export default useAuth;

// .....................unSubscriber code..........................
// import {useEffect, useState} from 'react';
// import {useDispatch} from 'react-redux';
// import auth from '@react-native-firebase/auth';
// import {signIn, signOut} from '../redux/reducer/authReducer';

// const useAuth = () => {
//   const dispatch = useDispatch();
//   const [initializing, setInitializing] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(user => {
//       if (user) {
//         dispatch(signIn(user));
//       } else {
//         dispatch(signOut());
//       }
//       // if (initializing) {
//       //   setInitializing(initializing);
//       // }
//     });

//     return unsubscribe;
//   }, [dispatch]);

//   return;
// };

// export default useAuth;
