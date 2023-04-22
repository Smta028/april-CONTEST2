let wrapper = document.querySelector(".mainWrapper");
let fetchBtn = document.querySelector(".fetchBtn")
let mapview = document.querySelector(".map");
let lati = document.querySelector(".lat");
let longitudional = document.querySelector(".longi");


fetchBtn.addEventListener("click", () => {
    wrapper.style.display = "none";
    mapview.style.display = "flex";
})


function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPos, showErr);
    }
    else {
        alert("Sorry! your Browser does not support Geolocation API")
    }
}
//Showing Current Poistion on Google Map
function showPos(position) {
    latt = position.coords.latitude;
    long = position.coords.longitude;
    lati.innerText = `${latt}`;
    longitudional.innerText = `${long}`;
    var lattlong = new google.maps.LatLng(latt, long);
    var myOptions = {
        center: lattlong,
        zoom: 15,
        mapTypeControl: true,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }
    var maps = new google.maps.Map(document.getElementById("demo"), myOptions);
    var markers =
        new google.maps.Marker({
            position: lattlong,
            map: maps,
            title: "You are here!",
        });

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=e33fcf9b7c069675a79450acbc53a1a6`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let weatherContent = document.querySelector(".data");
                weatherContent.innerHTML = `
                
                <li>Location:${data.name}</li>
                <div class="latlong">
                    <li>lat:${data.coord.lat}</li>
                    <li>long:${data.coord.lon}</li>
                </div>
                <li>Time Zone:${data.timezone}</li>
                <li>Wind Speed:${data.wind.speed}</li>
                <li>Pressure:${data.main.pressure}</li>
                <li>Humidity:${data.main.humidity}</li>
                <li>Wind Direction:${data.wind.deg}</li>
                <li>Uv Index:${data.visibility}</li>
                <li>Feels Like:${data.main.feels_like}</li>
                
                `
            })
}

//Handling Error and Rejection
function showErr(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation API.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("USer location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}   