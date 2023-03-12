var appId = "P666175409079";
var deviceId = "85ef4cd1-1bd0-40c0-9544-7c7df429fb32";
var apiKey = "2xyP1uoRSQ9SrXngh1mvcq1ZTSbvnAPp";
var apiSecret = "#id3R4g()eh0n2u!g~rY4hGE$zNwJOyy";
var alias = "No.1";

var endpoint = `https://api.netpie.io/v2/device/shadow/data?alias=`;

fetch(endpoint, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Device ${deviceId}:${apiKey}`,
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Received data:", data);
    var data = JSON.parse(JSON.stringify(data)).data;

    //document.querySelector('p').innerHTML = JSON.stringify(data);

    let d1 = document.querySelector("#d1");
    const myImage = document.getElementById("myImage");
    myImage.src = "img/" + calculateAQI(data.pm25) + ".png";
    d1.innerHTML = d1Text(calculateAQI(data.pm25));

    document.querySelector("#d2").innerHTML = data.pm25 ;
    document.querySelector("#d3").innerHTML = data.pm10 ;
    document.querySelector("#d4").innerHTML = data.co ;
    document.querySelector("#d5").innerHTML = data.humi ;
    document.querySelector("#d6").innerHTML = data.temperature ;
    document.querySelector("#d7").innerHTML = "Assumption University";//data.place;

    // Process the received data here
  })
  .catch((error) => console.error(error));

function calculateAQI(pm25) {
  let pm = parseFloat(pm25);
  if (pm >= 0 && pm <= 12) {
    return "green";
  } else if (pm > 12 && pm <= 35.4) {
    return "yellow";
  } else if (pm > 35.4 && pm <= 55.4) {
    return "orange";
  } else if (pm > 55.4 && pm <= 150.4) {
    return "red";
  } else if (pm > 150.4 && pm <= 250.4) {
    return "violet";
  } else {
    return "brown";
  }
}

function d1Text(text) {
  if (text == "green") {
    return "<strong>Good air quality</strong> <br>Good air quality, suitable for outdoor activities and tourism as usual.";
  } else if (text == "yellow") {
    return "<strong>Moderate</strong> <br>For the general public: Suitable for outdoor activities and tourism as usual. <br>For people who are sensitive to air pollution: If you experience symptoms such as coughing, sore throat, or irritation, reduce outdoor activities.";
  } else if (text == "orange") {
    return "<strong>Starting to impact health</strong> <br>For the general public: Be cautious about your health. If you experience initial symptoms, reduce outdoor activities immediately. <br>For people who are sensitive to air pollution: Reduce the amount of time spent doing outdoor activities.";
  } else if (text == "red") {
    return "<strong>Significantly impacts health</strong> <br>Everyone should reduce time spent doing outdoor activities or avoid outdoor activities during this time.";
  } else if (text == "violet") {
    return "<strong>Severely impacts health</strong> <br>Everyone should avoid all outdoor activities.";
  } else {
  }
}
