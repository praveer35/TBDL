if ("webkitSpeechRecognition" in window) {
    

    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    let final_transcript = "";
    var started = false;
    speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.querySelector("#inputtext").innerHTML = final_transcript + interim_transcript;
        //document.querySelector("#interim").innerHTML = interim_transcript;
    };

    document.querySelector("#record").onclick = () => {
        if(started === false){
            alert("START. Click the same button to STOP. Click TL;DR to summarize.");
            speechRecognition.start();
            started = true;
        }else{
            speechRecognition.stop();
            started = false;
        }  
    };

} else {
    console.log("Speech Recognition Not Available")
}