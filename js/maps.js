let maps = [];

function loadMaps(jsonFile, containerId) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            displayMaps(data, containerId);
            maps = data;
        })
        .catch(error => console.error('Error:', error));
}

window.onload = () => {
    loadMaps('/js/maps.json', 'maps-list');
};

function displayMaps(mapsToDisplay, containerId) {
    const mapsList = document.getElementById(containerId);
    mapsList.innerHTML = '';

    mapsToDisplay.forEach(map => {
        const mapCard = document.createElement('div');
        mapCard.className = 'map-card';

        const mapImage = document.createElement('img');
        mapImage.src = map.image;
        mapImage.alt = `Imagen de ${map.name}`;
        mapCard.appendChild(mapImage);

        const mapName = document.createElement('h3');
        mapName.textContent = map.name;
        mapCard.appendChild(mapName);

        mapsList.appendChild(mapCard);
    });
}

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredMaps = maps.filter(map => 
        map.name.toLowerCase().includes(searchText)
    );
    displayMaps(filteredMaps, 'maps-list');
});


function getRandomMap() {
    const shufflingDiv = document.getElementById('shuffling-maps');
    const selectedDiv = document.getElementById('selected-map');
    shufflingDiv.innerHTML = '';
    selectedDiv.innerHTML = '';

    maps.forEach((map) => {
        const mapImg = document.createElement('img');
        mapImg.src = map.image;
        mapImg.alt = map.name;
        shufflingDiv.appendChild(mapImg);
    });

    const shufflingInterval = setInterval(() => {
        shufflingDiv.childNodes.forEach((img) => {
            img.style.visibility = Math.random() < 0.5 ? 'visible' : 'hidden';
        });
    }, 100);

    setTimeout(() => {
        clearInterval(shufflingInterval);
        shufflingDiv.innerHTML = '';
        const randomIndex = Math.floor(Math.random() * maps.length);
        const selectedMapImg = document.createElement('img');
        selectedMapImg.src = maps[randomIndex].image;
        selectedMapImg.alt = maps[randomIndex].name;
        selectedDiv.appendChild(selectedMapImg);

        const mapName = document.createElement('h2');
        mapName.textContent = maps[randomIndex].name;
        selectedDiv.appendChild(mapName);
    }, 3000);
}

document.getElementById('random-map-button').addEventListener('click', getRandomMap);
