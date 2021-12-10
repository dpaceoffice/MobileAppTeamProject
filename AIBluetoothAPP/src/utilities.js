import {  Dimensions } from "react-native";

function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
let toggle = 0;
export const drawRect = (detections, ctx, canvas) => {
    const { wwidth, wheight } = Dimensions.get('screen');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    //ctx.fillRect(0,0, canvas.current.width,canvas.current.height)
    detections.forEach(prediction=>{
        const [x,y,width,height] = prediction['bbox'];
        const text = prediction['class'];
        const score = Math.round((prediction['score']+Number.EPSILON)*100);

        const color = 'red'
        ctx.strokeStyle = color;
        ctx.font = '18px Arial'
        ctx.fillStyle = color
        //ctx.translate(0,canvas.current.width)
        //ctx.scale(-1,1)
        ctx.transform(-1, 0, 0, 1, 410, 0);
        ctx.beginPath();        
        //ctx.fillText(''+reverseString(score.toString(10))+'%',x+10,y-5)
        ctx.rect(x,y,width,height)
        ctx.fillText(''+reverseString(text),x,y-5)
        
        ctx.stroke()
    })
}