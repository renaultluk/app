import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import colors from "../colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 40,
        paddingHorizontal: 16,
        backgroundColor: colors.backgroundColor,
    },
});

export default styles;