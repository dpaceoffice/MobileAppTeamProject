import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from "react";

import SearchScreen from "./src/screens/SearchScreen";
import BluetoothScreen from "./src/screens/BluetoothScreen";
import CameraScreen from "./src/screens/CameraScreen";

const SearchStack = createStackNavigator({
	Search: SearchScreen,

});

const BluetoothStack = createStackNavigator({
	Bluetooth: BluetoothScreen,

});

const CameraStack = createStackNavigator({
	Camera: CameraScreen,

});

const navigator = createBottomTabNavigator ({
		Search:{screen: SearchStack,
			navigationOptions: {
				tabBarLabel: "Screen",
				tabBarIcon: ({tintColor}) => (
					<Ionicons name = "search" color = {tintColor} size = {24}/>
				)
			}
		},
		Bluetooth: {screen: BluetoothStack,
			navigationOptions: {
				tabBarLabel: "Bluetooth",
				tabBarIcon: ({tintColor}) => (
					<Ionicons name = "bluetooth" color = {tintColor} size = {24}/>
				)
			}
		},
		Camera: {screen: CameraStack,
			navigationOptions: {
				tabBarLabel: "Camera",
				tabBarIcon: ({tintColor}) => (
					<Ionicons name = "camera" color = {tintColor} size = {24}/>
				)
			}
		}
	},
	{
		initialRouteName:"Search",
		tabBarOptions: {
			activeTintColor: 'blue',
			inactiveTintColor: 'grey'
			
		}
	}
	
)

export default createAppContainer(navigator);