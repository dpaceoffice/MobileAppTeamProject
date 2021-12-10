import React from "react";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ImageBackground, Linking} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const AboutScreen = (props) => {

	const image = require('../../assets/logo.jpg');
	const background = require('../../assets/background.jpg');

    return <View>
    	<ImageBackground 
		     style={styles.background}
		source={background}>
		
    	<Image style={styles.image} source={image}/>
    	  <Text style={styles.logo}> Omniscient</Text>
        <Text style={styles.team}> Developers: </Text>
      
        <TouchableOpacity onPress={() => 
        	Linking.openURL('mailto:dwpace@uno.edu') }> 
        	<Text style={styles.david}> <MaterialCommunityIcons name="face" size={40} color="black" />   David Pace </Text>
        	</TouchableOpacity>

        <Text style={styles.email1}> <Feather name="mail" size={24} color="black" />: 	 		dwpace@uno.edu  </Text>

        <TouchableOpacity onPress={() => 
        	Linking.openURL('mailto:atran3@uno.edu') }> 
        	<Text style={styles.andy}> <MaterialCommunityIcons name="face" size={40} color="black" />   Andy Tran</Text>
        	</TouchableOpacity>

        <Text style={styles.email2}> <Feather name="mail" size={24} color="black" />: 			atran3@uno.edu </Text>

        <TouchableOpacity onPress={() => 
        	Linking.openURL('mailto:ttngu119@uno.edu') }> 
        	<Text style={styles.truc}> <MaterialCommunityIcons name="face-woman" size={40} color="black" />   Truc Nguyen </Text>
        	</TouchableOpacity>

        <Text style={styles.email3}> <Feather name="mail" size={24} color="black" />: 			ttngu119@uno.edu</Text>


        	
        </ImageBackground>
    </View>
}


const styles = StyleSheet.create({
	image:{
		width: 100,
		height: 100,
		alignSelf: 'center',
		padding: 100
	

	},
	logo:{
		fontSize:20,
		alignSelf: 'center',

	},
	team:{
		fontSize: 30,
		padding: 20,


	},
	david:{
		fontSize: 20,
		padding: 5,
		borderRadius:30,
         borderWidth: 4,
         width:200,

	},
	email1:{

		fontSize: 20,
		padding: 20,
		left: 50,

	},
	andy:{
		fontSize: 20,
		padding: 5,
		borderRadius:30,
         borderWidth: 4,
         width:200,


	},
	email2:{
		fontSize: 20,
		padding: 20,
		left: 50

	},
	truc:{
		fontSize: 20,
		padding: 5,
		borderRadius:30,
         borderWidth: 4,
         width:200,

	},
	email3:{
		fontSize: 20,
		padding: 20,
		left: 50

	},
	
	background:{
		width: '100%',
		height: '100%'

		 
	},
    
});

export default AboutScreen;