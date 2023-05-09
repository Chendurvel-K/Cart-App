import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {signUp} from '../redux/reducer/authReducer';
import useAuth from '../navigation/useAuth';

export default function Register({navigation}) {
  const dispatch = useDispatch();
  const {initializing, user} = useAuth();
  const [name, setName] = useState();
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  // const {register} = useContext(AuthContext);

  // const baseUrl = 'https://crudcrud.com/api/f60e8ba157744593a353db041ccbca45';
  // const handleSubmit = () => {
  //   axios
  //     .post(`${baseUrl}/users`, {
  //       name: name,
  //       Dob: dateOfBirth,
  //       mobileNo: mobileNumber,
  //       emailId: emailId,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       navigation.goBack();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const handleSubmit = () => {
  //   auth
  //     .createUserWithEmailAndPassword(
  //       name,
  //       dateOfBirth,
  //       mobileNumber,
  //       emailId,
  //       password,
  //     )
  //     .then(userCredentials => {
  //       const user = userCredentials.user;
  //       console.log(user.name);
  //       console.log(user.dateOfBirth);
  //       // console.log(user.mobileNumber);
  //       console.log(user.emailId);
  //       console.log(user.password);
  //     })
  //     .catch(error => alert(error.message));
  // };

  const handleCheckEmail = text => {
    let checkEmail = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmailId(text);
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

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then(response => {
        const users = response.user;
        dispatch(signUp(users));
        console.log('User account created & signed in!');
        const userId = response.user.uid;
        const data = {
          id: userId,
          name: name,
          mobileNo: mobileNumber,
          email: emailId,
          password: password,
        };
        const usersRef = firestore().collection('users');
        usersRef
          .doc(userId)
          .set(data)
          .then(() => {
            console.log('User Added!');
          })
          .catch(error => {
            console.log('firestore', error);
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
  };

  if (initializing) {
    return <ActivityIndicator />;
  }

  if (user) {
    return 'Youare already signed up.';
  }

  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <ScrollView>
          <Text style={styles.titleText}>Name</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.textInput}
          />
          {/* <Text style={styles.titleText}>DOB</Text>
          <TextInput
            placeholder="DOB"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            style={styles.textInput}
          /> */}
          <Text style={styles.titleText}>Email Id</Text>
          <TextInput
            placeholder="Email Id"
            value={emailId}
            onChangeText={text => handleCheckEmail(text)}
            style={styles.textInput}
          />
          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong format email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          <Text style={styles.titleText}>Mobile No</Text>
          <TextInput
            placeholder="Mobile No"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            style={styles.textInput}
          />
          <Text style={styles.titleText}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={value => checkPasswordValidity(value)}
            style={styles.textInput}
          />
          {checkValidPassword ? (
            <Text style={styles.textFailed}>Wrong format password</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          <TouchableOpacity
            style={styles.submitButton}
            // onPress={() => register(name, mobileNumber, emailId, password)}
            onPress={handleSignUp}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    flex: 1,
    width: '90%',
    margin: 20,
    padding: 30,
    backgroundColor: '#fff',
    borderColor: '#FF7F50',
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: 10,
    shadowColor: '#000',
    shadowOpacity: 10,
  },
  titleText: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FF7F50',
    marginBottom: 20,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FF7F50',
    padding: 10,
    borderRadius: 12,
  },
  submitText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});
