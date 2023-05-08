import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ShoppingCartIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(state =>
    state.filter(item => item.quantity > 0),
  );
  // console.log('cart', cartItems.length);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.button}>
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cartItems.length}</Text>
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
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#FF5665',
    left: 22,
    bottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  itemCountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // menuButton: {
  //   marginRight: 10,
  // },
});

export default ShoppingCartIcon;
