import React from "react";
import { TouchableOpacity, Text } from "react-native";

const BatchListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>BatchListItem</Text>
        </TouchableOpacity>
    );
}

export default BatchListItem;