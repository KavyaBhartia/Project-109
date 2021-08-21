Prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vGR6mOPLm/model.json', modelLoaded);
function modelLoaded()
{
    console.log("Model is loaded");
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);    
}
function gotResult(error , results)
{
if (error) 
{
console.error(error);    
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction1 = results[0].label;
    speak();
    if (results[0].label == "Thumb up") 
    {
        document.getElementById("update_emoji").innerHTML = "👍 - That's nice";
    }
    if (results[0].label == "Thumb down") 
    {
    document.getElementById("update_emoji").innerHTML = "👎 - That's dumb";
    }
    if (results[0].label == "nice") 
    {
    document.getElementById("update_emoji").innerHTML = "👌 - It is fine";    
    }
    if (results[0].label == "Yo") 
    {
    document.getElementById("update_emoji").innerHTML = "🤟 - Yo its amazing";    
    }
    if (results[1].label == "Clap") 
    {
        document.getElementById("update_emoji").innerHTML = "👏 - It deserve a clap";
    }
}}