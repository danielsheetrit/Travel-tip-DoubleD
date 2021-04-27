export const mapService = {
    initMap,
    addMarker,
    panTo,
}

var gMap;

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: userLoc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCjIexPtvV4Y3_C8J8NR1yfnrQr5s1LibY';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('.map'), {
                    center: {
                        lat,
                        lng
                    },
                    zoom: 15
                })
            const myLatlng = {
                lat: -25.363,
                lng: 131.044
            };

            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: myLatlng
            });

            map.addListener('click', (mapsMouseEvent) => {
                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng
                });
                userLoc = mapsMouseEvent.latLng.toJSON();

                infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
                infoWindow.open(map);
                setTimeout(() => infoWindow.close(map), 1000);
            })
        })
}

function getUserLocaition() {
    return new Promise((resolve, reject) => {
        if (!userLoc) return reject('no location available');
        return resolve(userLoc);
    })
}