alert("START")
var token = "b93cb04ce20d40dd995c06e55cce6fc3";
fetch("https://api.assemblyai.com/v2", {
  headers: {
    Authorization: token
  }
});
alert("dfsT")
const axios = require("axios");
  
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: token,
        "content-type": "application/json",
    },
});
assembly
   
    .post("/transcript", {
        audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
    .get(`/transcript/${YOUR-TRANSCRIPT-ID-HERE}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
