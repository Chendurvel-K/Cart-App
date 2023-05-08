import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
  const [user, setUser] = useState(null);
  const [book, setBook] = useState(null);
  const [cart, setCart] = useState(null);
  console.log('====================================');
  console.log('====================================');
  console.log('entered AuthProvider ', 'AuthContext');
  console.log('====================================');
  console.log('====================================');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (emailId, password) => {
          try {
            const value = await auth().signInWithEmailAndPassword(
              emailId,
              password,
            );
            // console.log(value);
            setUser(value.user);
          } catch (error) {
            console.log(error);
            alert('emailId or Password Invalid');
          }
        },
        register: async (name, mobileNumber, emailId, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(emailId, password)
              .then(response => {
                console.log('User account created & signed in!');
                const uid = response.user.uid;
                const data = {
                  id: uid,
                  name: name,
                  mobile: mobileNumber,
                  email: emailId,
                  password: password,
                };
                const usersRef = firestore().collection('users');
                usersRef
                  .doc(uid)
                  .set(data)
                  .then(() => {
                    console.log('User added!');
                    // console.log(usersRef);
                    navigation.navigate('Home', {user: data});
                  })
                  .catch(error => {
                    console.log('firebase: ' + error);
                  });
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }

                console.error(error);
              });
          } catch (error) {
            console.log(error);
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .then(() => {
                console.log('User account signed out!');
              });
          } catch (error) {
            console.log(error);
          }
        },
        // addToCart: async () => {
        //   try {
        //     firestore(response => {
        //       const uid = response.user.uid;
        //     });
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
