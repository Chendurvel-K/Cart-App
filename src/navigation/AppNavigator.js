import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import BookScreen from '../screens/BookScreen';
import CartScreen from '../screens/CartScreen';
import LoginPage from '../screens/LoginPage';
import Register from '../screens/Register';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import Loader from '../components/Loader';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerStyle: {backgroundColor: '#FF7F50'},
        headerTitleAlign: 'center',
        tabBarStyle: {backgroundColor: 'white'},
        tabBarActiveBackgroundColor: '#FF7F50',
        // headerTintColor: 'white',
      }}>
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
          // headerStyle: {
          //   backgroundColor: '#FF7F50',
          // },
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => {
            <Ionicons name="book-outline" size={size} color={color} />;
          },
          headerRight: props => <ShoppingCartIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => {
            <Ionicons name="cart" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({size, color}) => {
            <Ionicons name="person-circle-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({size, color}) => {
            <Ionicons name="search-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      {/* {BottomTab()} */}
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Book"
          component={BookScreen}
          options={{
            headerShown: true,
            headerBackVisible: false,
            // headerStyle: {
            //   backgroundColor: '#FF7F50',
            // },
            headerTitleAlign: 'center',
            headerRight: props => <ShoppingCartIcon {...props} />,
          }}
        />
        {/* <Stack.Screen name="Tabs" component={BottomTab} /> */}
        {/* <Stack.Screen name="Loader" component={Loader} /> */}
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown: true, headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
      {/* {BottomTab()} */}
    </NavigationContainer>
  );
}
