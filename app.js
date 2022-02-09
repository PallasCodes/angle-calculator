const calculator = document.getElementById('calculator')
const calculateBtn = document.getElementById('calculate')
let latitude = 0

calculateBtn.addEventListener('click', ( ) => {
  navigator.geolocation.getCurrentPosition(success, error, options)
})

calculator.addEventListener('submit', async () => {
  event.preventDefault()
  latitude = await fetchLocation(calculator.zipcode.value)
  console.log(latitude)
  displayAngles(latitude)
})

function calcAngleOptimalYear(x) {
  if (x >= 0) {
    return 1.3793 + x * (1.2011 + x * (-0.014404 + x * 0.000080509))
  } else {
    return -0.41657 + x * (1.4216 + x * (0.024051 + x * 0.00021828))
  }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function displayAngles(latitude) {
  const optimalAngleYear =  Math.round(calcAngleOptimalYear(latitude) * 10) / 10
  //  YEAR
  document.getElementById('year').textContent = optimalAngleYear
  // SEASONS
  document.getElementById('spring').textContent = optimalAngleYear
  document.getElementById('summer').textContent = Math.round((optimalAngleYear-15) * 10) / 10
  document.getElementById('fall').textContent = optimalAngleYear
  document.getElementById('winter').textContent = Math.round((optimalAngleYear+15) * 10) / 10
  // MONTHS
  document.getElementById('january').textContent = Math.round((optimalAngleYear+10) * 10) / 10
  document.getElementById('february').textContent = Math.round((optimalAngleYear+5) * 10) / 10
  document.getElementById('march').textContent = optimalAngleYear
  document.getElementById('april').textContent = Math.round((optimalAngleYear-5) * 10) / 10
  document.getElementById('may').textContent = Math.round((optimalAngleYear-10) * 10) / 10
  document.getElementById('june').textContent = Math.round((optimalAngleYear-15) * 10) / 10
  document.getElementById('july').textContent = Math.round((optimalAngleYear-10) * 10) / 10
  document.getElementById('august').textContent = Math.round((optimalAngleYear-5) * 10) / 10
  document.getElementById('september').textContent = optimalAngleYear
  document.getElementById('october').textContent = Math.round((optimalAngleYear+5) * 10) / 10
  document.getElementById('november').textContent = Math.round((optimalAngleYear+10) * 10) / 10
  document.getElementById('december').textContent = Math.round((optimalAngleYear+15) * 10) / 10
  // MAKE RESULTS VISIBLE
  document.getElementById('results').style.display = 'block'
}

function success(pos) {
  const crd = pos.coords
  latitude = crd.latitude
  displayAngles(latitude)
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message)
}

async function fetchLocation(zipcode) {
  try {
    let locations = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyA_a8F8dM6M27PIiWFYDt0QS3BRYS458CA`)
    locations = await locations.json()
    return locations.results[0].geometry.location.lat
  } catch (error) {
    console.error(error)
  }
}