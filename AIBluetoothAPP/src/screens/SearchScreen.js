import React, {useState} from "react";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import SearchBar from "../components/SearchBar";
import { AntDesign } from '@expo/vector-icons'; 


const SearchScreen = (props) => {
    const [searchTerm,setSearchTerm] = useState("");


    return <View style = {styles.container}>
   		 <SearchBar />
		<TouchableOpacity style={styles.about}
		onPress={()=>{props.navigation.navigate("About")}}
		>
			<AntDesign name="infocirlce" size={35} color="white" />
		</TouchableOpacity>

    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: '#083050'
    },

    about: {
  		alignSelf: "flex-start",
  		left: 15,
  		position: 'absolute',
  		marginTop: 10
    },

});

export default SearchScreen;