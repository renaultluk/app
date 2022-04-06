import React, { useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { Icon, ListItem } from "react-native-elements";

import BatchListItem from "../components/BatchListItem";
import globalStyles from "../styles/global";

const BatchDetails = ({ navigation }) => {
    const [batch, setBatch] = useState([
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
    
    const refreshData = () => {

    }

    const signOff = (item) => {
        navigation.navigate("Sign");
    }

    const onItemPress = (item) => {
        const subtitle = item.safe ? "safe" : item.issue;
        
        Alert.alert(
            item.name,
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

                    <Text style={globalStyles.title}>BatchDetails</Text>
                    <Icon 
                        name="cog"
                        type="font-awesome"
                        color="#ec6c04"
                        size={30}
                        onPress={() => navigation.navigate("Settings")}
                    />
                </View>
            {
                batch.map(
                    (item, index) => (
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