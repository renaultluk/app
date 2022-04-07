import { useRef } from "react";

import { View, Text } from "react-native";
import SignatureScreen from 'react-native-signature-canvas';


const Sign = ({ navigation }) => {
    const ref = useRef();
    
    const handleOK = (signature) => {
        console.log(signature);
        navigation.navigate("BatchDetails");
    }
    
    return (
        <SignatureScreen 
            ref={ref}
            onOK={handleOK}
        />
    )
}

export default Sign;