import Main from "../layout/Main";
import NotFoundImage from "../../assets/images/404.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledMain = styled(Main)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const StyledImage = styled.img`
    max-width: 400px;
    margin-top: 3rem;
`;

function NotFound() {
  return (
    <StyledMain>
      <Typography variant="h4" component="h1" gutterBottom>The page does not exist</Typography>
      <Typography component="p">
        Click <Link to="/">here</Link> to go back to the home page.
      </Typography>
      <StyledImage src={NotFoundImage} alt="Not Found" />
    </StyledMain>
  );
}
  
export default NotFound;