import React from "react";
import {Text,StyleSheet,View,TextInput} from "react-native";
import {Entypo} from "@expo/vector-icons";

const SearchBar = (props) => {
	return <View style = {styles.background}>
		
		<Entypo size = {30} name = "magnifying-glass"/>
		
		<TextInput 
			style = {styles.text} 
			placeholder = "Search"
			value = {props.searchTerm}
			onChangeText = {(newTerm) => props.onTermChange(newTerm)}
		/>

	</View>
}

const styles = StyleSheet.create({
	background:{
		backgroundColor:"lightgrey",
		borderColor:"black",
		borderRadius:5,
		borderWidth:3,
		width:275,
		marginHorizontal:1,
		flexDirection:"row"
	},
	text:{
		fontSize:20
	}
});

export default SearchBar;