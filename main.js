const wicon = document.querySelector(".wicon");
const condition = document.querySelector(".condition");
const temp_c = document.querySelector(".temp-c");
const temp_f = document.querySelector(".temp-f");
const cityname = document.querySelector(".name");
const country = document.querySelector(".country");
const flag = document.querySelector(".flag");
const update_date = document.querySelector(".update-date");

const wind_mhp_val = document.querySelector(".wind-mhp-val");
const wind_kph_val = document.querySelector(".wind-kph-val");
const wind_degree_val = document.querySelector(".wind-degree-val");
const wind_dir_val = document.querySelector(".wind-dir-val");
const humidity_val = document.querySelector(".humidity-val");
const cloud_val = document.querySelector(".cloud-val");
const feelslike_c_val = document.querySelector(".feelslike-c-val");
const feelslike_f_val = document.querySelector(".feelslike-f-val");

const pressure_mb_val = document.querySelector(".pressure-mb-val");
const pressure_in_val = document.querySelector(".pressure-in-val");
const precip_mm_val = document.querySelector(".precip-mm-val");
const uv_val = document.querySelector(".uv-val");
const gust_mph_val = document.querySelector(".gust-mph-val");
const gust_kph_val = document.querySelector(".gust-kph-val");
const vis_kmb_val = document.querySelector(".vis-kmb-val");
const vis_miles_val = document.querySelector(".vis-miles-val");

const hide_main = document.querySelector(".main");
const hide_1 = document.querySelector(".page-1");
const hide_2 = document.querySelector(".page-2");

const loader = document.querySelector(".loader");
loader.style.display = "none";

hide_main.style.display = "none";
hide_1.style.display = "none";
hide_2.style.display = "none";

const error = document.querySelector(".error");
error.style.display = "none";

const error_message = document.querySelector(".error-message");


// const cloud_background = document.querySelector("#background-wrap");
// cloud_background.style.display = 'none';


const getCardData = (
  card_icon,
  card_condition,
  card_temp_c,
  card_temp_f,
  card_cityname,
  card_country,
  card_flag,
  card_update_date,
  card_wind_mhp_val,
  card_wind_kph_val,
  card_wind_degree_val,
  card_wind_dir_val,
  card_humidity_val,
  card_cloud_val,
  card_feelslike_c_val,
  card_feelslike_f_val,
  card_pressure_mb_val,
  card_pressure_in_val,
  card_precip_mm_val,
  card_uv_val,
  card_gust_mph_val,
  card_gust_kph_val,
  card_vis_kmb_val,
  card_vis_miles_val
) => {
  wicon.src = card_icon;
  condition.textContent = card_condition;
  temp_c.textContent = card_temp_c;
  temp_f.textContent = card_temp_f;
  cityname.textContent = card_cityname;
  country.textContent = card_country;
  flag.src = card_flag;
  update_date.textContent = card_update_date;

  wind_mhp_val.textContent = card_wind_mhp_val;
  wind_kph_val.textContent = card_wind_kph_val;
  wind_degree_val.textContent = card_wind_degree_val;
  wind_dir_val.textContent = card_wind_dir_val;
  humidity_val.textContent = card_humidity_val;
  cloud_val.textContent = card_cloud_val;
  feelslike_c_val.textContent = card_feelslike_c_val;
  feelslike_f_val.textContent = card_feelslike_f_val;
  pressure_mb_val.textContent = card_pressure_mb_val;
  pressure_in_val.textContent = card_pressure_in_val;
  precip_mm_val.textContent = card_precip_mm_val;
  uv_val.textContent = card_uv_val;
  gust_mph_val.textContent = card_gust_mph_val;
  gust_kph_val.textContent = card_gust_kph_val;
  vis_kmb_val.textContent = card_vis_kmb_val;
  vis_miles_val.textContent = card_vis_miles_val;
};

const button = document.querySelector(".find-location");
// let latText = document.getElementById("latitude");
// let longText = document.getElementById("longitude");

button.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    error.style.display = "none";
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    //console.log(lat.toFixed(2));
    //console.log(long.toFixed(2));

    loader.style.display = "inline";

    setTimeout(() => {
      loader.style.display = "none";
      getDataFindLocation(lat, long);
    }, 1000);
    hide_main.style.display = "none";
    hide_1.style.display = "none";
    hide_2.style.display = "none";
  });
});

