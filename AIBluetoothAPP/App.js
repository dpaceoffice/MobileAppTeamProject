import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import BluetoothScreen from "./src/screens/BluetoothScreen";
import CameraScreen from "./src/screens/CameraScreen";

const navigator = createStackNavigator ({
		Search:SearchScreen,
    Bluetooth: BluetoothScreen,
    Camera: CameraScreen
	},
	{
		initialRouteName:"Search",
		defaultNavigationOptions:{
			title:"Detection"
		}
	}
)

export default createAppContainer(navigator);