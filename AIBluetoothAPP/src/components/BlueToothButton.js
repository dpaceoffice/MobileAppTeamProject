import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const BlueToothButton = () => {
    const [toggle, setToggle] = useState(true);
    const toggleFunc = () => {
        setToggle(!toggle);
    }
    const textValue = toggle ? "Unpaired" : "Paired"
    const buttonBG = toggle ? "grey" : "dodgerblue"
    const textColor = toggle ? "white" : "white"

    return <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonBG }]}
            onPress={() => { toggleFunc() }

            }>
            <Text style={[styles.buttonText, { color: textColor }]}>{textValue}</Text>
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    
    buttonContainer: {
        flexDirection: "row",
        width: 150,
    },
    button: {
        margin: 10,
        flex: 1,
        height: 60,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "black"
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16
    }
});

export default BlueToothButton;