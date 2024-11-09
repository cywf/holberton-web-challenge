document.addEventListener("DOMContentLoaded", function () {
    // Fetch the config file for access tokens
    fetch('data/config.json')
        .then(response => response.json())
        .then(config => {
            console.log("Config loaded:", config); // Log config to verify it's correct
            // Initialize the map
            var map = L.map('map').setView([18.2208, -66.5901], 8); // Center on Puerto Rico

            // Add the Jawg Matrix tileset
            L.tileLayer(`https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=${config.JAWG_ACCESS_TOKEN}`, {
                attribution: '<a href="https://jawg.io" target="_blank">© Jawg</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
                minZoom: 0,
                maxZoom: 22
            }).addTo(map);

            // Load markers from the JSON file
            fetch('data/markers.json')
                .then(response => response.json())
                .then(data => {
                    data.markers.forEach(marker => {
                        L.marker([marker.lat, marker.lng])
                            .bindPopup(marker.popup)
                            .addTo(map);
                    });
                })
                .catch(error => console.error("Error loading markers:", error));
        })
        .catch(error => console.error("Error loading config:", error));
});