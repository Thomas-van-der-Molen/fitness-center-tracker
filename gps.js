function updateDisplay(User_at_fitness_center){
  if(User_at_fitness_center){
    //the server has determined that the user is at the gym
    document.querySelector("#location_at_gym").style.display = "";
    document.querySelector("#location_not_gym").style.display = "none";
    document.querySelector("#temp").textContent = "you are at the fitness center";
  }
  else{
    //the sever has determined that the user is not at the gym
    document.querySelector("#location_at_gym").style.display = "none";
    document.querySelector("#location_not_gym").style.display = "";
    document.querySelector("#temp").textContent = "you are not at the fitness center";
  }
}

async function giveDataToServer(coords){
  //console.log("client lat/long datatype");
  //console.log(typeof coords.latitude);
  const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/get_data";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify({lat:coords.latitude.toString(),lon:coords.longitude.toString()})
  });

  const data = await response.json();
  console.log("data returned by the server");
  //console.log(data.User_at_fitness_center);
  updateDisplay(data.User_at_fitness_center);
}

function checkUserPos(coords){
  max_lon = -81.0490581547
  min_lon = -81.0501176272
  max_lat = 29.190036488
  min_lat = 29.189212246

  //document.querySelector("#map-link").href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
  document.querySelector("#debug").textContent = coords.latitude.toString() + " " + coords.longitude.toString() + " last update " + Date.now();
  if(coords.latitude > min_lat && coords.longitude > min_lon && coords.latitude < max_lat && coords.longitude < max_lon){
    document.querySelector("#temp").textContent = "true";
  }
  else{
    document.querySelector("#temp").textContent = "false";
  }

}

function getUserPos(){

  function success(pos){
    checkUserPos(pos.coords);
    //giveDataToServer(pos.coords);
    //check the coordinates clientside
    //const max_lat  = -81.0499630643;
    //const min_lat  = -81.049240209;

    //const max_lon  = 29.1899521529;
    //const min_lon  = 29.1893445087;

  }

  function error(err){
    console.log("update fail");
    document.querySelector("#debug").textContent = "error updating position" + " last update " + Date.now();
    console.log(err);
  }
  //navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true});
  navigator.geolocation.watchPosition(success, error, {enableHighAccuracy: true});
}


getUserPos();


