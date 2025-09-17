
// Haciendo las variables de entorno
const config = {
    POKEMON_URL: "https://pokeapi.co/api/v2", //URL del Pokemon
    ENVIRONMENT: "production", //El entorno del proyecto
    NOMBRE_APP: "Pokédex", //Nombre de la aplicación web
    SCROLL_SPEED: 30, //Scroll speed para los overworld event de diccionario
}

// Exportación de la configuración si se está solo en el navegador
if (typeof window !== 'undefined') { //Comprueba si existe window (Para ver si está en navegadores o en un entorno de Node)
    window.CONFIG = config; //Si se está en un navegador, config se asigna a window.config, para que sea accesible globalmente (literalmente una variable de entorno)
} else {
    if (typeof module !== 'undefined' && module.exports) { //Acá se exporta config para que pueda ser importado en otros archivos Node, verificando si module existe.
        module.exports = config;
    }
}

//En resumen, verifica si uno está en navegador o en Node.js, y modifica como se guarda o exporta config

document.getElementById("titulo").textContent = config.NOMBRE_APP;
