export const locService = {
    getLocs
}

let locId = 0;

var locs = [{
        name: 'Loc1',
        lat: 32.047104,
        lng: 34.832384
    },
    {
        name: 'Loc2',
        lat: 32.047201,
        lng: 34.832581
    }
];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

createSelectedLoc()
console.log(locs)
function createSelectedLoc() {
    let loc = {
        id: locId++,
        name: 'Loc1',
        lat: 32.047104,
        lng: 34.832384,
        weather: '', 
        createdAt: Date.now(), 
        updatedAt: ''
    };
    locs.push(loc);
}