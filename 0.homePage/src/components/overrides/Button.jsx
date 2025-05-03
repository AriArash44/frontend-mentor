import { Button } from "@mui/material";

const OverrideButton = (props) => {
    return (
      <Button sx={{
        background: "#F8F8F8",
        borderRadius: "9999px",
        color: "#333333",
      }} onClick={props.onClick}>
        {props.children}
      </Button>
    );
}

export default OverrideButton;