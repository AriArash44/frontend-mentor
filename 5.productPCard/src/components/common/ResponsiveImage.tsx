import React from "react";
import { styled } from "@mui/material/styles";

interface PictureProps {
    mobileImage: string, 
    desktopImage: string, 
    alt: string
}

const commonStyles = {
    display: "block",
    width: "100%",
    height: "100%",
};

const StyledPicture = styled("picture")(commonStyles);
const StyledImg = styled("img")(commonStyles);

const ResponsiveImage: React.FC<PictureProps> = ({
    mobileImage, 
    desktopImage, 
    alt
}) => {
    return(
      <StyledPicture>
        <source media="(min-width:600px)" srcSet={desktopImage}></source>
        <StyledImg src={mobileImage} alt={alt} /> 
      </StyledPicture>
    );
}

export default ResponsiveImage;