import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useCart from "../navigation/useCart";
import { CheckBox } from "react-native-elements";

function Separator() {
  return <View style={{ borderBottomWidth: 1, borderBottomColor: "#1222" }} />;
}

const PaymentScreen = () => {
  const { cart } = useCart();
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  console.log("cart", cart);

  const handleSubtotal = () => {
    console.log("Item lenght", cart.length);
    let SubTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      SubTotal += cart[i].price * cart[i].quantity;
    }
    return SubTotal;
  };

  const handlePayment = () => {
    if (checked || isChecked || selected || isSelected) {
      alert("Payment Success");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.listContainer}>
          {/* <FlatList
            data={cart}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => ( */}
          {cart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
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
                    // marginHorizontal: 0,
                    padding: 15,
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
                  style={
                    {
                      // backgroundColor: "blue",
                      // padding: 10,
                    }
                  }
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
                  style={
                    {
                      // backgroundColor: "yellow",
                      // padding: 10,
                    }
                  }
                >
                  {item.price * item.quantity}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={[styles.listContainer, { padding: 20 }]}>
          <CheckBox
            title={"Debit/Credit Card"}
            checked={checked}
            onPress={() => setChecked(!checked)}
            checkedColor="#FF7F50"
          />
          <CheckBox
            title={"UPI Payment"}
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            checkedColor="#FF7F50"
          />
          <CheckBox
            title={"Wallet Pay"}
            checked={selected}
            onPress={() => setSelected(!selected)}
            checkedColor="#FF7F50"
          />
          <CheckBox
            title={"Cash on Delivery"}
            checked={isSelected}
            onPress={() => setIsSelected(!isSelected)}
            checkedColor="#FF7F50"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderRadius: 12,
            backgroundColor: "#FFF",
            // width: "95%",
            // height: "70%",
            margin: 20,
            padding: 10,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 8,
            }}
          >
            SubTotal $ {handleSubtotal()}{" "}
          </Text>
          {cart.length !== 0 ? (
            <TouchableOpacity
              onPress={() => handlePayment()}
              style={{
                borderRadius: 12,
                backgroundColor: "#FF7F50",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginLeft: 0,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "space-between",
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

// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import useCart from "../navigation/useCart";
// import { CheckBox } from "react-native-elements";

// function Separator() {
//   return (
//     <View style={{ borderBottomWidth: 1, borderBottomColor: "#a9a9a9" }} />
//   );
// }

// const PaymentScreen = () => {
//   const { cart } = useCart();
//   const [isChecked, setIsChecked] = useState(false);
//   console.log("cart", cart);
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={styles.listContainer}>
//           {cart.map((item) => (
//             <View key={item.id} style={styles.itemContainer}>
//               <View
//                 style={{
//                   flex: 10,
//                   borderRadius: 12,
//                   justifyContent: "center",
//                   padding: 15,
//                 }}
//               >
//                 <Text numberOfLines={2}>{item.name}</Text>
//               </View>
//               <View
//                 style={{
//                   flex: 2,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Text>{item.quantity}</Text>
//               </View>
//               <View
//                 style={{
//                   flex: 3,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text>{item.price * item.quantity}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//         <View style={[styles.listContainer, { padding: 20 }]}>
//           <CheckBox title={"Debit/Credit Card"} />
//           <CheckBox title={"UPI Payment"} />
//           <CheckBox title={"Wallet Pay"} />
//           <CheckBox title={"Cash on Delivery"} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default PaymentScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   listContainer: {
//     backgroundColor: "#FFF",
//     borderRadius: 12,
//     margin: 20,
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "stretch",
//     margin: 0,
//     padding: 10,
//   },
// });
