/**
 * Fonction permettant de récupérer les lieux sur l'api de Rick et Morty
 * @returns 
 */
export const fetchAllLocations = async () => {
    try {
        const locations = await fetch('https://rickandmortyapi.com/api/location');
        return locations.json();
    } catch (error) {
        return error;
    }
}