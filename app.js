// form that contains the zip code input and the search button
const calculator = document.getElementById("calculator");
// button to get the optimal angles base on the user's current location
const calculateBtn = document.getElementById("calculate");
// used to store the latitude in both methods
let latitude = 0;

document.addEventListener("readystatechange", () => {
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('zipcode'),
    {
      types: ["geocode"],
    }
  );
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    const near_place = autocomplete.getPlace();
   })
});

calculateBtn.addEventListener("click", () => {
  document.getElementById("errorMsg").textContent = "";
  navigator.geolocation.getCurrentPosition(success, error, options);
});

calculator.addEventListener("submit", async () => {
  event.preventDefault();
  if (calculator.zipcode.value === "") {
    document.getElementById("errorMsg").textContent =
      "*Type a zip code or address";
  } else {
    latitude = await getLatitude(calculator.zipcode.value);
    if (latitude) {
      document.getElementById("errorMsg").textContent = "";
      displayAngles(latitude);
    }
  }
});

// formula to get the optimal year angle
function calcAngleOptimalYear(x) {
  if (x >= 0) {
    return 1.3793 + x * (1.2011 + x * (-0.014404 + x * 0.000080509));
  } else {
    return -0.41657 + x * (1.4216 + x * (0.024051 + x * 0.00021828));
  }
}

// options for the API to get the user's current location
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// gets the latitude, calls the optimalAngleYear function, then calculates each angle and displays it on screen
function displayAngles(latitude) {
  const optimalAngleYear = Math.round(calcAngleOptimalYear(latitude) * 10) / 10;
  //  YEAR
  document.getElementById("year").textContent = optimalAngleYear + "°";
  // SEASONS
  document.getElementById("spring").textContent = optimalAngleYear;
  document.getElementById("summer").textContent =
    Math.round((optimalAngleYear - 15) * 10) / 10;
  document.getElementById("fall").textContent = optimalAngleYear;
  document.getElementById("winter").textContent =
    Math.round((optimalAngleYear + 15) * 10) / 10;
  // MONTHS
  document.getElementById("january").textContent =
    Math.round((optimalAngleYear + 10) * 10) / 10;
  document.getElementById("february").textContent =
    Math.round((optimalAngleYear + 5) * 10) / 10;
  document.getElementById("march").textContent = optimalAngleYear;
  document.getElementById("april").textContent =
    Math.round((optimalAngleYear - 5) * 10) / 10;
  document.getElementById("may").textContent =
    Math.round((optimalAngleYear - 10) * 10) / 10;
  document.getElementById("june").textContent =
    Math.round((optimalAngleYear - 15) * 10) / 10;
  document.getElementById("july").textContent =
    Math.round((optimalAngleYear - 10) * 10) / 10;
  document.getElementById("august").textContent =
    Math.round((optimalAngleYear - 5) * 10) / 10;
  document.getElementById("september").textContent = optimalAngleYear;
  document.getElementById("october").textContent =
    Math.round((optimalAngleYear + 5) * 10) / 10;
  document.getElementById("november").textContent =
    Math.round((optimalAngleYear + 10) * 10) / 10;
  document.getElementById("december").textContent =
    Math.round((optimalAngleYear + 15) * 10) / 10;
  // MAKE RESULTS VISIBLE
  document.getElementById("results").classList.add("active");
  document.getElementById("angleCalculator").classList.add("active");
}

// called when the user allows to get his current location
function success(pos) {
  const crd = pos.coords;
  latitude = crd.latitude;
  displayAngles(latitude);
}

// called when the user won't allow to get his current location
function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
  document.getElementById("errorMsg").textContent =
    "*Please grant permissions to access your location to calculate your optimal angle.";
}

// Gooogle's Geocoding API call to get the latitude of the zip code or address
async function getLatitude(zipcode) {
  try {
    let locations = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyA_a8F8dM6M27PIiWFYDt0QS3BRYS458CA`
    );
    locations = await locations.json();
    if (locations.results.length === 0) {
      document.getElementById("errorMsg").textContent =
        "*We couldn't find the given zip code or address";
      return false;
    } else {
      return locations.results[0].geometry.location.lat;
    }
  } catch (error) {
    console.error(error);
  }
}
