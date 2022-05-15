import React, { useState } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import { db } from "../utils/firebase";
import { ref, get, child, set } from "firebase/database";

import useIDStore from "../utils/useIDStore";

import globalStyles from "../styles/global";

const Login = ({ navigation }) => {    
    const IDStore = useIDStore();
    
    const [truckID, setTruckID] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleLogin = async () => {
        const truckRef = ref(db, `trucks/${truckID}`);
        var found = false;
        get(truckRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                console.log(obj);
                if (obj.truckID === truckID && obj.password === password) {
                    const phoneRef = ref(db, `drivers/${phone}`);
                    get(phoneRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            found = true;
                            const driverObj = snapshot.val();
                            IDStore.saveTruckID(truckID);
                            IDStore.saveDriver(driverObj);
                            navigation.navigate("Main");
                            return;
                        }
                    }).then(() => {
                        if (!found) alert("Invalid credentials");
                    })
                }
            } else {
                alert("No trucks found");
            }
        });
        
        // IDStore.saveTruckID(truckID);
        // navigation.navigate("Main");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
            <Text style={globalStyles.title}>Login</Text>
            <TextInput placeholder="Truck ID" onChangeText={(text) => setTruckID(text)} style={globalStyles.input} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} style={globalStyles.input} />
            <TextInput placeholder="Phone Number" onChangeText={(text) => setPhone(text)} style={globalStyles.input} />
            <Button title="Login" onPress={handleLogin} />
        </KeyboardAvoidingView>
    );
}

export default Login;