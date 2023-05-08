import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export function GetProduct() {
  console.log('====================================');
  console.log('====================================');
  console.log('entered ProductService');
  console.log('====================================');
  console.log('====================================');
  const [books, setBooks] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    const subscriber = firestore()
      .collection('Books')
      .onSnapshot(querySnapshot => {
        const books1 = [];
        querySnapshot.forEach(documentSnapshot => {
          books1.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setBooks(books1);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator size={'large'} animating={true} />;
  }
  console.log('====================================');
  console.log('Getting Book details in firebase', books);
  console.log('====================================');
  return books;
}

// export function GetProductById() {
//   const [bookId, setBookId] = useState([]); // Initial empty array of users
//   const [loading, setLoading] = useState(true); // Set loading to true on component mount
//   const user = firebase.auth().currentUser;
//   useEffect(() => {
//     const subscriber = firestore()
//       .collection('Books')
//       .doc(user.uid)
//       .onSnapshot(querySnapshot => {
//         const bookById = [];
//         querySnapshot.forEach(documentSnapshot => {
//           bookById.push({
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//           });
//         });

//         setBookId(bookId);
//         setLoading(false);
//       });
//     // Unsubscribe from events when no longer in use
//     return () => subscriber();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   console.log('====================================');
//   console.log('>>>>>>>>>>>>>>>>', bookId);
//   console.log('====================================');
//   return bookId;
// }
// export default async function GetProduct() {
//   console.log('inside getUserCart');
//   const user = firebase.auth().currentUser;
//   console.log(user.uid);
//   const books = await firestore().collection('Books').doc(user.uid).get();
//   //   if (cart.isEmpty) {
//   //     return null;
//   //   } else {
//   console.log('aaa====================================');
//   console.log(books.data().data);
//   console.log('====================================');
//   return books.data().data;
//   //   }
// }
