// import firestore from '@react-native-firebase/firestore';
// import firebase from '@react-native-firebase/app';

// export default async function getUserCart() {
//   console.log('inside getUserCart');
//   const user = firebase.auth().currentUser;
//   console.log(user.uid);
//   const users = await firestore().collection('users').doc(user.uid).get();
//   //   if (cart.isEmpty) {
//   //     return null;
//   //   } else {
//   // console.log('aaa====================================');
//   // console.log(users.data().data);
//   // console.log('====================================');
//   return users.data().data;
//   //   }
// }

// // const user = firebase.auth().currentUser;
// // const cartItems = getUserCart();
// // console.log('===>' + JSON.stringify(cartItems));
// // if (cartItems === 'undefined') {
// //   firestore().collection('Cart').doc(user.uid).set({
// //     userId: user.uid,
// //     productId: action.payload.id,
// //     quantity: 1,
// //   });
// // } else {
// //   for (let i = 0; i < cartItems.length; i++) {
// //     if (cartItems[i] === action.payload.id) {
// //       cartItems[i].quantity += 1;
// //       // } else {
// //       //   console.log('====================================');
// //       //   console.log('inserted');
// //       //   console.log('====================================');
// //       //   ({
// //       //     userId: user.uid,
// //       //     productId: action.payload.id,
// //       //     quantity: 1,
// //       //   });
// //     }
// //   }
// // }
// // return {
// //   ...state,
// //   initialState: cartItems,
// // };
