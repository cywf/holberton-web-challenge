document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map("map").setView([18.2208, -66.5901], 8);

    // Add the Matrix tileset
    fetch('/data/config.json')
    .then((response) => response.json())
    .then((config) => {
      const map = L.map('map').setView([18.2208, -66.5901], 8);
      L.tileLayer(`https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}.png?access-token=${config.MAPBOX_ACCESS_TOKEN}`, {
        attribution: '<a href="https://jawg.io" target="_blank">© Jawg</a>',
        minZoom: 0,
        maxZoom: 22,
      }).addTo(map);
    })
    .catch((error) => console.error('Error loading config:', error));

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
