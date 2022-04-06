import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

const DeliveryMap = () => {
    return (
        <View style={{ flex: 1 }}>
        <Text>Map</Text>
        <WebView source={{ uri: 'https://www.google.com/maps/@22.3073076,114.250926,15z' }} />
        </View>
    );
};

export default DeliveryMap;