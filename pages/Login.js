import React, { useState } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import globalStyles from "../styles/global";

const Login = ({ navigation }) => {    
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
            <Text style={globalStyles.title}>Login</Text>
            <TextInput placeholder="Phone number" onChangeText={(text) => setPhone(text)} style={globalStyles.input} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} style={globalStyles.input} />
            <Button title="Login" onPress={() => { navigation.navigate("Main") }} />
        </KeyboardAvoidingView>
    );
}

export default Login;