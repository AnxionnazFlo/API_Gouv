async function getTownFromDepartements(departement) {

    fetch(`https://geo.api.gouv.fr/departements/${departement}/communes`)
        .then((res) => res.json())
        .then((res) => displayTown(res));
}


async function getDepartements() {
    fetch('https://geo.api.gouv.fr/departements/')
        .then((res) => res.json())
        .then((res) => displayDepartements(res));
}

getDepartements();

async function getMairie(code) {
    fetch(`https://etablissements-publics.api.gouv.fr/v3/communes/${code}/mairie`)
        .then((res) => res.json())
        .then((res) => flightTo(res))


}

async function getType(code, type) {
    fetch(`https://etablissements-publics.api.gouv.fr/v3/communes/${code}/${type}`)
        .then((res) => res.json())
        .then((res) => displayMarker(res))


}

function displayTown(data) {

    function SortArray(x, y) {
        return x.nom.localeCompare(y.nom);
    }
    let dataSort = data.sort(SortArray);

    const town = document.querySelector('#town');
    town.innerHTML = "";
    town.disabled = false;
    let baseOption = document.createElement('option');
    baseOption.textContent = "Ville";
    baseOption.setAttribute('disabled', 'disabled');
    baseOption.setAttribute('selected', 'selected');
    town.appendChild(baseOption);

    for (let i = 0; i < dataSort.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = dataSort[i].nom;
        option.value = dataSort[i].code;
        town.appendChild(option);

    }

    town.addEventListener('change', (event) => {
        markerDelAgain();
        getMairie(event.target.value);


    })
}

const displayDepartements = (data) => {
    const departements = document.querySelector('#departement');

    function SortArray(x, y) {
        return x.nom.localeCompare(y.nom);
    }
    let dataSort = data.sort(SortArray);

    for (let i = 0; i < dataSort.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = dataSort[i].nom;
        option.value = dataSort[i].code;
        departements.appendChild(option);

    }
    departements.addEventListener('change', (event) => {
        markerDelAgain();
        getTownFromDepartements(event.target.value);


        map.flyTo([47.081012, 2.398782], 6, {
            animate: true,
            duration: 2

        });
        document.querySelector('#type').disabled = true;

    })

}

const constructMap = () => {

    map = L.map('map').setView([47.081012, 2.398782], 6);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${tokenMapBox}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,

    }).addTo(this.map);
}

constructMap();

const flightTo = (data) => {


    document.querySelector('#type').disabled = false;
    let long = data.features[0].properties.adresses[0].coordonnees[0];
    let lat = data.features[0].properties.adresses[0].coordonnees[1]

    map.flyTo([lat, long], 9, {
        animate: true,
        duration: 2

    });
    markerDelAgain();


}

const displayInfos = (data) => {

    document.querySelector('#infoType').innerHTML = "<h1>Informations sur : </h1>"
    document.querySelector('#nomMairie').innerHTML = "<h4>" + data.properties.nom + "</h4>";
    document.querySelector('#rue').textContent = data.properties.adresses[0].lignes[0];
    document.querySelector('#cpVille').textContent = data.properties.adresses[0].codePostal + " " + data.properties.adresses[0].commune;
    document.querySelector('#telephone').textContent = data.properties.telephone;
    document.querySelector('#email').textContent = data.properties.email;

}

const type = document.querySelector('#type');

type.addEventListener('change', (event) => {
    markerDelAgain();
    let code = document.querySelector('#town').value;
    getType(code, event.target.value);



})

const displayMarker = (data) => {

    markerDelAgain();
    let latZoom = data.features[0].properties.adresses[0].coordonnees[1];
    let longZoom = data.features[0].properties.adresses[0].coordonnees[0];
    map.flyTo([latZoom, longZoom], 9, {
        animate: true,
        duration: 2

    });

    for (let i = 0; i < data.features.length; i++) {
        let lat = data.features[i].properties.adresses[0].coordonnees[1];
        let long = data.features[i].properties.adresses[0].coordonnees[0];


        let lamMarker = L.marker([lat, long], ).addTo(map);
        lamMarker.addEventListener('click', () => {
            map.flyTo([lat, long], 14, {
                animate: true,
                duration: 2

            });
            displayInfos(data.features[i]);

        })

    }
}

function markerDelAgain() {

    let markerAll = document.querySelectorAll('.leaflet-marker-icon');
    for (let i = 0; i < markerAll.length; i++) {
        markerAll[i].remove();
    }
    let markerPopup = document.querySelectorAll('.leaflet-popup');
    for (let i = 0; i < markerPopup.length; i++) {
        markerPopup[i].remove();
    }
    let markerShadow = document.querySelectorAll('.leaflet-shadow-pane');
    for (let i = 0; i < markerShadow.length; i++) {
        markerShadow[i].remove();
    }
}