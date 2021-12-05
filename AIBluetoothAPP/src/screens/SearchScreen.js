import React from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView} from "react-native";
import SearchBar from "../components/SearchBar";

const SearchScreen = (props) => {

    return <View style = {styles.container}>
        <SearchBar />
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