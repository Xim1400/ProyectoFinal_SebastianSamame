let maps = [
    { name: 'Ascent', image: './images/Ascent.png', info: 'info_de_Ascent' },
    { name: 'Bind', image: './images/Bind.png', info: 'info_de_Bind' },
    { name: 'Icebox', image: './images/Icebox.png', info: 'info_de_Bind' },
    { name: 'Split', image: './images/Split.png', info: 'info_de_Bind' },
    { name: 'Haven', image: './images/Haven.png', info: 'info_de_Bind' },
];

window.onload = () => {
    displayMaps(maps);
};

function displayMaps(mapsToDisplay) {
    const mapsList = document.getElementById('maps-list');
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
    displayMaps(filteredMaps);
});



function getRandomMap() {
    const shufflingDiv = document.getElementById('shuffling-maps');
    const selectedDiv = document.getElementById('selected-map');
    shufflingDiv.innerHTML = '';
    selectedDiv.innerHTML = '';

    // Insertar las imágenes de los mapas en shufflingDiv.
    maps.forEach((map) => {
        const mapImg = document.createElement('img');
        mapImg.src = map.image;
        mapImg.alt = map.name;
        shufflingDiv.appendChild(mapImg);
    });

    // Crear un efecto de "mezcla" cambiando la visibilidad de las imágenes.
    const shufflingInterval = setInterval(() => {
        shufflingDiv.childNodes.forEach((img) => {
            img.style.visibility = Math.random() < 0.5 ? 'visible' : 'hidden';
        });
    }, 100);

    // Después de 3 segundos, detener la "mezcla" y mostrar el mapa seleccionado.
    setTimeout(() => {
        clearInterval(shufflingInterval);
        shufflingDiv.innerHTML = '';
        const randomIndex = Math.floor(Math.random() * maps.length);
        const selectedMapImg = document.createElement('img');
        selectedMapImg.src = maps[randomIndex].image;
        selectedMapImg.alt = maps[randomIndex].name;
        selectedDiv.appendChild(selectedMapImg);

        // Añadir el nombre del mapa debajo de la imagen.
        const mapName = document.createElement('h2');
        mapName.textContent = maps[randomIndex].name;
        selectedDiv.appendChild(mapName);
    }, 3000);
}

document.getElementById('random-map-button').addEventListener('click', getRandomMap);
