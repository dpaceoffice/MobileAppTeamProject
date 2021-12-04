import {  Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const drawRect = (detections, ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    //ctx.fillRect(0,0, canvas.current.width,canvas.current.height)
    detections.forEach(prediction=>{
        const [x,y,width,height] = prediction['bbox'];
        const text = prediction['class'];

        const color = 'red'
        ctx.strokeStyle = color;
        ctx.font = '18px Arial'
        ctx.fillStyle = color

        ctx.beginPath();
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        
        ctx.stroke()
    })
}