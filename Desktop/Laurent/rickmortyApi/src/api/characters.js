/**
 * Fonction permettant de récupérer les personnages sur l'api de Rick et Morty
 * @returns 
 */
export const fetchAllCharacters = async () => {
    try {
        const characters = await fetch('https://rickandmortyapi.com/api/character');
        return characters.json();
    } catch (error) {
        return error;
    }
}

/**
 * Fonction permettant de récupérer les détails concernant un personnage
 * @param {number} id 
 * @returns 
 */
export const fetchCharacterDetails = async (id) => {
    try {
        const character = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        return character.json(); 
    } catch (error) {
        return error;
    }
}

/**
 * Fonction permettant de récupérer les personnages de l'api en fonction de filtres 'name' et 'status'
 * @param {string} characterName 
 * @param {string} characterStatus 
 * @returns 
 */
export const fetchCharactersWithFilter = async (characterName, characterStatus) => {
    try {
        const characters = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}&status=${characterStatus}`);
        return characters.json();
    } catch (error) {
        return error;
    }
}