import { useRef } from "react";

import { View, Text, Alert } from "react-native";
import SignatureScreen from 'react-native-signature-canvas';

import { db, functions } from "../utils/firebase";
import { ref, update, set, get } from "firebase/database";
import { httpsCallable } from "firebase/functions";
import useIDStore from "../utils/useIDStore";

const Sign = ({ route, navigation }) => {
    const ref = useRef();
    const IDStore = useIDStore();
    const batchID = route.params.batchID;
    
    const handleOK = async (signature) => {
        // console.log(signature);

        // const batchID = navigation.getParam('batchID');
        console.log(batchID);

        // const truckRef = ref(db, `trucks/${IDStore.truckID}/batches`);
        // const oldRef = ref(db, `batches/pending/${batchID}`);
        // const newRef = ref(db, `batches/delivered/${batchID}`);
        // const batchObj = {};
        // const truckArr = [];
        // get(oldRef).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         batchObj = snapshot.val();
        //     }
        // }).then(() => {
        //     set(newRef, batchObj);
        // }).then(() => {
        //     get(truckRef).then((snapshot) => {
        //         if (snapshot.exists()) {
        //             const obj = snapshot.val();
        //             truckArr = Object.values(obj);
        //             truckArr = [...truckArr.filter(i => i.batchID !== batchID)]
        //             // for (let i = 0; i < truckArr.length; i++) {
        //             //     if (truckArr[i].batchID === batchID) {
        //             //         truckArr.splice(i, 1);
        //             //         break;
        //             //     }
        //             // }
        //         }
        //     })
        // }).then(() => {
        //     set(truckRef, truckArr);
        // }).then(() => {
        //     set(oldRef, null);
        // }).catch(err => console.log(err));

        const signOffCall = httpsCallable(functions, 'runSignOff'); 
        signOffCall({ batchID: batchID }).then((res) => {
            console.log(res);
            if (res.data.data.signOffSuccessful) {
                Alert.alert('Sign off successful');
                navigation.navigate("BatchDetails");
            } else {
                Alert.alert('Sign off failed');
            }
        }).catch(err => console.log(err));

        // console.log("Going to fetch");
        // const response = await fetch(`https://us-central1-kerry-logistics-cargo-tracking.cloudfunctions.net/runSignOff?batchID=${batchID}`);
        // console.log("fetched");
        // const json = await response.json();
        // console.log("response", json);
        // Alert.alert(json.data.signOffSuccessful ? 'Sign off successful' : 'Sign off failed');
    }
    
    return (
        <SignatureScreen 
            ref={ref}
            onOK={handleOK}
        />
    )
}

export default Sign;