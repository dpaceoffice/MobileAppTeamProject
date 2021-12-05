import React, { useRef, useState, useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/coco-ssd';
import { Camera } from 'expo-camera';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import SCamera from '../components/SCamera';
import { Image, Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { LogBox } from 'react-native';

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
            <Text style={{ alignSelf: 'center', marginBottom: 20 }}> Flip </Text>
        </TouchableOpacity>
    </View>

}

export default CameraScreen;