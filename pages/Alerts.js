import React, { useState } from 'react';
import { View, Text, Alert, FlatList } from 'react-native';

import AlertsListItem from '../components/AlertsListItem';

import styles from '../styles/pages/Alerts.js';

const Alerts = () => {
    const [data, setData] = useState([]);

    const refreshData = () => {

    }

    const onItemPress = (item) => {
        Alert.alert();
    }
    
    const renderItem = ({ item }) => (
        <AlertsListItem item={item} onPress={onItemPress} />
    );
    
    return (
        <View style={styles.container}>
            <Text>Alerts</Text>
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={false}
                onRefresh={refreshData}
            />
        </View>
    );
}

export default Alerts;