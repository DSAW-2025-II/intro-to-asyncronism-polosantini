// Haciendo las variables de entorno
const config = {
    POKEMON_URL: "https://pokeapi.co/api/v2/",
    ENVIRONMENT: "production",
    NOMBRE_APP: "Pokédex",
    SCROLL_SPEED: 30
}

// Exportación de la configuración si se está solo en el navegador
if (typeof window !== 'undefined') {
    window.CONFIG = config;
} else {
    if (typeof module !== 'undefined' && module.export) {
        module.exports = config;
    }
}