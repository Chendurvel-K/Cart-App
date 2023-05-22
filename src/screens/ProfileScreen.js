import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/reducer/authReducer";
import useAuth from "../navigation/useAuth";
import useCart from "../navigation/useCart";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { users } = useCart();

  const handleSignOut = () => {
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
