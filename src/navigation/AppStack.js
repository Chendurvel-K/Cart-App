import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookScreen from "../screens/BookScreen";
import CartScreen from "../screens/CartScreen";
import ShoppingCartIcon from "../components/ShoppingCartIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AppStack"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={OnStack}
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

const OnStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackgroundContainerStyle: { borderBottomWidth: 1 },
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#000",
        },
        tabBarActiveTintColor: "#FF7F60",
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
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
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