const getDataFindLocation = async function (lat, long) {
  
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=822ac31193f34e5ca05101434210909&q=${lat},${long}`
  );

  if (data.status === 400) {
    loader.style.display = "none";
    error_message.innerHTML = "Your Location";
    error.style.display = "flex";
    setTimeout(() => {
      error.style.display = "none";
    }, 2000);
    return;
  }

  const { location, current } = await data.json();
  //console.log(location);
  //console.log(current);

  const flag = await getFlag(location.country);

  getCardData(
    current.condition.icon,
    current.condition.text,
    current.temp_c,
    current.temp_f,
    location.region,
    location.country,
    flag,
    current.last_updated,
    current.wind_mph,
    current.wind_kph,
    current.wind_degree,
    current.wind_dir,
    current.humidity,
    current.cloud,
    current.feelslike_c,
    current.feelslike_f,
    current.pressure_mb,
    current.pressure_in,
    current.precip_mm,
    current.uv,
    current.gust_mph,
    current.gust_kph,
    current.vis_km,
    current.vis_miles
  );

  hide_main.style.display = "flex";
  hide_1.style.display = "flex";
  hide_2.style.display = "flex";
};

const input = document.querySelector("#input");

input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    error.style.display = "none";
    loader.style.display = "inline";

    setTimeout(() => {
      loader.style.display = "none";
      getDataFromInput(input.value);
      //input.value = "";

      loader.style.display = "none";
    }, 1000);
    hide_main.style.display = "none";
    hide_1.style.display = "none";
    hide_2.style.display = "none";
  }
});

const getDataFromInput = async function (input) {
  
  const data = await fetch(
    ` https://api.weatherapi.com/v1/current.json?key=822ac31193f34e5ca05101434210909&q=${input}`
  );

  if (data.status === 400) {
    loader.style.display = "none";
    error_message.innerHTML = input;
    error.style.display = "flex";
    setTimeout(() => {
      error.style.display = "none";
    }, 2000);
    return;
  }

  const { location, current } = await data.json();
  //console.log(location);
  //console.log(current);

  const flag = await getFlag(location.country);
  console.log(flag);

  getCardData(
    current.condition.icon,
    current.condition.text,
    current.temp_c,
    current.temp_f,
    location.region,
    location.country,
    flag,
    current.last_updated,
    current.wind_mph,
    current.wind_kph,
    current.wind_degree,
    current.wind_dir,
    current.humidity,
    current.cloud,
    current.feelslike_c,
    current.feelslike_f,
    current.pressure_mb,
    current.pressure_in,
    current.precip_mm,
    current.uv,
    current.gust_mph,
    current.gust_kph,
    current.vis_km,
    current.vis_miles
  );

  hide_main.style.display = "flex";
  hide_1.style.display = "flex";
  hide_2.style.display = "flex";
};

const getFlag = async function (name) {
  const data = await fetch(` https://restcountries.eu/rest/v2/name/${name}`);
  const [allData] = await data.json();
  return allData.flag;
};

// `country: "Turkey"
// lat: 41.02
// localtime: "2021-09-10 13:05"
// localtime_epoch: 1631268323
// lon: 29.14
// name: "Dudullu"
// region: "Istanbul"
// tz_id: "Europe/Istanbul"`

// `cloud: 75
//  condition:
//      code: 1003
//       icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
//       text: "Partly cloudy"
//      [[Prototype]]: Object
// feelslike_c: 24.9
// feelslike_f: 76.9
// gust_kph: 22.3
// gust_mph: 13.9
// humidity: 69
// is_day: 1
// last_updated: "2021-09-10 12:00"
// last_updated_epoch: 1631264400
// precip_in: 0
// precip_mm: 0
// pressure_in: 30
// pressure_mb: 1016
// temp_c: 23
// temp_f: 73.4
// uv: 5
// vis_km: 10
// vis_miles: 6
// wind_degree: 10
// wind_dir: "N"
// wind_kph: 22
// `;



var makeItRain = function () {
  //clear out everything
  $(".rain").empty();

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    //random number between 5 and 2
    var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops +=
      '<div class="drop" style="left: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
    backDrops +=
      '<div class="drop" style="right: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
  }

  $(".rain.front-row").append(drops);
  $(".rain.back-row").append(backDrops);
};



makeItRain();