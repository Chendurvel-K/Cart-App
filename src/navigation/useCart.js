import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ADD_TO_CART, REMOVE_FROM_CART, REMOVE_All_FROM_CART} from '../redux/reducer/CartReducer';

const useCart = () => {
  const [initializing, setInitializing] = useState(false);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    console.log("Fetching Cart list");
    setInitializing(true);
    const unsubscribe = firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        const newCart = [];
        querySnapshot.forEach(doc => {
          newCart.push({id: doc.id, ...doc.data()});
        });
        setInitializing(false);
        setCart(newCart);
        // console.log('====================================');
        console.log('UseCart- Cart length:', newCart.length);
        dispatch(ADD_TO_CART(newCart));

        // console.log('====================================');
      });
      // if(initializing) {
      //   setInitializing(false);
      // }

    return () => unsubscribe();
  }, []);
  // console.log("WWWWW", cart);

  
  const addToCart = async (productId, quantity, price, name, author, image) => {
    console.log("Add to Cart");
    console.log("ProductId", productId);
    setInitializing(true);
    const existingCartItem = cart?.find(cartItem => cartItem.productId === productId);
    console.log("existing Cart item: ", existingCartItem);
    if(existingCartItem) {
      await firestore()
      .collection('Cart')
      .doc(existingCartItem.id)
      .update({
            // userId: userId,
            // productId: productId,
            quantity: quantity,
            // price: price,
            // name: name,
            // author: author,
            // image: image,
      }).then(res => console.log("res", res))
      setInitializing(false);
      console.log("cart State: ", cart);
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
        })
        console.log("Add cart State: ", cart.length);
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

  } else {
    await firestore()
    .collection('Cart')
    .doc(exist.id)
    .update({
          // userId: userId,
            // productId: productId,
            quantity: quantity,
            // price: price,
            // name: name,
            // author: author,
            // image: image,
    })
  }
  };

  const removeAllFromCart = async (productId, quantity, price, name, author, image) => {
    // const existingCartItem = cart?.find(cartItem => cartItem.productId === productId);

    const updatedCart = cart.filter(cartItem => cartItem.productId === productId);
    setCart(updatedCart);
    const exist = updatedCart?.find(cartItem => cartItem.productId === productId)
    if(exist.quantity === 0) {
    await firestore()
      .collection('Cart')
      .doc(exist.id)
      .delete().then(res => console.log("Delete res:"+res));
    dispatch(REMOVE_All_FROM_CART(cart));
  }
}
  // useEffect(() => {
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }, []);

  return {cart, initializing, addToCart, removeFromCart, removeAllFromCart};
};

export default useCart;