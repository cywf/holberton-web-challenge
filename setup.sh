#!/bin/bash

# Define the project setup
echo "Provisioning project files for holberton-web-challenge in Codespaces..."

# Create necessary directories
mkdir -p css js data assets

# Create index.html
cat <<EOL > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Holberton Web Challenge</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>
    <div id="map"></div>
    <script src="js/map.js"></script>
</body>
</html>
EOL

# Create styles.css
cat <<EOL > css/styles.css
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

#map {
    height: 100vh;
    width: 100%;
}
EOL

# Create map.js
cat <<EOL > js/map.js
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
EOL

# Create markers.json
cat <<EOL > data/markers.json
{
    "markers": [
        {
            "lat": 18.4655,
            "lng": -66.1057,
            "popup": "San Juan"
        },
        {
            "lat": 18.2208,
            "lng": -66.5901,
            "popup": "Puerto Rico Center"
        }
    ]
}
EOL

# Add .gitignore
cat <<EOL > .gitignore
node_modules/
.env
EOL

# Success message
echo "Project setup complete. Files created successfully in the root directory!"