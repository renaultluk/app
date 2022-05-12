import { useRef } from "react";

import { View, Text } from "react-native";
import SignatureScreen from 'react-native-signature-canvas';

import { db, functions } from "../utils/firebase";
import { ref, update, set, get } from "firebase/database";
import { httpsCallable } from "firebase/functions";
import useIDStore from "../utils/useIDStore";

const Sign = ({ navigation }) => {
    const ref = useRef();
    const IDStore = useIDStore();
    
    const handleOK = (signature) => {
        console.log(signature);

        const batchID = navigation.getParam('batchID');

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
        signOffCall({ batchID, signature }).then((res) => {
            if (res.signOffSuccessful) {
                console.log('Sign off successful');
                navigation.navigate("BatchDetails");
            }
        }).catch(err => console.log(err));
    }
    
    return (
        <SignatureScreen 
            ref={ref}
            onOK={handleOK}
        />
    )
}

export default Sign;