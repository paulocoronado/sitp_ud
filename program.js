var map = L.map('map').setView([4.629148723033761, -74.06547217080218], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Función para cargar un archivo GeoJSON en un mapa Leaflet
function cargarGeoJSON(rutaArchivo, map, estilo) {
    /*
    Parámetros:
    - rutaArchivo: string - La ruta o URL del archivo GeoJSON
    - mapa: objeto L.Map - El mapa de Leaflet donde se mostrarán los datos
    - estilo: objeto (opcional) - Estilos para personalizar la apariencia
    
    Cómo usar:
    1. Primero crea un mapa de Leaflet
    2. Llama a esta función pasando la ruta del GeoJSON y el mapa
    3. Los datos se cargarán y mostrarán automáticamente
    */
    
    // Usamos fetch para obtener el archivo GeoJSON
    fetch(rutaArchivo)
        .then(response => {
            // Verificamos si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo GeoJSON');
            }
            return response.json(); // Convertimos la respuesta a JSON
        })
        .then(data => {
            // Creamos una capa GeoJSON con los datos
            const capaGeoJSON = L.geoJSON(data, {
                // Estilos por defecto si no se proporcionan
                style: estilo || {
                    color: '#3388ff',    // Color del borde
                    weight: 2,           // Grosor de la línea
                    opacity: 0.8,        // Transparencia
                    fillColor: '#3388ff', // Color de relleno
                    fillOpacity: 0.4     // Transparencia del relleno
                },
                
                // Función que se ejecuta cuando se hace clic en un elemento
                onEachFeature: function(feature, layer) {
                    // Si el GeoJSON tiene propiedades, las mostramos al hacer clic
                    if (feature.properties) {
                        let popupContent = "<b>Propiedades:</b><br>";
                        
                        // Recorremos todas las propiedades y las mostramos
                        for (let propiedad in feature.properties) {
                            popupContent += `${propiedad}: ${feature.properties[propiedad]}<br>`;
                        }
                        
                        // Asignamos el contenido al popup
                        layer.bindPopup(popupContent);
                    }
                }
            });
            
            // Añadimos la capa GeoJSON al mapa
            capaGeoJSON.addTo(map);
            
            // Ajustamos la vista del mapa para que muestre todos los datos
            //map.fitBounds(capaGeoJSON.getBounds());
            
            console.log('GeoJSON cargado exitosamente');
        })
        .catch(error => {
            // Manejamos errores en la carga del archivo
            console.error('Error al cargar el GeoJSON:', error);
            alert('Error al cargar el archivo: ' + error.message);
        });
}

// EJEMPLO DE USO:

/*
// 1. Primero crea el mapa (esto va fuera de la función)
const mapa = L.map('mapa').setView([40.4168, -3.7038], 6); // Coordenadas de España

// 2. Añade una capa base (opcional pero recomendado)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);
*/

// 3. Llama a la función para cargar el GeoJSON
cargarGeoJSON('paraderos-sitp.geojson', map);



/*
// Opcional: puedes personalizar los estilos
const misEstilos = {
    color: 'red',
    weight: 3,
    fillColor: 'orange'
};
cargarGeoJSON('ruta/a/tu/archivo.geojson', mapa, misEstilos);
*/

// NOTA: Asegúrate de tener incluida la librería Leaflet en tu HTML:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>