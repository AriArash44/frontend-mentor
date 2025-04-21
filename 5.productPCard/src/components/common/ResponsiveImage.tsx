import React from "react";
import { styled } from "@mui/material/styles";

interface PictureProps {
    mobileImage: string, 
    desktopImage: string, 
    alt: string
}

const StyledPicture = styled("picture")({
    display: "block",
    maxWidth: "100%",
});

const StyledImg = styled("img")({
    width: "100%",
    height: "auto",
    display: "block",
});

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