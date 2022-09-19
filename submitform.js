var input = document.getElementById("inputtext");
var submit = document.getElementById("submit");
var studyNotes = document.getElementById("studyguide");
var summary, keywords, keywordList, easySummaryText, indexStart, indexEnd;

function studyGuide() {
    document.getElementById("output").innerHTML += "&#13;&#10;&#13;&#10;Here are some topics worth focusing on:";
    var url = "https://api.openai.com/v1/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer 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");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        keywords = xhr.responseText;
        indexStart = keywords.indexOf("\\n") + 2;
        indexEnd = keywords.indexOf("\",\"index");
        keywords = keywords.substring(indexStart, indexEnd);
        keywordList = keywords.split(", ");
        for (let i = 0; i < keywordList.length; i++) {
            document.getElementById("output").innerHTML += "&#13;&#10;" + (i + 1) + ". " + keywordList[i];
        }
    }};

    var data = {
        "model": "text-davinci-002",
        "prompt": "Extract 5 short keywords from this text with ONLY commas:\n\n" + input.value,
        "temperature": 1,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    };

    xhr.send(JSON.stringify(data));
}

function easySummary() {
    var url = "https://api.openai.com/v1/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer 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");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        easySummaryText = xhr.responseText;
        indexStart = easySummaryText.indexOf("\\n") + 2;
        indexEnd = easySummaryText.indexOf("\",\"index");
        easySummaryText = easySummaryText.substring(indexStart, indexEnd).replace(/\\n/g, "&#13;&#10;");
        document.getElementById("output").innerHTML += "&#13;&#10;&#13;&#10;" + easySummaryText;
        studyGuide();
    }};

    var data = {
        "model": "text-davinci-002",
        "prompt": "Summarize this for a seventh-grade student:\n\n" + input.value,
        "temperature": 0.3,
        "max_tokens": 64,
        "top_p": 0.7,
        "frequency_penalty": 0,
        "presence_penalty": 0
    };

    xhr.send(JSON.stringify(data));
}

function noteGenerator() {
    var url = "https://api.openai.com/v1/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer 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");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        summary = xhr.responseText;
        //alert(summary);
        indexStart = summary.indexOf("\\n\\n") + 4;
        indexEnd = summary.indexOf("\",\"index");
        summary = summary.substring(indexStart, indexEnd).replace(/\\n/g, "&#13;&#10;");
        document.getElementById("output").innerHTML = summary;
        easySummary();
    }};

    var data = {
        "model": "text-davinci-002",
        "prompt": input.value + "\n\nSummarize the above using bullet points",
        "temperature": 0.6,
        "max_tokens": 3375,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    };

    xhr.send(JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function() {
    submit.addEventListener('click', noteGenerator);
});
