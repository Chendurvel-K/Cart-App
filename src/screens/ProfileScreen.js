import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/reducer/authReducer";
import useAuth from "../navigation/useAuth";
import useCart from "../navigation/useCart";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const [users, setUsers] = useState();
  const { initializing, user } = useAuth();
  const { users } = useCart();
  const userId = auth().currentUser?.uid;

  // useEffect(() => {
  //   const unsubscribe = firestore().collection("users");
  //   unsubscribe.doc(userId).get();
  //   console.log("get Users", unsubscribe);
  // });

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection("users")
  //     .doc(userId)
  //     .onSnapshot((documentSnapshot) => {
  //       console.log("User data: ", documentSnapshot.data());
  //       setUsers(documentSnapshot.data());
  //     });

  //   // Stop listening for updates when no longer required
  //   return () => subscriber();
  // }, [userId]);

  const handleSignOut = () => {
    // if (!initializing) {
    //   console.log("Loadding");
    //   return <ActivityIndicator size={"large"} />;
    // }
    auth()
      .signOut()
      .then(() => {
        console.log("User Account Signed Out!");
      });
    dispatch(signOut());
  };
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.innerContainer}>
          <Text>Welcome {users.name}!</Text>
          <TouchableOpacity style={styles.Button} onPress={handleSignOut}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>You're not signed in.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    marginTop: 20,
    backgroundColor: "#FF7F50",
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  textButton: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
