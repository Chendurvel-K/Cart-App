import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import useCart from "../navigation/useCart";

function ShoppingCartIcon() {
  const navigation = useNavigation();
  const { cart } = useCart();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={styles.button}
    >
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cart.length}</Text>
      </View>
      <Ionicons name="cart" size={30} color="#101010" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 25,
  },
  itemCountContainer: {
    position: "absolute",
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#FF5665",
    left: 22,
    bottom: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  itemCountText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ShoppingCartIcon;
