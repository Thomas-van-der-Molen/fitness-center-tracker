function sendLocationToServer(location) {
  //console.log(location);
  console.log(JSON.stringify(location));
  fetch("https://localhost/getLocation", {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      //fix this before production release
      //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default

    }
  });
}

async function getDataFromServer() {
  const fromServer = await fetch("https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/send_to_client")
  const data = await fromServer.json();
  console.log(data);
  //console.log(data.User_at_fitness_center);
  
  if(data.User_at_fitness_center){
    //the server has determined that the user is at the gym
    document.querySelector("#location_at_gym").style.display = "";
    document.querySelector("#location_not_gym").style.display = "none";
  }
  else{
    //the sever has determined that the user is not at the gym
    document.querySelector("#location_at_gym").style.display = "none";
    document.querySelector("#location_not_gym").style.display = "";
  }
}

async function giveDataToServer(data){

}

function geoFindMe(){
  
  function success(pos){
    //giveDataToServer(pos);
    giveDataToServer(pos);
  }

  function error(err){

  }

  navigator.geolocation.watchPosition(success,error,{enableHighAccuracy: true});
}

getDataFromServer();
geoFindMe();

//document.querySelector("#find-me").addEventListener("click", geoFindMe);
//document.querySelector("#find-me").addEventListener("click", getDataFromServer);