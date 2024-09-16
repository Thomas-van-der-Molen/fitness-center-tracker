async function getDataFromServer() {
  const fromServer = await fetch("https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/get_data")
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

async function giveDataToServer(coords){
  //console.log("client lat/long datatype");
  //console.log(typeof coords.latitude);
  const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/get_data";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":"application/x-www-form-urlencoded",
    },
    body: JSON.stringify({lat:coords.latitude.toString(),lon:coords.longitude.toString()})
  });

  const data = await response.json();
  console.log("data returned by the server");
  console.log(data);
}

function getUserPos(){

  function success(pos){
    giveDataToServer(pos.coords);
  }

  function error(err){
    console.log(err);
  }
  navigator.geolocation.getCurrentPosition(success, error)
}

//getDataFromServer();
getUserPos();


//document.querySelector("#find-me").addEventListener("click", geoFindMe);
//document.querySelector("#find-me").addEventListener("click", getDataFromServer);