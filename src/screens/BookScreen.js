import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetProduct} from '../service/ProductService';
import useAuth from '../navigation/useAuth';
import useCart from '../navigation/useCart';

function Separator() {
  return <View style={{borderBottomWidth: 1, borderBottomColor: '#a9a9a9'}} />;
}

export default function BookScreen() {
  const books = GetProduct();
  const dispatch = useDispatch();
  const {user} = useAuth();
  const {initializing, cart, addToCart, removeFromCart} = useCart();
  console.log('====================================');
  console.log('00000', cart);
  console.log('====================================');

  if (initializing) {
    return <ActivityIndicator animating={true}/>;
  }

  const handleAddToCart = item1 => {
    item1.quantity = item1.quantity + 1;
    addToCart(item1.id, item1.quantity, item1.price, item1.name, item1.author, item1.imgUrl);
  };

  const handleRemoveFromCart = item1 => {
    item1.quantity = item1.quantity - 1;
    removeFromCart(item1.id, item1.quantity, item1.price, item1.name, item1.author, item1.imgUrl);
  };

  const handleMethodQuantity = (bookId) => {
    console.log("BookId", bookId.id);
    const cartItem = cart?.find(item => item.productId === bookId.id); 
    console.log("HHHHHH", (cartItem));

    if(cartItem === null || cartItem === undefined) {
      return 0
    }

    return cartItem.quantity;
  }

  return (
    <View style={styles.container}>
      <FlatList
        // horizontal
        data={books}
        // keyExtractor={item => item.id}
        ItemSeparatorComponent={() => Separator()}
        renderItem={({item}) => (
          <View style={styles.bookItemContainer}>
            <Image source={{uri: item.imgUrl}} style={styles.thumbnail} />
            <View style={styles.bookItemTextContainer}>
              <Text style={styles.textTitle} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.textAuthor}>by {item.author}</Text>
              <Text
                style={[styles.textAuthor, {fontWeight: '600', paddingTop: 5}]}>
                Price: ${item.price}
              </Text>
              {handleMethodQuantity(item) === 0 ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>ADD TO CART</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleRemoveFromCart(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}> - </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Product Id: ', item.id)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>{handleMethodQuantity(item)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}> + </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookItemContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  bookItemTextContainer: {
    padding: 5,
    paddingLeft: 10,
    width: '100%',
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
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    top: 100,
    left: 10,
    // backgroundColor: '#24a0ed',
    backgroundColor: '#FF7F50',

    borderRadius: 8,
    padding: 3,
  },
  button: {
    padding: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    padding: 0,
    fontSize: 21,
    color: '#fff',
    fontWeight: 500,
  },
});

// Axios API Calls
//
// console.log('====================================');
// console.log(carts);
// console.log('====================================');

// const getNews = () => {
//   axios
//     .get(
//       'https://newsapi.org/v2/top-headlines?country=us&apiKey=c1ef3317ba2e48c8aeab23ad33adb6e9',
//       {
//         params: {
//           category: 'technology',
//         },
//       },
//     )
//     .then(response => {
//       // handle success
//       setArticles(response.data.articles);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function () {
//       // always executed
//     });
// };

// useEffect(() => {
//   getNews();
// }, []);

// useEffect(() => {
//   axios
//     .post(
//       'https://crudcrud.com/api/185c5e41538b454f836edbbe11c2d6eb/login',
//       users,
//     )
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });
// function getAllTteamToCart(item) {
//   dispatch({type: GETALLITEM, payload: item});
// }
