import React from "react";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity} from "react-native";

const image = require('../../assets/logo.jpg');

const WelcomeScreen = (props) => {

    return <View style = {styles.container}>
    	<TouchableOpacity onPress = {()=>{props.navigation.navigate("Main")}}>
        <Image style={styles.image}> source={image}</Image>
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black'
    },
 
});

export default WelcomeScreen;