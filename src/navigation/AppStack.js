import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookScreen from "../screens/BookScreen";
import CartScreen from "../screens/CartScreen";
import ShoppingCartIcon from "../components/ShoppingCartIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const OnStack = () => {
  return (
    <Stack.Navigator initialRouteName="AppStack">
      <Stack.Screen
        name="Carts"
        component={CartScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
          headerTitleAlign: "center",
          tabBarShowLabel: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerStyle: {backgroundColor: '#FF7F50'},
        headerTitleAlign: "center",
        headerBackgroundContainerStyle: { borderBottomWidth: 1 },
        // headerStyle: {
        //     backgroundColor: '#FFF',
        //   },
        tabBarStyle: { backgroundColor: "#FFF" },
        tabBarActiveTintColor: "#FF7F60",
        // headerTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerTitleAlign: "center",
          tabBarShowLabel: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          headerRight: (props) => <ShoppingCartIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={OnStack}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
