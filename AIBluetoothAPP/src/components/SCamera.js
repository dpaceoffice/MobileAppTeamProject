import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/coco-ssd';
import { Text, View } from "react-native";
import Canvas from 'react-native-canvas';
import { drawRect } from "../utilities";
import { LogBox, Dimensions, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


let frame = 0;
const computeRecognitionEveryNFrames = 60;

export default function SCamera(props) {
  let { width, height } = Dimensions.get('window');
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
            //console.log(tensor);
            //const prediction = await model.predict(tensor, {batchSize:1});
            // prediction.forEach((pred, i) => {
            // console.log('INDEX:'+i+'---------------------------------------------------------------------');
            //const norm = pred.print();
            // console.log(pred)
            //console.log(pred.data());
            // pred.print();
            // console.log('--------------------------------------------------------------------------------')
            // })
            drawRect(prediction, ctx, canvasRef)
            //console.log(prediction);        
            //console.log(canvasRef.current.width)
            //console.log(canvasRef.current.height)
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
    LogBox.ignoreLogs(['in webgl locks the UI thread']);

    (async () => {

      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      // initialise Tensorflow
      await initialiseTensorflow();
      // load the model
      setModel(await mobilenet.load());
      const modelJson = await require('../../assets/model.json');
      const modelWeight = await require('../../assets/weights.bin');
      // setModel(await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight)));
    })();
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
    return <Text>Please allow access to the camera to view this screen.</Text>;
  }
  if (!model) {
    return <Text>Loading model, please wait.</Text>
  }
  return (<View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center' }}>
  <View style={{ width: '100%', height: '100%' }}>
    <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <TensorCamera style={{
        marginLeft: "auto",
        marginRight: "auto",
        zindex: 0,
        height: height,
        width: width,
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