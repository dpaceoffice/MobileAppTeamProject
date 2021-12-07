import React, {useState} from "react";
import { Text, View, StyleSheet, FlatList, } from "react-native";
import SearchBar from "../components/SearchBar";

const SearchScreen = (props) => {
    const [searchTerm,setSearchTerm] = useState("");

    return <View style = {styles.container}>
        <SearchBar 
            searchTerm = {searchTerm} 
            onTermChange = {(newTerm) => setSearchTerm(newTerm)}
        />
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    }
});

export default SearchScreen;