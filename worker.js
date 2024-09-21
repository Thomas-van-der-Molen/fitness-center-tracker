function getUserPos(){

    function success(pos){
      checkUserPos(pos.coords);
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