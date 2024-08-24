/**
 * Fonction permettant de récupérer les épisodes sur l'api de Rick et Morty
 * @returns 
 */
export const fetchAllEpisodes = async () => {
    try {
        const episodes = await fetch('https://rickandmortyapi.com/api/episode');
        return episodes.json();
    } catch (error) {
        return error;
    }
}