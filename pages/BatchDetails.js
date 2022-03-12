import React, { useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import BatchListItem from "../components/BatchListItem";

const BatchDetails = ({ navigation }) => {
    const [batch, setBatch] = useState([]);
    
    const refreshData = () => {

    }

    const onItemPress = (item) => {
        Alert.alert();
    }

    const renderItem = ({ item }) => (
        <BatchListItem item={item} onPress={onItemPress} />
    );

    return (
        <View style={{ flex: 1 }}>
            <Text>padding</Text>
            <Text>padding</Text>
            <Text>padding</Text>
            <Button 
                icon={
                    <Icon name="cog" size={20} color="white" />
                }
                title="Settings"
                onPress={() => navigation.navigate("Settings")} />
            <Text>BatchDetails</Text>
            <FlatList
                data={batch}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={false}
                onRefresh={refreshData}
            />
        </View>
    );
}

export default BatchDetails;