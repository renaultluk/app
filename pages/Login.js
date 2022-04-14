import React, { useState } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import useIDStore from "../utils/useIDStore";

import globalStyles from "../styles/global";

const Login = ({ navigation }) => {    
    const IDStore = useIDStore();
    
    const [truckID, setTruckID] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        IDStore.saveTruckID(truckID);
        navigation.navigate("Main");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
            <Text style={globalStyles.title}>Login</Text>
            <TextInput placeholder="Truck ID" onChangeText={(text) => setTruckID(text)} style={globalStyles.input} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} style={globalStyles.input} />
            <Button title="Login" onPress={handleLogin} />
        </KeyboardAvoidingView>
    );
}

export default Login;