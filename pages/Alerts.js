import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import AlertsListItem from '../components/AlertsListItem';

import { db } from '../utils/firebase';
import { ref, get, child, onValue, update } from 'firebase/database';

import globalStyles from '../styles/global';
import styles from '../styles/pages/Alerts.js';

const Alerts = () => {
    const [data, setData] = useState([
        {
            name: "Carton 2",
            id: 1,
            issue: "Tipped Over",
            data: 12.5
        },
        {
            name: "Carton 3",
            id: 2,
            issue: "Heavy Impact",
            data: 500
        }
    ]);

    const refreshData = () => {

    }

    const fetchData = async () => {
        const alertRef = ref(db, 'issues');
        get(alertRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                console.log(obj);
                const arrKeys = Object.keys(obj);
                const objArr = Object.values(obj);
                // objArr.shift();
                const localData = objArr;
                localData.forEach((alert, index) => {
                    alert['id'] = arrKeys[index];
                });
                localData.filter((alert) => {
                    return alert.resolved != true;
                });
                console.log(localData);
                setData(localData);
            }
        })
    }

    useEffect(() => {
        fetchData().catch((error) => console.log(error));
        
        const alertListenerRef = ref(db, 'issues');
        onValue(alertListenerRef, (snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                console.log(obj);
                const arrKeys = Object.keys(obj);
                const objArr = Object.values(obj);
                // objArr.shift();
                const localData = objArr;
                localData.forEach((alert, index) => {
                    alert['id'] = arrKeys[index];
                })
                console.log(localData);
                setData(localData);
            }
        })

        // return () => alertListenerRef.off();
    }, []);

    const resolveIssue = (item) => {
        console.log("resolved");
        setData([...data.filter(i => {
            return i.id !== item.id;
        })]);
        const updates = {};
        updates[`/issues/${item.id}/resolved`] = true;
        update(ref(db), updates).catch((error) => console.log(error));
    }

    const onItemPress = (item) => {
        Alert.alert(
            item.name,
            `${item.issue}`,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Resolved', onPress: () => resolveIssue(item), style: "default"},
            ]
        );
    }
    
    const renderItem = ({ item }) => (
        <AlertsListItem item={item} onPress={onItemPress} />
    );
    
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.headerRow}>
                <Text style={globalStyles.title}>Alerts</Text>
            </View>
            {/* <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={false}
                onRefresh={refreshData}
            /> */}
            { data.map(
                (item, index) => (
                    <ListItem key={index} bottomDivider onPress={() => onItemPress(item)}>
                        <ListItem.Content>
                            <ListItem.Title>{item['id']}</ListItem.Title>
                            <ListItem.Subtitle>{item.issue}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
            ))}
        </View>
    );
}

export default Alerts;