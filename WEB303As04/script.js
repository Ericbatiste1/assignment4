/*
    Assignment 4
    Eric Batiste
*/

$(document).ready(function(){
	let position = localStorage.getItem("position");
	if (position) {
		position = JSON.parse(position)
	}
	let newLocation = null;
	
	let paragraph = document.createElement("p");
	if (!window.localStorage) {
		paragraph.innerHTML = "Localstorage is not available!";
		$("#content").append(paragraph)
	}
	
    if (window.navigator) {
		navigator.geolocation.getCurrentPosition((newPosition)=> {
			let p = document.createElement("p");
			let longitude = newPosition.coords.longitude;
			let latitude = newPosition.coords.latitude;
			p.innerHTML = latitude + ' ' + longitude
			$("div#youarehere").append(p)
			
			localStorage.setItem("position", JSON.stringify({
				coords: {
					latitude: newPosition.coords.latitude,
					longitude: newPosition.coords.longitude
				}
			}))
			console.log({ newPosition, position })
			if (position) {
				let distance = calcDistance(position.coords.latitude, position.coords.longitude, newPosition.coords.latitude, newPosition.coords.longitude);
				let p = document.createElement("p");
				p.innerHTML = "You have moved " + distance
				$("div#youarehere").append(p)
			}
		})
	} else {
		let paragraph = document.createElement("p")
		paragraph.innerHTML = "Geolocation is not available!";
		$("#content").append(paragraph)
	}
	
	if (position) {
		let p = document.createElement("p");
		let longitude = position.coords.longitude;
		let latitude = position.coords.latitude;
		p.innerHTML = latitude + ' ' + longitude
		$("div#youarehere").append(p)
	}
	let para = document.createElement("p");
	para.innerHTML = "Welcome!";
	if (!position) {
		$("#content").append(para)
	}
	

    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistance(lat1, lon1, lat2, lon2){
        var toRadians = function(num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2-lat1);
        var Δλ = toRadians(lon2-lon1);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ( R * c );
    }
});


