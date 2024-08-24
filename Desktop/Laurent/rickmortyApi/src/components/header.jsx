import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../utils/colors";

const Container = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto 2em auto;
  padding: 1.5em 2em;
  max-width: 1200px;
  background: linear-gradient(135deg, #ff6600, #ffb347); /* Dégradé */
  color: ${colors.BLACK};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: "Roboto", sans-serif;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 0.5em 1em;
    position: relative;
    transition: color 0.3s ease, transform 0.3s ease;
    text-transform: uppercase; /* Ajoute un style majuscule */
    letter-spacing: 1px;
  }

  a:hover {
    color: #32cd32; /* Changement de la couleur de hover en vert (LimeGreen) */
    transform: scale(1.1);
  }

  a.active {
    color: blue;
    border-bottom: 2px solid ${colors.ORANGE}; /* Barre en dessous du lien actif */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    a {
      margin-bottom: 0.5em;
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <NavLink exact="true" to="/">
        Accueil
      </NavLink>
      <NavLink to="/locations">Lieux</NavLink>
      <NavLink to="/episodes">Episodes</NavLink>
    </Container>
  );
};

export default Header;
