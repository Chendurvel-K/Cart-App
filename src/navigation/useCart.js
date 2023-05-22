import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ADD_TO_CART } from "../redux/reducer/CartReducer";

const useCart = () => {
  const [initializing, setInitializing] = useState(false);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    console.log("Fetching Cart list");
    setInitializing(true);
    const unsubscribe = firestore()
      .collection("Cart")
      .where("userId", "==", userId)
      .onSnapshot((querySnapshot) => {
        const newCart = [];
        querySnapshot.forEach((doc) => {
          newCart.push({ id: doc.id, ...doc.data() });
        });
        setInitializing(false);
        setCart(newCart);
        console.log("UseCart- Cart length:", newCart.length);
        dispatch(ADD_TO_CART(newCart));
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        console.log("User data: ", documentSnapshot.data());
        setUsers(documentSnapshot.data());
      });
    return () => subscriber();
  }, [userId]);

  const addToCart = async (productId, quantity, price, name, author, image) => {
    setInitializing(true);
    const existingCartItem = cart?.find(
      (cartItem) => cartItem.productId === productId
    );
    console.log("existing Cart item: ", existingCartItem);
    if (existingCartItem) {
      await firestore()
        .collection("Cart")
        .doc(existingCartItem.id)
        .update({
          quantity: quantity,
        })
        .then((res) => console.log("res", res));
      setInitializing(false);
      console.log("cart State: ", cart);
      dispatch(ADD_TO_CART(cart));
    } else {
      await firestore().collection("Cart").add({
        userId: userId,
        productId: productId,
        quantity: quantity,
        price: price,
        name: name,
        author: author,
        image: image,
      });
      console.log("Add cart State: ", cart.length);
    }
  };

  const removeFromCart = async (cartId, quantity) => {
    if (quantity === 0) {
      console.log("Remove quantity == 1 ");
      await firestore().collection("Cart").doc(cartId).delete();
    } else {
      await firestore().collection("Cart").doc(cartId).update({
        quantity: quantity,
      });
    }
  };

  const removeAllFromCart = async (productId) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.productId === productId
    );
    setCart(updatedCart);
    const exist = updatedCart?.find(
      (cartItem) => cartItem.productId === productId
    );
    console.log("Remoce all exist", exist);
    await firestore()
      .collection("Cart")
      .doc(exist.id)
      .delete()
      .then((res) => console.log("Delete res:" + res));
  };
  useEffect(() => {
    if (initializing) {
      setInitializing(false);
    }
  }, []);

  return {
    cart,
    users,
    initializing,
    addToCart,
    removeFromCart,
    removeAllFromCart,
  };
};

export default useCart;
