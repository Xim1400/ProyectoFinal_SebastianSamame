document.querySelector("#search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const searchTerm = document.querySelector("#search-input").value;
    // Aquí puedes hacer algo con searchTerm, como buscar en tus datos o hacer una petición a una API
});
