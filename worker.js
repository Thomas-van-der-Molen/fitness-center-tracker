function getUserPos() {

    function success(pos) {
        checkUserPos(pos.coords);
    }

    function error(err) {
        console.log("update fail");
        document.querySelector("#debug").textContent = "error updating position" + " last update " + Date.now();
        console.log(err);
    }
    //navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true});
    if("geolocation" in self.navigator){
        postMessage("geolocaiton available");
    }
    else{
        postMessage("geolocation not avaiable in service worker");
    }
    //navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true });
}

let lastUserAtGym = false;
function checkUserPos(coords) {
    max_lon = -81.0490581547
    min_lon = -81.0501176272
    max_lat = 29.190036488
    min_lat = 29.189212246

    userAtGym = false;
    //document.querySelector("#map-link").href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
    document.querySelector("#debug").textContent = coords.latitude.toString() + " " + coords.longitude.toString() + " last update " + Date.now();
    if (coords.latitude > min_lat && coords.longitude > min_lon && coords.latitude < max_lat && coords.longitude < max_lon) {
        //user is at the gym
        //document.querySelector("#temp").textContent = "true";
        userAtGym = true;
    }
    else {
        //user is not at the gym
        //document.querySelector("#temp").textContent = "false";
        userAtGym = false;
    }

    updateDisplay(userAtGym);

    //only notify the server if user's status of "at gym" or "not at gym" changed
    if (userAtGym != lastUserAtGym) {
        lastUserAtGym = userAtGym;
        document.querySelector("#debug").textContent = "Invoked server API";
        //call the API
        if (userAtGym) {
            //the user just entered the gym
            incrementCount();
            updateCount();
        }
        else {
            //the user just left the gym
            decrementCount();
            updateCount();
        }
    }
    else {
        document.querySelector("#debug").textContent = "";
    }

}

async function incrementCount() {
    const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/get_data";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "function": "inc_count" })
    });
}

async function decrementCount() {
    const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/get_data";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "function": "dec_count" })
    });
}

getUserPos();