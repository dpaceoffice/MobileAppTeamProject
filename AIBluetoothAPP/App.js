import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from "react";

import SearchScreen from "./src/screens/SearchScreen";
import BluetoothScreen from "./src/screens/BluetoothScreen";
import CameraScreen from "./src/screens/CameraScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AboutScreen from "./src/screens/AboutScreen";




const WelcomeStack = createStackNavigator(
	{
		Welcome: {
			screen: WelcomeScreen,
		},
		About: AboutScreen,


		Main: createBottomTabNavigator({

			Search: {
				screen: SearchScreen,
				navigationOptions: {
					tabBarLabel: "Screen",
					tabBarIcon: ({ tintColor }) => (
						<Ionicons name="search" color={tintColor} size={24} />
					)
				}
			},
			Bluetooth: {
				screen: BluetoothScreen,
				navigationOptions: {
					tabBarLabel: "Bluetooth",
					tabBarIcon: ({ tintColor }) => (
						<Ionicons name="bluetooth" color={tintColor} size={24} />
					)
				}
			},
			Camera: {
				screen: CameraScreen,
				navigationOptions: {
					tabBarLabel: "Camera",
					tabBarIcon: ({ tintColor }) => (
						<Ionicons name="camera" color={tintColor} size={24} />
					)
				}
			}
		},
			{
				initialRouteName: "Search",
				tabBarOptions: {
					activeTintColor: 'blue',
					inactiveTintColor: 'grey'

				}
			}
		)
	}

)



export default createAppContainer(WelcomeStack);