import firestore from "@react-native-firebase/firestore";
import { ADD_TO_CART } from "../types";
const name = "cart";
const initialState = [];
const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cart = action.payload.cart;
      if (cart === "undefined") {
        if (cart.productId === action.payload.item.id) {
          action.payload.item.quantity = action.payload.item.quantity + 1;
          console.log("====================================");
          console.log("<><><><><><><>", action.payload.item.quantity);
          console.log("====================================");
          return { ...state };
        } else {
          const item = {
            productId: action.payload.item.id,
            userId: action.payload.userId,
            quantity: action.payload.item.quantity,
            price: action.payload.item.price,
          };
          console.log("====================================");
          console.log("lllll", JSON.stringify(item));
          console.log("====================================");
          const pushNewItem = firestore().collection("Cart");
          pushNewItem
            .add(item)
            .then(() => {
              console.log("User updated!");
            })
            .catch((error) => {
              console.log("User updated!", error);
            });
          return { ...state, pushNewItem };
        }
      }
  }
};

export default cartItemsReducer;
