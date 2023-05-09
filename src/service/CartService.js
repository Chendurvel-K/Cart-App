// import React, {useState, useEffect} from 'react';
// import {ActivityIndicator} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export default function GetCart() {
//   console.log('====================================');
//   console.log('====================================');
//   console.log('entered CartService');
//   console.log('====================================');
//   console.log('====================================');
//   const [loading, setLoading] = useState(true); // Set loading to true on component mount
//   const [cart, setCart] = useState([]); // Initial empty array of users

//   useEffect(() => {
//     const subscriber = firestore()
//       .collection('Cart')
//       .onSnapshot(querySnapshot => {
//         const carts = [];
//         querySnapshot.forEach(documentSnapshot => {
//           carts.push({
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//           });
//         });

//         console.log('====================================');
//         console.log('######', carts);
//         console.log('====================================');
//         setCart(carts);
//         setLoading(false);
//       });
//     // Unsubscribe from events when no longer in use
//     return () => subscriber();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   console.log('====================================');
//   console.log('getting cart details in firebase', cart);
//   console.log('====================================');
//   return cart;
// }
