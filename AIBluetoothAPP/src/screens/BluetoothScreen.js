import React from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView} from "react-native";

const BluetoothScreen = (props) => {

    return <View style = {styles.container}>
        <Text>Bluetooth Screen</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default BluetoothScreen;