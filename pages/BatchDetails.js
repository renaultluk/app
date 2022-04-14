import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { Icon, ListItem } from "react-native-elements";
import { db } from "../utils/firebase";
import { ref, get, child } from "firebase/database";

import BatchListItem from "../components/BatchListItem";
import globalStyles from "../styles/global";

const BatchDetails = ({ navigation }) => {
    const [batches, setBatches] = useState([
        {
            name: "Carton 1",
            id: 1,
            safe: true,
            issue: ""
        },
        {
            name: "Carton 2",
            id: 2,
            safe: false,
            issue: "Tipped over"
        }
]);
    
    const fetchData = async () => {
        const batchRef = ref(db, 'batches/pending');
        get(batchRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                console.log(obj);
                const arrKeys = Object.keys(obj);
                const objArr = Object.values(obj);
                // objArr.shift();
                const localBatches = objArr;
                localBatches.forEach((batch, index) => {
                    batch['id'] = arrKeys[index];
                })
                console.log(localBatches);
                setBatches(localBatches);
            }
        })
    }

    useEffect(() => {
        fetchData().catch((error) => console.log(error));
    }, []);
    

    const signOff = (item) => {
        navigation.navigate("Sign");
    }

    const onItemPress = (item) => {
        const subtitle = item.safe ? "safe" : item.issue;
        
        Alert.alert(
            item.batchID,
            subtitle,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Sign off batch', onPress: () => signOff(item), style: "default"},
            ]
        );
    }

    // const keyExtractor = (item, index) => item.id.toString();

    const renderItem = ({ item }) => (
        <ListItem key={index} bottomDivider onPress={() => onItemPress(item)}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                    {
                        item.safe ? "safe" :
                        item.issue
                    }
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <View style={globalStyles.container}>
            {/* <Button 
                icon={
                    <Icon name="cog" size={20} color="white" />
                }
                title="Settings"
                onPress={() => navigation.navigate("Settings")} /> */}
                <View style={globalStyles.headerRow}>

                    <Text style={globalStyles.title}>Batch Details</Text>
                    <Button
                        title="+ Add"
                        onPress={() => navigation.navigate("ScanCargo")}
                    />
                    <Icon 
                        name="cog"
                        type="font-awesome"
                        color="#ec6c04"
                        size={30}
                        onPress={() => navigation.navigate("Settings")}
                    />
                </View>
            {
                batches.map(
                    (item, index) => (
                        <ListItem key={index} bottomDivider onPress={() => onItemPress(item)}>
                            <ListItem.Content>
                                <ListItem.Title>{item.batchID}</ListItem.Title>
                                {/* <ListItem.Subtitle>
                                    {
                                        item.safe ? "safe" :
                                        item.issue
                                    }
                                </ListItem.Subtitle> */}
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )
                    )
                    // <FlatList
                    //     data={batch}
                    //     renderItem={renderItem}
                    //     keyExtractor={(item, index) => index.toString()}
                    // />
                }
                {/* <Button title="Deliver" onPress={ () => navigation.navigate("Sign") } /> */}
        </View>
    );
}

export default BatchDetails;