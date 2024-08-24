import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacterDetails } from "../api/characters";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  max-width: 600px;
  margin: 0 auto;
`;

const CharacterImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1em;
`;

const BackButton = styled.button`
  padding: 0.5em 1em;
  margin-top: 2em;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc5200;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const Details = () => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCharacterDetails(id)
        .then((res) => {
          setCharacter(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <h1>{character.name}</h1>
          <CharacterImage src={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin?.name}</p>
          <BackButton onClick={handleClick}>
            Retour à la page précédente
          </BackButton>
        </>
      )}
    </Container>
  );
};

export default Details;
