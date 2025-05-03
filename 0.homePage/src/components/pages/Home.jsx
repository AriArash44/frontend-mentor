import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Aside from "../common/Aside";
import OverrideButton from "../overrides/Button";

const Home = () => {
    const ref = React.createRef();
    const [number, setNumber] = useState(0);
    const [asideWidth, setAsideWidth] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, [window.innerWidth]);
    useEffect(() => {
        if(ref.current) {
            setAsideWidth(ref.current.clientWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize, ref]);
    const mainContentWidth = useMemo(() => {
        return windowWidth - asideWidth;
    }, [windowWidth, asideWidth]);
    return (
      <>
        <Box component="aside">
          <Aside ref={ref}/>
        </Box>
        <Box component="main" sx={{ width: `${mainContentWidth}px`, padding: "10%",
          right: 0, top: 0, position: "absolute", height: "100vh", display: "flex",
          justifyContent: "center", alignItems: "center", flexDirection: "column"
        }}>
          <Typography sx={{textAlign: "center", marginBottom: "5%", typography: "body2"}} component="h1" >
            This home page for solutions from front-end mentor website
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <OverrideButton onClick={() => setNumber((prev) => prev - 1)}>
                -
              </OverrideButton>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">{number}</Typography>
            </Grid>
            <Grid item xs={4}>
              <OverrideButton onClick={() => setNumber((prev) => prev + 1)}>
                +
              </OverrideButton>
            </Grid>
          </Grid>
        </Box>
      </>
    );
};

export default Home;
