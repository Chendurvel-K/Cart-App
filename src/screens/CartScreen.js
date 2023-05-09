import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  ADD_TO_CART,
} from '../redux/types';
import useCart from '../navigation/useCart';
import { selectCart } from '../redux/reducer/CartReducer';

function Separator() {
  return <View style={{borderBottomWidth: 1, borderBottomColor: '#a9a9a9'}} />;
}

export default function CartScreen() {  
  const carts = useSelector(state => state.cart.items);
  console.log("Cart screen item list:"+carts.length);
  // const carts = useSelector(selectCart);
   const {initializing, cart, addToCart, removeFromCart, removeAllFromCart} = useCart();
  
  // console.log(">>>>>>>>>>", cart);
  const dispatch = useDispatch();

 const handleAddToCart = item1 => {
    item1.quantity = item1.quantity + 1;
    console.log("item quantity", item1.quantity);
    console.log("item quantity", item1.id);

    addToCart(item1.productId, item1.quantity, item1.price, item1.name, item1.author, item1.imgUrl);
  };

  const handleRemoveFromCart = item1 => {
    item1.quantity = item1.quantity - 1;
    removeFromCart(item1.productId, item1.quantity, item1.price, item1.name, item1.author, item1.imgUrl);
  };
  
  const handleAllRemoveFromCart = item1 => {
    item1.quantity = 0;
    removeAllFromCart(item1.productId, item1.quantity, item1.price, item1.name, item1.author, item1.imgUrl);
  };

  // const addItemFromCart = item =>
  //   dispatch({
  //     type: ADD_TO_CART,
  //     payload: item,
  //   });

  // const removeItemFromCart = item =>
  //   dispatch({
  //     type: REMOVE_FROM_CART,
  //     payload: item,
  //   });

  // const removeAllItemFromCart = item =>
  //   dispatch({
  //     type: REMOVE_ALL_FROM_CART,
  //     payload: item,
  //   });

  //   const handleMethodQuantity = (bookId) => {
  //   // console.log("BookId", bookId.id);
  //   const cartItem = carts?.find(item => item.productId === bookId.id); 
  //   // console.log("HHHHHH", (cartItem));

  //   if(cartItem === null || cartItem === undefined) {
  //     return 0
  //   }

  //   return cartItem.quantity;
  // }

  return (
    <View style={styles.container}>
      <View style={{flex: 1,backgroundColor: '#FF7F50', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{borderRadius: 12, backgroundColor: '#fff', width: "95%", height: "70%", justifyContent: 'center',}}>
          <Text style={{}}>SubTotal</Text>
        </View>
      </View>
      <View style={{flex: 8}}>
      {carts.length !== 0 ? (
        <FlatList
          data={carts}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => Separator()}
          renderItem={({item}) => (
            <View style={styles.bookItemContainer}>
              <Image source={{uri: item.image}} style={styles.thumbnail} />
              <View style={styles.bookItemMetaContainer}>
                <Text style={styles.textTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.textAuthor}>by {item.author}</Text>
                <Text
                style={[styles.textAuthor, {fontWeight: '600', paddingTop: 5}]}>
                Price: ${item.price}
              </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleRemoveFromCart(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}> - </Text>
                  </TouchableOpacity>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}> + </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAllRemoveFromCart(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  {/* </View> */}
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartMessage}>
            {/* Your cart is Empty */}
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dRql5xwTZNAE4rSZ3sTJScYDjdu7wI3XDKrrLCMB8g&usqp=CAU&ec=48600113',
              }}
              style={styles.imageSize}
            />
          </Text>
        </View>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  bookItemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#EEE',
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
    fontWeight: '400',
  },
  textAuthor: {
    fontSize: 18,
    fontWeight: '200',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 110,
    left: 10,
    // width: 250,
    borderRadius: 8,
    // backgroundColor: '#ff333390',
    backgroundColor: '#FF7F50',
  },
  // deleteButton: {
  //   position: 'absolute',
  //   top: 110,
  //   right: 2,
  //   borderRadius: 8,
  //   backgroundColor: '#ff333390',
  // },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    // backgroundColor: '#ff333390',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
  },
  emptyCartContainer: {
    // marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartMessage: {
    fontSize: 28,
    padding: 80,
  },
  imageSize: {
    height: 200,
    width: 200,
    resizeMode: 'stretch',
  },
});
