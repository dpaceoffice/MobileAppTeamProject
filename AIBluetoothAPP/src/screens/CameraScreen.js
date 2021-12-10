import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/coco-ssd';
import { Text, View } from "react-native";
import Canvas from 'react-native-canvas';
import { drawRect } from "../utilities";
import { LogBox, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import yolo from 'tfjs-yolo';


let frame = 0;
const computeRecognitionEveryNFrames = 60;

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function CameraScreen() {
    const [dimensions, setDimensions] = useState({ window, screen });
    let height = dimensions.window.height;
    let width = dimensions.window.width;
    console.log(dimensions.screen.width)
    const TensorCamera = cameraWithTensors(Camera);
    const [hasPermission, setHasPermission] = useState(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const initialiseTensorflow = async () => {
        await tf.ready();
        tf.getBackend();
    }

    handleCameraStream = (images) => {
        const loop = async () => {
            if (model) {
                if (frame % computeRecognitionEveryNFrames === 0) {
                    const nextImageTensor = images.next().value;
                    if (nextImageTensor) {
                        canvasRef.current.width = width;
                        canvasRef.current.height = height;
                        const ctx = canvasRef.current.getContext("2d");
                        const prediction = await model.detect(nextImageTensor);

                        //tensor = nextImageTensor.expandDims(axis=0);
                        //const predications = await model.predict(tensor);
                        //console.log(tensor);
                        //await model.predict(tensor, {batchSize: 1});

                        
                        // prediction.forEach((pred, i) => {
                        // console.log('INDEX:'+i+'---------------------------------------------------------------------');
                        //const norm = pred.print();
                        // console.log(pred)
                        //console.log(pred.data());
                        // pred.print();
                        // console.log('--------------------------------------------------------------------------------')
                        // })
                        //console.log(width);
                        //console.log(height);

                        drawRect(prediction, ctx, canvasRef)
                        //ctx.transform(1, 0, 0, 1, 100, 0);
                        tf.dispose(nextImageTensor);
                    }
                }
                frame += 1;
                frame = frame % computeRecognitionEveryNFrames;
            }
            requestAnimationFrame(loop);
        }
        loop();
    };

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
              setDimensions({ window, screen });
            }
          );
        LogBox.ignoreLogs(['in webgl locks the UI thread']);
        (async () => {

            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            // initialise Tensorflow
            await initialiseTensorflow();
            // load the model
            const modelJson = await require('../../assets/model.json');
            const modelWeight = await require('../../assets/weights.bin');
            
            setModel(await mobilenet.load(bundleResourceIO(modelJson, modelWeight)));
             //setModel(await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight)));
        })();
        return () => subscription?.remove();
    }, []);

    let textureDims;
    if (Platform.OS === 'ios') {
        textureDims = {
            height: 1920,
            width: 1080,
        };
    } else {
        textureDims = {
            height: 1200,
            width: 1600,
        };
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center' }}><Text>Please allow access to the camera to view this screen.</Text></View>;
    }
    if (!model) {
        return <View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center' }}><Text>Loading model, please wait.</Text></View>
    }
    return (<View style={{ flex: 1, height: '100%'}}>
        <View style={{ width: width, height: '100%' }}>
            <View style={{ position: 'absolute',width: '100%', height: '100%'}}>
                <TensorCamera style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: width,
                    height: height,
                    zindex: 0,
                }}
                    type={type}
                    cameraTextureHeight={textureDims.height}
                    cameraTextureWidth={textureDims.width}
                    resizeDepth={3}
                    resizeHeight={height}
                    resizeWidth={width}
                    onReady={this.handleCameraStream}
                    autorender={true}>
                </TensorCamera>
            </View>
            <Canvas
                ref={canvasRef}
                style={{
                    height: height,
                    width: width,
                    zindex: 1,
                }}
            />
        </View>
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
    );
}