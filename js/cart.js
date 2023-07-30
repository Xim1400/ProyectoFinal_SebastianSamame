function updateCart() {
    const cartDisplay = document.getElementById('cart-display');
    const itemsList = document.createElement('ul');
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = item.name;
        const price = document.createElement('span');
        price.className = 'item-price';
        price.textContent = `$${item.price}`;
        listItem.appendChild(name);
        listItem.appendChild(price);
        itemsList.appendChild(listItem);

        total += Number(item.price);
    });

    const totalDisplay = document.createElement('p');
    totalDisplay.className = 'total';
    totalDisplay.textContent = `Total: $${total}`;

    cartDisplay.innerHTML = '';
    cartDisplay.appendChild(itemsList);
    cartDisplay.appendChild(totalDisplay);
}
