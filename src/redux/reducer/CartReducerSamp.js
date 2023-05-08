import firestore from '@react-native-firebase/firestore';
import {ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_FROM_CART} from '../types';
const name = 'cart';
const initialState = [];
const cartItemsReducer = (state = initialState, action) => {
  // name: 'cart';
  switch (action.type) {
    case ADD_TO_CART:
      const cart = action.payload.cart;
      if (cart === 'undefined') {
        if (cart.productId === action.payload.item.id) {
          action.payload.item.quantity = action.payload.item.quantity + 1;
          console.log('====================================');
          console.log('<><><><><><><>', action.payload.item.quantity);
          console.log('====================================');
          return {...state};

          // const cartItem = cart.filter(
          //   item => item.productId === action.payload.item.id,
          // );
          // console.log('====================================');
          // console.log('cartItem', cartItem[0]);
          // console.log('====================================');
          // if (cartItem[0].productId === action.payload.item.id) {
          //   const cartItemQuantity = action.payload.item.quantity + 1;
          //   // const increase = cartItem[0].quantity;
          //   const pushNewItem = firestore().collection('Cart');
          //   pushNewItem
          //     .doc(cartItem[0].key)
          //     .update({
          //       quantity: cartItemQuantity,
          //     })
          //     .then(() => {
          //       console.log('User updated!');
          //     })
          //     .catch(error => {
          //       console.log('User updated!', error);
          //     });
          // return {...state};
        } else {
          const item = {
            productId: action.payload.item.id,
            userId: action.payload.userId,
            quantity: action.payload.item.quantity,
            price: action.payload.item.price,
          };
          console.log('====================================');
          console.log('lllll', JSON.stringify(item));
          console.log('====================================');
          const pushNewItem = firestore().collection('Cart');
          pushNewItem
            .add(item)
            .then(() => {
              console.log('User updated!');
            })
            .catch(error => {
              console.log('User updated!', error);
            });
          return {...state, pushNewItem};
        }
      }
  }
};

export default cartItemsReducer;
// const newArray = [...state]; //making a new array
// console.log(newArray);
// const index = newArray.findIndex(todo => todo.id === action.payload.id); //finding index of the item
// newArray[index].quantity += 1; //changing value in the new array
// return [
//   ...newArray, //reassingning todos to new array
// ];

// case REMOVE_FROM_CART:
//   const removeArray = [...state];
//   const removeIndex = removeArray.findIndex(
//     todo => todo.id === action.payload.id,
//   );
//   if (removeArray[removeIndex].quantity === 0) {
//     return [...removeArray];
//   } else {
//     removeArray[removeIndex].quantity =
//       removeArray[removeIndex].quantity - 1;
//     return [...removeArray];
//   }

//   case REMOVE_ALL_FROM_CART:
//     const removeAll = [...state];
//     const removeAllIndex = removeAll.findIndex(
//       todo => todo.id === action.payload.id,
//     );
//     removeAll[removeAllIndex].quantity = 0;
//     return [...removeAll];
// }
// return state;
// };

// // return [...state, action.payload];
// // console.log(action.payload.id);
// // var value = state.filter(item => item.id === action.payload.id);
// // console.log(value);
// // return [...state];
// // console.log(action.payload.id);

// // const book = action.payload;

// // if (state.books.length === 0) {
// //   state = state.books.concat(book);
// // } else {
// //   let exist = [];
// //   exist = state.books.filter(obj => obj.id === book.id);
// //   console.log(exist);
// //   if (exist.length === 0) {
// //     state = state.books.concat(book);
// //   } else {
// //     state = state.books.map(item => {
// //       if (item.id === book.id) {
// //         return {
// //           ...item,
// //           quantity: item.quantity + 1,
// //         };
// //       }
// //     });
// //   }
// // }

// // const index = newArray.map(item => item.id).indexOf(action.payload.id);

