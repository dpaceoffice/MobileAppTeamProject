import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors, bundleResourceIO, fetch } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/coco-ssd';
import { Text, View } from "react-native";
import Canvas from 'react-native-canvas';
import {drawRect} from "../utilities";
import { LogBox, Dimensions } from 'react-native';

let frame = 0;
const computeRecognitionEveryNFrames = 60;

export default function SCamera(props) {
  let { width, height } = Dimensions.get('window');
  const TensorCamera = cameraWithTensors(Camera);
  const [hasPermission, setHasPermission] = useState(null);
  const canvasRef = useRef(null);
  const [net, setNet] = useState(null);

  const initialiseTensorflow = async () => {
    await tf.ready();
    tf.getBackend();
  }

  handleCameraStream = (images) => {
    const loop = async () => {
      if (net) {
        if (frame % computeRecognitionEveryNFrames === 0) {
          const nextImageTensor = images.next().value;
          if (nextImageTensor) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            const ctx = canvasRef.current.getContext("2d");
            const objects = await net.detect(nextImageTensor);
            //nextImageTensor.shape.unshift(1);
            console.log(nextImageTensor.shape);
            //const objects = await net.predict(nextImageTensor).data()
            drawRect(objects, ctx,canvasRef)
            console.log(objects);        
            console.log(canvasRef.current.width)
            console.log(canvasRef.current.height)
            tf.dispose([nextImageTensor]);
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
      setNet(await mobilenet.load());
      const modelJson = await require('../../assets/model.json');
      const modelWeight = await require('../../assets/weights.bin');
     // setNet(await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight)));
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
    return <Text>No access to camera</Text>;
  }
  if (!net) {
    return <Text>Model not loaded</Text>
  }
  return (<View style={{width:'100%',height:'100%'}}>
      <View style={{position:'absolute', left:0, top:0, width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
      <TensorCamera style={{
        marginLeft: "auto",
        marginRight: "auto",
        zindex: 0,
        height: '100%',
        width: '100%',
      }}
        type={props.type}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight= {826}
        resizeWidth=  {464}
        resizeDepth={3}
        onReady={this.handleCameraStream}
        autorender={true}>
      </TensorCamera>
        </View>
        <Canvas
        ref={canvasRef}
        style={{
          width:'100%',
          height:'100%',
          zindex: 1,
        }}
      />
      </View>
  );
}