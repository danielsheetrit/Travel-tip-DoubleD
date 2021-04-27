import {
    locService
} from './services/loc.service.js'
import {
    mapService
} from './services/map.service.js'

window.onload = onInit;

mapService.getUserLocaition();

function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

function addEventListenrs() {
    //ADD LISINER FOR PAN TO TOKYO LOCATION BUTTON
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.6895, 139.6917);
    })
    // ADD LISINER FOR THE MARKER BUTTON
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker();
    })
    //ADD LISINER FOR GET LOCATION BUTTON
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                console.log('Locations:', locs)
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })
    })

    //ADD LISINER FOR USER CURRENT LOCATION BUTTON
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                // console.log('User position is:', pos.coords);
                document.querySelector('.user-pos').innerText =
                    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onOpenModal() {
    let prm = new Promise((resolve, reject) => {


        const {
            value: text
        } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Message',
            inputPlaceholder: '...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })
        if (text) {
            Swal.fire('your massege is recived');
        }
    })
}