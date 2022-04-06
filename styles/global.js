import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import colors from "./colors";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 40,
        paddingHorizontal: 16,
        backgroundColor: colors.backgroundColor,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        height: 40,
        width: "80%",
        marginVertical: 8,
    }
})

export default globalStyles;