let cart = [];

function addToCart(skin) {
    cart.push(skin);
    updateCart();
}

function updateCart() {
    const cartButton = document.getElementById('cart-button');
    cartButton.textContent = `Carrito (${cart.length})`;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((skin, index) => {
        const listItem = document.createElement('li');
        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = skin.name;
        const price = document.createElement('span');
        price.className = 'item-price';
        price.textContent = `$${skin.price}`;
        listItem.appendChild(name);
        listItem.appendChild(price);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeFromCart(index));
        listItem.appendChild(removeBtn);

        cartItems.appendChild(listItem);
        total += Number(skin.price);
    });

    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: $${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function displaySkins(skinsArray) {
    const skinsContainer = document.getElementById('skins-container');
    skinsContainer.innerHTML = '';

    skinsArray.forEach(skin => {
        const skinCard = document.createElement('div');
        skinCard.className = 'skin-card';

        const skinImage = document.createElement('img');
        skinImage.src = skin.image;
        skinImage.alt = skin.name;
        skinCard.appendChild(skinImage);

        const skinName = document.createElement('h3');
        skinName.textContent = skin.name;
        skinCard.appendChild(skinName);

        const skinPrice = document.createElement('p');
        skinPrice.textContent = `$${skin.price}`;
        skinCard.appendChild(skinPrice);

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Añadir al carrito';
        buyButton.addEventListener('click', () => addToCart(skin));
        skinCard.appendChild(buyButton);

        skinsContainer.appendChild(skinCard);
    });
}

window.onload = function() {
    fetch('../js/skins.json')
        .then(response => response.json())
        .then(json => displaySkins(json))
        .catch(e => {
            console.log('Hubo un problema con la carga del JSON de skins: ' + e);
            const skinsContainer = document.getElementById('skins-container');
            skinsContainer.innerHTML = "Sorry, the skins couldn't be loaded.";
        });

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart-button');

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
};
