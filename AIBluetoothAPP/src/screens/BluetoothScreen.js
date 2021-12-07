import React, {Component} from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView} from "react-native";
import BlueToothButton from "../components/BlueToothButton";

const BluetoothScreen = (props) => {
    
    return <View style = {styles.container}>
        <Text>Robot </Text>
        <BlueToothButton />

    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        backgroundColor: "whitesmoke",
        flexDirection: "row",

    },
   
});

export default BluetoothScreen;