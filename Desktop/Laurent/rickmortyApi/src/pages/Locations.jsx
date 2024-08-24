import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllLocations } from "../api/locations";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2em;
`;

const LocationCard = styled.div`
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

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
  font-size: 1.2em;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5em;
  color: #666;
`;

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAllLocations();
        setLocations(response.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingMessage>Chargement des emplacements...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <LocationsGrid>
          {locations.map((location) => (
            <Link to={`/details/${location.id}`} key={location.id}>
              <LocationCard>
                <p>{location.name}</p>
                <p>{location.type}</p>
              </LocationCard>
            </Link>
          ))}
        </LocationsGrid>
      )}
    </Container>
  );
};

export default Locations;
