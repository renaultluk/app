import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { Icon, ListItem } from "react-native-elements";
import { db, functions } from "../utils/firebase";
import { ref, get, child, update, onValue } from "firebase/database";
import { httpsCallable } from "firebase/functions";

import useIDStore from "../utils/useIDStore";

import BatchListItem from "../components/BatchListItem";
import globalStyles from "../styles/global";

const BatchDetails = ({ route, navigation }) => {
    const IDStore = useIDStore();

    const filterBatch = route.params.filterBatch;

    let delivered = false;
    
    const [batches, setBatches] = useState([
        // {
        //     name: "Carton 1",
        //     id: 1,
        //     safe: true,
        //     issue: ""
        // },
        // {
        //     name: "Carton 2",
        //     id: 2,
        //     safe: false,
        //     issue: "Tipped over"
        // }
    ]);
    
    const fetchData = async () => {
        const batchRef = ref(db, `trucks/${IDStore.truckID}/batches`);
        get(batchRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();
                console.log(obj);
                const arrKeys = Object.keys(obj);
                var objArr = Object.values(obj);
                // objArr.shift();
                // const localBatches = objArr;
                // localBatches.forEach((batch, index) => {
                //     batch['id'] = arrKeys[index];
                // })
                // console.log(localBatches);
                objArr = objArr.filter((batch) => {
                    return batch != filterBatch;
                })
                setBatches(objArr);
            } else {
                setBatches([]);
            }
        })
    }

    useEffect(() => {
        fetchData().catch((error) => console.log(error));

        // const batchRef = ref(db, `trucks/${IDStore.truckID}/batches`);
        // onValue(batchRef, (snapshot) => {
        //     if (snapshot.exists()) {
        //         const obj = snapshot.val();
        //         console.log(obj);
        //         const arrKeys = Object.keys(obj);
        //         var objArr = Object.values(obj);
        //         objArr = objArr.filter((batch) => {
        //             return batch != filterBatch;
        //         })
        //         setBatches(objArr);
        //     } else {
        //         setBatches([]);
        //     }
        // }).catch((error) => console.log(error));

        // return () => {
        //     batchRef.off();
        // }
    }, []);
    
    const setDelivered = (obj) => {
        // const updates = {};
        // updates[`/batches/${obj.batchID}/deliveryStatus`] = "delivered";
        // return update(ref(db), updates);
        const deliveredCall = httpsCallable(functions, 'checkDelivered');
        console.log(IDStore.truckID);
        console.log(obj);
        deliveredCall({ batchID: obj.id, truckID: IDStore.truckID }).then((res) => {
            console.log("resed");
            console.log(res);
            if (res.data.deliveredCheck) {
                Alert.alert('Delivered');
            } else {
                Alert.alert('Not Delivered', `You are ${res.data.distance}km away from actual destination.`);
            }
        });
    }

    const signOff = (item) => {
        navigation.navigate("Sign", { batchID: item });
    }

    const onItemPress = async (item) => {
        console.log(item);
        
        const batchRef = ref(db, `batches/${item}`);
        get(batchRef).then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val();

                let subtitle = `Address: ${obj.address}`;
                if (obj.cargo) {
                    subtitle += "\n\nCartons:\n";
                    const cargo = Object.keys(obj.cargo);
                    cargo.forEach((carton) => {
                        subtitle += `- ${carton}\n`;
                    });
                }
        
                Alert.alert(
                    item + '',
                    subtitle,
                    obj.deliveryStatus === "delivered" ?
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'Sign off batch', onPress: () => signOff(item), style: "default"},
                    ]
                    :
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'Delivered', onPress: () => setDelivered(obj), style: "default"},
                    ]
                );
            } else {
                Alert.alert(
                    "Item not found"
                );
            }
        }).catch(
            (error) => {
                console.log(error);
            }
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
                batches.length > 0 ?
                batches.map(
                    (item, index) => (
                        <ListItem key={index} bottomDivider onPress={() => onItemPress(item)}>
                            <ListItem.Content>
                                <ListItem.Title>{item}</ListItem.Title>
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
                    : <Text>No batches</Text>
                }
                {/* <Button title="Deliver" onPress={ () => navigation.navigate("Sign") } /> */}
        </View>
    );
}

export default BatchDetails;