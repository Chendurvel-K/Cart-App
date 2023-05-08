import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ADD_TO_CART, REMOVE_FROM_CART, REMOVE_All_FROM_CART} from '../redux/reducer/CartReducer';

const useCart = () => {
  const [initializing, setInitializing] = useState(true);
  const [cart, setCart] = useState(null);
  const dispatch = useDispatch();
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        const newCart = [];
        querySnapshot.forEach(doc => {
          newCart.push({id: doc.id, ...doc.data()});
        });
        setCart(newCart);
        console.log('====================================');
        console.log('@@@@@', newCart);
        console.log('====================================');
      });
      if(initializing) {
        setInitializing(false);
      }

    return () => unsubscribe();
  }, [userId]);
  console.log("WWWWW", cart);

  
  const addToCart = async (productId, quantity, price, name, author, image) => {
    const existingCartItem = cart?.find(cartItem => cartItem.productId === productId);
    if(existingCartItem) {
      await firestore()
      .collection('Cart')
      .doc(existingCartItem.id)
      .update({
            userId: userId,
            productId: productId,
            quantity: quantity,
            price: price,
            name: name,
            author: author,
            image: image,
      });
    dispatch(ADD_TO_CART(cart));
    } else {
      await firestore()
        .collection('Cart')
        .add({
            userId: userId,
            productId: productId,
            quantity: quantity,
            price: price,
            name: name,
            author: author,
            image: image,
        });
      dispatch(ADD_TO_CART(cart));
    }
  };

  const removeFromCart = async (productId, quantity, price, name, author, image) => {

    const updatedCart = cart.filter(cartItem => cartItem.productId === productId);
    setCart(updatedCart);
    const exist = updatedCart?.find(cartItem => cartItem.productId === productId)
  if(exist.quantity === 1) {
    await firestore()
      .collection('Cart')
      .doc(exist.id)
      .delete()
    dispatch(REMOVE_FROM_CART(cart));

  } else {
    await firestore()
    .collection('Cart')
    .doc(exist.id)
    .update({
          userId: userId,
            productId: productId,
            quantity: quantity,
            price: price,
            name: name,
            author: author,
            image: image,
    });
  dispatch(REMOVE_FROM_CART(cart));   
  }
  };

  const removeAllFromCart = async (productId, quantity, price, name, author, image) => {
    // const existingCartItem = cart?.find(cartItem => cartItem.productId === productId);

    const updatedCart = cart.filter(cartItem => cartItem.productId === productId);
    setCart(updatedCart);
    const exist = updatedCart?.find(cartItem => cartItem.productId === productId)
  if(exist.quantity === 1) {
    await firestore()
      .collection('Cart')
      .doc(exist.id)
      .delete()
    dispatch(REMOVE_All_FROM_CART(cart));
  }
}
  useEffect(() => {
    if (initializing) {
      setInitializing(false);
    }
  }, []);

  return {initializing, cart, addToCart, removeFromCart, removeAllFromCart};
};

export default useCart;