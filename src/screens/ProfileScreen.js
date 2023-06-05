import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
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
        <View style={styles.outerContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "data:image/png;base64,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",
              }}
              style={styles.image}
            />
            <Text style={styles.userName}>Welcome {users.name}!</Text>
          </View>
          <View style={styles.listContainer}>
            {/* <View style={styles.listInnerContainer}> */}
            <TouchableHighlight
              onPress={() => alert("List of Ordres")}
              style={styles.myOrder}
              underlayColor={"#DDDDDD"}
            >
              <Text style={styles.textTitle}>My Orders</Text>
            </TouchableHighlight>
            {/* </View> */}
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.Button} onPress={handleSignOut}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>You're not signed in.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  outerContainer: {
    flex: 1,
    // justifyContent: "space-between",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    alignSelf: "center",
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
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    height: 200,
    width: 200,
    // resizeMode: "center",
    borderRadius: 100,
  },
  listContainer: {
    flex: 3,
    // backgroundColor: "blue",
    // borderWidth: 1,
  },
  userName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  myOrder: {
    // borderWidth: 1,
    padding: 20,
    marginTop: 15,
    backgroundColor: "#FFF",
    borderRadius: 12,
    // underlay: "red",
  },
  textTitle: {
    color: "#000",
    fontSize: 16,
  },
});
