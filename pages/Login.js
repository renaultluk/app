import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";

const Login = ({ nagivation }) => {    
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ flex: 1 }}>
            <Text>Login</Text>
            <TextInput placeholder="Phone number" onChangeText={(text) => setPhone(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={() => {}} />
        </View>
    );
}

export default Login;