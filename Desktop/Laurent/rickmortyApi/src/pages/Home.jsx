import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllCharacters,
  fetchCharactersWithFilter,
} from "../api/characters";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
  background-color: #001f3f; /* Arrière-plan bleu foncé */
  min-height: 100vh; /* Assure que le conteneur occupe toute la hauteur de la page */
  color: white; /* Couleur du texte en blanc pour contraste */
  font-family: "Roboto", sans-serif; /* Utilisation d'une police moderne */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-bottom: 2em;
  label {
    font-weight: bold;
  }
  input[type="text"],
  select {
    padding: 0.5em;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  input[type="submit"] {
    padding: 0.75em 1.5em;
    background-color: #ff6600;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.3s ease;
    align-self: start;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  input[type="submit"]:hover {
    background-color: #cc5200;
    transform: scale(1.05);
  }
`;

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2em;
`;

const CharacterCard = styled.div`
  text-align: center;
  background-color: #f9f9f9;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }

  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 1em;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: rotate(2deg) scale(1.1);
  }

  p {
    font-size: 1.2em;
    font-weight: bold;
    color: #001f3f; /* Texte en bleu foncé pour contraste sur les cartes */
    margin-bottom: 0.5em;
  }

  a {
    color: #ff6600;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #cc5200;
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
  font-size: 1.2em;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5em;
  color: white;
`;

function Home() {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("alive");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAllCharacters();
        setCharacters(response.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetchCharactersWithFilter(name, status);
      setCharacters(response.results);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom du personnage</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChangeName}
          placeholder="Ex: Rick"
        />

        <label htmlFor="status">Status du personnage</label>
        <select id="status" value={status} onChange={handleChangeStatus}>
          <option value="alive">Vivant</option>
          <option value="dead">Mort</option>
          <option value="unknown">Inconnu</option>
        </select>

        <input type="submit" value="Rechercher" />
      </Form>

      {loading ? (
        <LoadingMessage>Chargement des personnages...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <CharactersGrid>
          {characters.map((character) => (
            <Link to={`/details/${character.id}`} key={character.id}>
              <CharacterCard>
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
              </CharacterCard>
            </Link>
          ))}
        </CharactersGrid>
      )}
    </Container>
  );
}

export default Home;
