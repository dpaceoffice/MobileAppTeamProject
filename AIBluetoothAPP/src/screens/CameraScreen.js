import React, { useState} from "react";
import { Camera } from 'expo-camera';
import SCamera from '../components/SCamera';
import { View,TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = () => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    return <View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center' }}>
        <SCamera type={type} />
        <TouchableOpacity
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                );
            }}>
            <Ionicons name="camera-reverse" size={50} style={{
                bottom: 50,
                color: 'white',
                alignSelf: 'center'
            }} />
        </TouchableOpacity>
    </View>

}

export default CameraScreen;