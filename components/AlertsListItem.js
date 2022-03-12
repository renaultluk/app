import React from "react";
import { TouchableOpacity, Text } from "react-native";

const AlertsListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>AlertsListItem</Text>
        </TouchableOpacity>
    );
}

export default AlertsListItem;