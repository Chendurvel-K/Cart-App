import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import useCart from "../navigation/useCart";

function Separator() {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#a9a9a9" }} />
  );
}

const PaymentScreen = () => {
  const { cart } = useCart();
  const [isChecked, setIsChecked] = useState(false);
  console.log("cart", cart);
  return (
    <View style={styles.container}>
      {/* <View style={styles.titleContainer}>
        <Text
          style={[
            styles.titleText,
            { backgroundColor: null, paddingHorizontal: "20%" },
          ]}
        >
          Name
        </Text>
        <Text
          style={[
            styles.titleText,
            { backgroundColor: null, paddingHorizontal: "6%" },
          ]}
        >
          Qty
        </Text>
        <Text
          style={[
            styles.titleText,
            { backgroundColor: null, paddingHorizontal: "5%" },
          ]}
        >
          Price
        </Text>
      </View> */}
      <View style={styles.listContainer}>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View
                style={{
                  flex: 10,
                  // backgroundColor: "green",
                  borderRadius: 12,
                  justifyContent: "center",
                  // paddingHorizontal: 20,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    // backgroundColor: "red",
                    padding: 20,
                    marginHorizontal: 0,
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  // backgroundColor: "grey",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    // backgroundColor: "blue",
                    padding: 10,
                  }}
                >
                  {item.quantity}
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  // backgroundColor: "#000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    // backgroundColor: "yellow",
                    padding: 10,
                  }}
                >
                  {item.price * item.quantity}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{}}>
        <View>
          <Text>HIIIIII</Text>
        </View>
        <View>
          <Text>HEllooo</Text>
        </View>
        <View>
          <Text>Welcome</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // backgroundColor: "red",
  },
  titleContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#FFF",
  },
  listContainer: {
    flex: 0,
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    margin: 0,
    padding: 10,
  },
});
