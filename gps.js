function updateDisplay(User_at_fitness_center){
  if(User_at_fitness_center){
    //the server has determined that the user is at the gym
    document.querySelector("#location_at_gym").style.display = "";
    document.querySelector("#location_not_gym").style.display = "none";
    //document.querySelector("#temp").textContent = "you are at the fitness center";
  }
  else{
    //the sever has determined that the user is not at the gym
    document.querySelector("#location_at_gym").style.display = "none";
    document.querySelector("#location_not_gym").style.display = "";
    //document.querySelector("#temp").textContent = "you are not at the fitness center";
  }
}

async function updateCount(){
  const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d8c87cf3-3b1e-403c-86e4-290e57b53ce7/site_functions/get_data";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify({"function":"get_count"})
  });
  const data = await response.json();
  //console.log(data);
  document.querySelector("#numUsersLabel").textContent = "Users at the gym: " + data.count.toString();
}

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("worker.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }

    try {
      await registration.periodicSync.register("check-position", {
        minInterval: 10 * 1000,
      });
    } catch {
      console.log("Periodic Sync could not be registered!");
    }
  }
};



//getUserPos();
updateCount();
registerServiceWorker();
//createWorker();


