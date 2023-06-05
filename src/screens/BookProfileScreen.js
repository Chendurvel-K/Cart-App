import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import useCart from "../navigation/useCart";
import storage from "@react-native-firebase/storage";

const BookProfileScreen = ({ navigation }) => {
  const routes = useRoute();
  const data = routes.params;
  const { cart, addToCart, removeFromCart } = useCart();
  console.log("list", data);

  const getFile = async () => {
    const url = await storage().ref().getDownloadURL();
    console.log("get File", url);
    return alert(url);
  };

  const handleAddToCart = (item1) => {
    const cartItem = cart?.find((item) => item.productId === item1.id);

    var quantity = 1;

    if (cartItem) {
      quantity += cartItem.quantity;
    }

    addToCart(
      item1.id,
      quantity,
      item1.price,
      item1.name,
      item1.author,
      item1.imgUrl
    );
  };

  const handleRemoveFromCart = (item1) => {
    const cartItem = cart?.find((item) => item.productId === item1.id);
    if (cartItem) {
      removeFromCart(cartItem.id, cartItem.quantity - 1);
    }
  };

  const handleMethodQuantity = (bookId) => {
    const cartItem = cart?.find((item) => item.productId === bookId.id);

    if (cartItem === null || cartItem === undefined) {
      return 0;
    }
    return cartItem.quantity;
  };
  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.outerContainer}>
        <View style={styles.outerLeftContainer}>
          <Image source={{ uri: data.item.imgUrl }} style={styles.thumbnail} />
        </View>
        <View style={styles.outerRightContainer}>
          <Text style={styles.textTitle} numberOfLines={2}>
            {data.item.name}
          </Text>
          <Text style={styles.textAuthor}>by {data.item.author}</Text>
          <Text
            style={[styles.textAuthor, { fontWeight: "600", paddingTop: 5 }]}
          >
            Price: ${data.item.price}
          </Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.qtyText}>Qty : </Text>
        {handleMethodQuantity(data.item) === 0 ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleAddToCart(data.item)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleRemoveFromCart(data.item)}
              style={styles.button}
            >
              <Text style={styles.buttonText}> - </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert("Product Id:  " + data.item.id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {handleMethodQuantity(data.item)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAddToCart(data.item)}
              style={styles.button}
            >
              <Text style={styles.buttonText}> + </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.paymentContainer}>
        <View
          style={[
            styles.buttonContainer,
            { backgroundColor: "#FF7F50", borderRadius: 16 },
          ]}
        >
          <TouchableOpacity
            // onPress={() => alert("Sample Downloaded")}
            onPress={getFile}
            style={[styles.button, { width: "90%", alignItems: "center" }]}
          >
            <Text style={[styles.buttonText, { color: "#FFF" }]}>
              Download Sample
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.buttonContainer,
            { backgroundColor: "#FF7F50", borderRadius: 16 },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment")}
            style={[styles.button, { width: "90%", alignItems: "center" }]}
          >
            <Text style={[styles.buttonText, { color: "#FFF" }]}>
              Proceed To Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default BookProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#129",
    // justifyContent: "center",
  },
  outerContainer: {
    flex: 6,
    // backgroundColor: "red",
    alignItems: "center",
    // justifyContent: "center",
  },
  thumbnail: {
    width: 200,
    height: 270,
    margin: 20,
    // borderColor: "red",
    // borderWidth: 20,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  textAuthor: {
    fontSize: 18,
    fontWeight: "200",
  },
  outerLeftContainer: {
    marginBottom: 20,
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#a9a9a9",
    // width: "100%",
  },
  outerRightContainer: {
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: "pink",
    // justifyContent: "center",
    // width: "50%",
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 30,
  },
  qtyText: {
    // marginTop: 40,
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    // position: "absolute",
    justifyContent: "space-between",
    left: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 3,
    // marginTop: 30,
    borderWidth: 1,
    borderColor: "#a9a9a9",
  },
  button: {
    padding: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    padding: 0,
    fontSize: 21,
    color: "#000",
    fontWeight: 500,
  },
  paymentContainer: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "green",
  },
});