// // return {
// //   ...state,
// //   books: [
// //     cartItem =>
// //       cartItem.id === action.payload.id
// //         ? {...cartItem, quantity: cartItem.quantity + 1}
// //         : cartItem,
// //     action.payload,
// //   ],
// // };

// // return {
// //   ...state,
// //   books: [
// //     cartItem =>
// //       cartItem.id === action.payload.id
// //         ? {
// //             ...cartItem,
// //             quantity: cartItem.quantity !== 1 ? cartItem.quantity - 1 : 1,
// //           }
// //         : cartItem,
// //     action.payload,
// //   ],
// // };

// // console.log(state.filter(cartItem => cartItem.id !== action.payload.id));
// // return state.filter(cartItem => cartItem.id !== action.payload.id);

// add to cart logic
// const cart = action.payload.cart;
// const cartItem = cart.filter(
//   item => item.productId === action.payload.item.id,
// );
// console.log('====================================');
// console.log('cartItem', cartItem[0]);
// console.log('====================================');
// if (cartItem[0].productId === action.payload.item.id) {
//   const cartItemQuantity = action.payload.item.quantity + 1;
//   // const increase = cartItem[0].quantity;
//   const pushNewItem = firestore().collection('Cart');
//   pushNewItem
//     .doc(cartItem[0].key)
//     .update({
//       quantity: cartItemQuantity,
//     })
//     .then(() => {
//       console.log('User updated!');
//     })
//     .catch(error => {
//       console.log('User updated!', error);
//     });
//   return {...state};
// } else {
//   const item = {
//     productId: action.payload.item.id,
//     userId: action.payload.userId,
//     quantity: action.payload.item.quantity,
//     price: action.payload.item.price,
//   };
//   console.log('====================================');
//   console.log('lllll', JSON.stringify(item));
//   console.log('====================================');
//   const pushNewItem = firestore().collection('Cart');
//   pushNewItem
//     .add(item)
//     .then(() => {
//       console.log('User updated!');
//     })
//     .catch(error => {
//       console.log('User updated!', error);
//     });
//   return {...state, pushNewItem};
// }

// const existingItemIndex = state.items.findIndex(
//   item => item.id === action.payload.item.id,
// );
// const existingItemIndex = action.payload.index;
// console.log('====================================');
// console.log('asdfg', existingItemIndex);
// console.log('====================================');
// if (existingItemIndex !== -1) {
//   // If the item already exists in the cart, update its quantity
//   const items = [...state.items];
//   items[existingItemIndex].quantity += action.payload.item.quantity;
//   console.log('====================================');
//   console.log('jiii', items[existingItemIndex].quantity);
//   console.log('====================================');
//   return {...state, items};
// } else {
// Otherwise, add a new item to the cart

// }
// const newArray = [...state]; //making a new array

// const newArray = [...state];
// if (user) {
//   console.log('User ID: ', user.uid);
// }

// const cartRef = firestore().collection('Cart');
// // for (var i = 0; i <= 10; i++) {
// //   if (productId === )
// const dummyCart = [
//   {
//     userId: user.uid,
//     productId: 2, //action.payload.id,
//     quantity: action.payload.quantity + 0,
//   },
//   {
//     userId: user.uid,
//     productId: 5, //action.payload.id,
//     quantity: action.payload.quantity + 2,
//   },
//   {
//     userId: user.uid,
//     productId: action.payload.id,
//     quantity: action.payload.quantity + 3,
//   },
//   {
//     userId: user.uid,
//     productId: action.payload.id,
//     quantity: action.payload.quantity + 3,
//   },
// ];

// console.log('====================================');
// console.log('CartRef created' + JSON.stringify(user));
// console.log('====================================');
// cartRef
//   .doc(user.uid)
//   .set({data: dummyCart})
//   .then(() => {
//     console.log('User added!');
//   })
//   .catch(error => {
//     console.log('firebase: ' + error);
//   });
// return [
//   ...newArray, //reassingning todos to new array
// ];
