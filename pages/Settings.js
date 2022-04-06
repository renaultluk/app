import React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";

import globalStyles from "../styles/global";

const Settings = () => {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.headerRow}>
                <Text style={globalStyles.title}>Settings</Text>
            </View>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Truck ID</ListItem.Title>
                    <ListItem.Subtitle>abc123</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Phone Number</ListItem.Title>
                    <ListItem.Subtitle>12345678</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>
    );
};

export default Settings;