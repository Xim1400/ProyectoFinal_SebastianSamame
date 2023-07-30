function loadWeapons(jsonLocation) {
    return fetch(jsonLocation)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(e => {
            console.log('There was a problem with loading the weapons JSON file: ' + e);
            let container = document.getElementById('weapons-container');
            container.innerHTML = "Sorry, the weapons couldn't be loaded.";
        });
}

function displayWeapons(weaponsArray, maxPrice, weaponType) {
    const filteredWeapons = weaponsArray.filter(weapon => 
        Number(weapon.price) <= maxPrice && (weaponType === 'all' || weapon.type === weaponType)
    );

    const weaponsContainer = document.getElementById('weapons-container');
    weaponsContainer.innerHTML = '';

    filteredWeapons.forEach(weapon => {

        const weaponCard = document.createElement('div');
        weaponCard.className = 'weapon-card';

        const weaponImage = document.createElement('img');
        weaponImage.src = weapon.image;
        weaponImage.alt = weapon.name;
        weaponCard.appendChild(weaponImage);

        const weaponName = document.createElement('h3');
        weaponName.textContent = weapon.name;
        weaponCard.appendChild(weaponName);

        const weaponPrice = document.createElement('p');
        weaponPrice.textContent = `$${weapon.price}`;
        weaponCard.appendChild(weaponPrice);

        weaponsContainer.appendChild(weaponCard);
    });
}

let weaponsData = [];

window.onload = function() {
    loadWeapons('/js/weapons.json').then(data => {
        weaponsData = data;

        const priceFilter = document.getElementById('price-filter');
        const priceDisplay = document.getElementById('price-display');
        const typeInput = document.getElementById('type-input');

        priceFilter.addEventListener('input', function() {
            priceDisplay.textContent = this.value;
            displayWeapons(weaponsData, Number(this.value), typeInput.value);
        });

        typeInput.addEventListener('change', function() {
            displayWeapons(weaponsData, Number(priceFilter.value), this.value);
        });

        displayWeapons(weaponsData, Number(priceFilter.value), typeInput.value);
    });
};
