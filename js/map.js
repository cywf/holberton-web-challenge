document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map("map").setView([18.2208, -66.5901], 8);

    // Add the Matrix tileset
    L.tileLayer("https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=YOUR_ACCESS_TOKEN", {
        attribution: '<a href="https://jawg.io" target="_blank">© Jawg</a>',
        minZoom: 0,
        maxZoom: 22,
    }).addTo(map);

    // Load markers from the JSON file
    fetch("data/markers.json")
        .then(response => response.json())
        .then(data => {
            data.markers.forEach(marker => {
                L.marker([marker.lat, marker.lng])
                    .bindPopup(marker.popup)
                    .addTo(map);
            });
        })
        .catch(error => console.error("Error loading markers:", error));
});
