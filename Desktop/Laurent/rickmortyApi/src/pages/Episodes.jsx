import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllEpisodes } from "../api/episodes";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5em;
  padding: 2em;
  max-width: 1200px;
  margin: 0 auto;
`;

const EpisodeCard = styled.div`
  background-color: #f9f9f9;
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    margin: 0;
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5em;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
  font-size: 1.2em;
`;

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAllEpisodes();
        setEpisodes(response.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <LoadingMessage>Chargement des épisodes...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      {episodes.map((episode) => (
        <Link to={`/details/${episode.id}`} key={episode.id}>
          <EpisodeCard>
            <p>{episode.name}</p>
            <p>{episode.episode}</p>
          </EpisodeCard>
        </Link>
      ))}
    </Container>
  );
};

export default Episodes;
