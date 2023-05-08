import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {signIn} from '../redux/reducer/authReducer';
import useAuth from '../navigation/useAuth';

export default function LoginPage({navigation}) {
  const dispatch = useDispatch();
  const {initializing, user} = useAuth();
  const [emailId, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const [pressed, setPressed] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  const handleCheckEmail = text => {
    let checkEmail = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setemailId(text);
    if (checkEmail.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    let checkPasswordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    setPassword(value);
    if (checkPasswordRegex.test(value)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
    }
  };

  const hiddenPassword = () => {
    if (pressed === true) {
      setPressed(false);
    } else {
      setPressed(true);
    }
  };
  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(userCredential => {
        const users = userCredential.user;
        dispatch(signIn(users));
        console.log('Signed In', users.email);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };

  if (initializing) {
    return <Text>Hello</Text>;
  }

  if (user) {
    return console.log('You are already signed in.');
  }
  // const handleLogin = () => {
  //   const checkPassword = checkPasswordValidity(password);
  //   if (!checkPassword) {
  //     navigation.navigate('Book');
  //   } else {
  //     alert(checkPassword);
  //   }
  // };
  // const baseUrl = 'https://crudcrud.com/api/185c5e41538b454f836edbbe11c2d6eb';
  // axios
  //   .post('https://crudcrud.com/api/185c5e41538b454f836edbbe11c2d6eb/login', {
  //     emailId: emailId,
  //     password: password,
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // axios.get(`${baseUrl}/login/2`).then(response => {
  //   console.log(response.data);
  // });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.register}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>New Account?</Text>
      </TouchableOpacity>
      <Image
        style={styles.imageContainer}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7MQz5Rwln3KprR6x1o7rpz2vPNGTK7eCDOo_DzTQwg&usqp=CAU&ec=48600113',
        }}
      />
      <Text style={styles.titleText}>Login to Continue</Text>
      <View style={styles.inputContainer}>
        <View style={styles.userContainer}>
          <Ionicons name="person-outline" size={30} color="#FF7F50" />
          <TextInput
            placeholder="Email Id"
            style={styles.textContainer}
            value={emailId}
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Invalid email</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}
        <View style={styles.userContainer}>
          <Ionicons name="lock-closed-outline" size={30} color="#FF7F50" />
          <TextInput
            placeholder="Password"
            style={styles.textContainer}
            secureTextEntry={pressed}
            value={password}
            onChangeText={value => checkPasswordValidity(value)}
          />
          <TouchableOpacity onPress={hiddenPassword}>
            {pressed === true ? (
              <Ionicons
                name="eye-off-outline"
                size={30}
                color="#FF7F50"
                style={{right: 80}}
              />
            ) : (
              <Ionicons
                name="eye-outline"
                size={30}
                color="#FF7F50"
                style={{right: 80}}
              />
            )}
          </TouchableOpacity>
        </View>
        {checkValidPassword ? (
          <Text style={styles.textFailed}>Invalid Password</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}

        {emailId === '' || password === '' || checkPasswordValidity === true ? (
          <TouchableOpacity disabled style={styles.buttonDisabled}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            // onPress={() => login(emailId, password)}
            onPress={handleSignIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 100,
  },
  inputContainer: {
    marginTop: 20,
  },
  userContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    width: 350,
    alignItems: 'center',
  },
  textContainer: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 8,
    width: '100%',
  },
  titleText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
    color: '#999',
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FF7F50',
  },
  buttonText: {
    padding: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#F4F3FD',
  },
  buttonDisabled: {
    backgroundColor: '#567',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 50,
  },
  textFailed: {
    color: '#FF7F50',
  },
  register: {
    alignSelf: 'flex-end',
    bottom: '15%',
    right: 10,
  },
  registerText: {
    color: '#FF7F50',
    fontSize: 18,
    fontWeight: '500',
  },
});

// useEffect(() => {
// getAllUser();
// loginhandler();
// vetifyLoginHandler();
// });
// const validUser = () => {};
// function validUser() {
//   for(let index = 0; index < )
// }

// const loginhandler = () => {
//   let user = false;
//   for (let index = 0; index < login.length; index++) {
//     if (
//       login[index].emailId === emailId &&
//       login[index].Password === password
//     ) {
//       user = true;
//     }
//   }
//   if (user) {
//     navigation.navigate('Book');
//   } else {
//     Alert.alert('Bad Creds', ' invalid emailId of password');
//   }
// };
// };
// const vetifyLoginHandler = () => {
//   dispatch({type: 'LOGIN'});
// };

// const handleLogin = async () => {
//   try {
//     const response = await axios.post(
//       'https://crudcrud.com/api/2ed429cbb4df496096bfbf2a5df09809/users',
//       {
//         emailId,
//         password,
//       },
//     );
//     if (response.data.success) {
//       console.log('User is valid!');
//       navigation.navigate('Book');
//       // do something else, e.g. navigate to the home screen
//     } else {
//       console.log('Invalid credentials');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
// const verifyUser = () => {
//   {
//     data.map(item => {
//       key: item.id;
//       {
//         item.name;
//       }
//       console.log(item.name);
//     });
//   }
// };

// const callAddUser = () => {
//   // let params = {userId: 1, name: 'cv', password: '1212'};
//   // let params1 = {userId: 2, name: 'paratha', password: '1212'};
//   // let params2 = {userId: 3, name: 'sugan', password: '1212'};
//   let params3 = {
//     id: 11,
//     name: 'cv',
//     emailId: 'cv',
//     email: 'Sincere@april.biz',
//     password: '1212',
//     address: {
//       street: 'Kulas Light',
//       suite: 'Apt. 556',
//       city: 'Gwenborough',
//       zipcode: '92998-3874',
//       geo: {
//         lat: '-37.3159',
//         lng: '81.1496',
//       },
//     },
//     phone: '1-770-736-8031 x56442',
//     website: 'hildegard.org',
//     company: {
//       name: 'Romaguera-Crona',
//       catchPhrase: 'Multi-layered client-server neural-net',
//       bs: 'harness real-time e-markets',
//     },
//   };

//   axios
//     .post(
//       'https://jsonplaceholder.typicode.com/users',
//       // params,
//       // params1,
//       // params2,
//       params3,
//     )
//     .then(response => {
//       console.log('Response: ', response.data);
//     })
//     .catch(error => {
//       console.log('Error: ', error);
//     });
// };
// const callDeleteUser = userId => {
//   axios
//     .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
//     .then(response => {
//       console.log('Response: ', response?.data);
//     })
//     .catch(error => {
//       console.log('Error: ', error);
//     });
// };

// const getAllUser = () => {
//   axios
//     .get('https://jsonplaceholder.typicode.com/users')
//     .then(response => {
//       console.log('Response: ', response.data);
//     })
//     .catch(error => {
//       console.log('Error: ', error);
//     });
// };
// const getIdByUser = id => {
//   axios
//     .get(`https://jsonplaceholder.typicode.com/users/${id}`)
//     .then(response => {
//       console.log('Response: ', response.data);
//     })
//     .catch(error => {
//       console.log('Error: ', error);
//     });
