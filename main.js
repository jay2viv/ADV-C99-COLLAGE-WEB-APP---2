Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 Webcam.attach( "#camera" );

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {    
    console.log(event);

    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if (content=="take my selfie") {
        speak();
        setTimeout(function(){
            take_picture();
            downloadpic();
        },5000);
    }
}

 function take_picture()
 {
    Webcam.snap( function(data_uri) {
        document.getElementById('result').innerHTML = 
         '<img id="picture" src="'+data_uri+'"/>';
    } );
 }

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function downloadpic()
{
    link = document.getElementById("link");
    link.href = document.getElementById("picture").src;
    link.click();
}