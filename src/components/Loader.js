import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Loader({navigation}) {
  //   const navigation = useNavigation();
  const [Loading, SetLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SetLoading(true);
      setTimeout(() => {
        SetLoading(false);
      }, 3000);
    });

    return unsubscribe;
  }, [navigation]);

  if (Loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator
          color={'blue'}
          size="large"
          onPress={() => navigation.navigate('Cart')}
          visible={Loading}
          textContent={'Loading...'}
        />
      </View>
    );
  }
  //   return (
  //     <View>
  //       <ActivityIndicator
  //         time="100000"
  //         onPress={() => navigation.navigate('Cart')}
  //       />
  //     </View>
  //   );
}
