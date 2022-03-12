import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const Signup = () => {
    const [name, setName] = useState("");
    const [truckID, setTruckID] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    return (
        <View style={{ flex: 1 }}>
            <Text>Sign Up</Text>
            <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
            <TextInput placeholder="Truck ID" onChangeText={(text) => setTruckID(text)} />
            <TextInput placeholder="Phone number" onChangeText={(text) => setPhone(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
            <TextInput placeholder="Confirm Password" onChangeText={(text) => setConfirmPassword(text)} />
            <Button title="Sign Up" />
        </View>
    );
};

export default Signup;