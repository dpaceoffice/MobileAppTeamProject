import React from "react";
import { View, StyleSheet, Image, TouchableOpacity} from "react-native";

const image = require('../../assets/logo.jpg');

const WelcomeScreen = (props) => {

    return <View style = {styles.container}>
    	<TouchableOpacity onPress = {()=>{props.navigation.navigate("Search")}}>
        <Image style={{width: 1024, height: 768}} source={image}/>
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