import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff"
    },
    logo: {
        width: 220,
        height: "100%",
        resizeMode: "contain"
    },
});

export default styles;