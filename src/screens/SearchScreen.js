import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../navigation/AuthProvider";
import useAuth from "../navigation/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchScreen = () => {
  // const {user} = useContext(AuthContext);
  const { user, initializing } = useAuth();
  console.log(user);
  return (
    <View style={{ flex: 0 }}>
      <View
        style={{
          flex: 0,
          backgroundColor: "#FF7F50",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 12,
            backgroundColor: "#FFF",
            width: "95%",
            height: "45%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 8,
            }}
          >
            Search{" "}
          </Text>
          <TouchableOpacity
            onPress={() => alert("Search")}
            style={{
              borderRadius: 12,
              backgroundColor: "#FFF",
              alignItems: "center",
            }}
          >
            <Ionicons name="search-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
