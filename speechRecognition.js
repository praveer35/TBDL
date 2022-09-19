if ("webkitSpeechRecognition" in window) {
    alert("in it");
    let speechRecognition = new webkitSpeechRecognition();
    alert("1");
    speechRecognition.continuous = true;
    alert("2");
    speechRecognition.interimResults = true;
    alert("3");
    //speechRecognition.lang = "english";

    let final_transcript = "";
    alert("4");
    speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.querySelector("#final").innerHTML = final_transcript;
        document.querySelector("#interim").innerHTML = interim_transcript;
    };

    document.querySelector("#start").onclick = () => {
        speechRecognition.start();
    };
      document.querySelector("#stop").onclick = () => {
        speechRecognition.stop();
    };

} else {
    console.log("Speech Recognition Not Available")
}