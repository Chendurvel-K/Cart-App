import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import useCart from "../navigation/useCart";
import firestore from "@react-native-firebase/firestore";
import RazorpayCheckout from "react-native-razorpay";
import auth from "@react-native-firebase/auth";

function Separator() {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#a9a9a9" }} />
  );
}

export default function CartScreen({ navigation }) {
  const { cart, addToCart, removeFromCart, removeAllFromCart, orderListPost } =
    useCart();
  const dispatch = useDispatch();
  const userId = auth().currentUser?.uid;
  console.log("Cart", cart);
  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection("Cart")
  //     .doc.then((response) => {
  //       console.log("Delete Response", response);
  //     });
  //   return subscribe();
  // }, []);

  const deleteItemsFromCart = () => {
    firestore()
      .collection("Cart")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleAddToCart = (item1) => {
    item1.quantity = item1.quantity + 1;
    console.log("item quantity", item1.quantity);
    console.log("item quantity", item1.id);
    addToCart(
      item1.productId,
      item1.quantity,
      item1.price,
      item1.name,
      item1.author,
      item1.imgUrl
    );
  };

  const handleRemoveFromCart = (item1) => {
    removeFromCart(item1.id, item1.quantity - 1);
  };

  const handleAllRemoveFromCart = (item1) => {
    item1.quantity = 0;
    removeAllFromCart(
      item1.productId,
      item1.quantity,
      item1.price,
      item1.name,
      item1.author,
      item1.imgUrl
    );
  };

  const handleSubtotal = () => {
    console.log("Item lenght", cart.length);
    let SubTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      SubTotal += cart[i].price * cart[i].quantity;
    }
    return SubTotal;
  };

  // const deleteCartItem = () => {};

  const paymentHandle = () => {
    var options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_YNYdscDOJHJgfy",
      amount: amount,
      name: "ChendurVel",
      // order_id: "order_LvSnpkAl4wfQsl", //Replace this with an order_id created using Orders API.

      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        console.log("data", data);
        orderListPost(data);
        deleteItemsFromCart();
        navigation.navigate("Book");
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
    console.log("options", options);
    return options;
  };

  const amount = handleSubtotal() * 100;
  console.log("Amount", amount);

  const handlePayment = () => {
    if (cart.length > 0) {
      navigation.navigate("Payment");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 8 }}>
        {cart.length !== 0 ? (
          <FlatList
            data={cart}
            ItemSeparatorComponent={() => Separator()}
            renderItem={({ item }) => (
              <View style={styles.bookItemContainer}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <View style={styles.bookItemMetaContainer}>
                  <Text style={styles.textTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.textAuthor}>by {item.author}</Text>
                  <Text
                    style={[
                      styles.textAuthor,
                      { fontWeight: "600", paddingTop: 5 },
                    ]}
                  >
                    Price: ${item.price}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleRemoveFromCart(item)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}> - </Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleAddToCart(item)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}> + </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAllRemoveFromCart(item)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartMessage}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dRql5xwTZNAE4rSZ3sTJScYDjdu7wI3XDKrrLCMB8g&usqp=CAU&ec=48600113",
                }}
                style={styles.imageSize}
              />
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FF7F50",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 12,
            backgroundColor: "#FFF",
            width: "95%",
            height: "70%",
            // {...cart.length ==0 ? (justifyContent: "center") :(justifyContent: 'space-between')}
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 12,
              // marginRight: 50,
            }}
          >
            Total $ {handleSubtotal()}
          </Text>
          {cart.length !== 0 ? (
            <TouchableOpacity
              onPress={() => paymentHandle()}
              style={{
                borderRadius: 12,
                marginRight: 12,
                // marginLeft: 50,
                backgroundColor: "#FF7F50",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 20,
                  padding: 10,
                  paddingHorizontal: 40,
                }}
              >
                Pay
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={true} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookItemContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#EEE",
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  bookItemMetaContainer: {
    padding: 5,
    paddingLeft: 10,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "400",
  },
  textAuthor: {
    fontSize: 18,
    fontWeight: "200",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 110,
    left: 10,
    borderRadius: 8,
    backgroundColor: "#FF7F50",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 22,
    color: "#fff",
  },
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartMessage: {
    fontSize: 28,
    padding: 80,
  },
  imageSize: {
    height: 200,
    width: 200,
    resizeMode: "stretch",
  },
});
