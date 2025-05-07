import { Button, useTheme } from "@mui/material";
import { RootState } from "../../stores/store";
import { makeActive, makeInactive } from "../../stores/slices/uiStateSlice";
import { useSelector, useDispatch } from "react-redux";
import shareIcon from "../../assets/images/icon-share.svg";
import shareIconActive from "../../assets/images/icon-share-white.svg";

interface ShareButtonProps {
    isVisible: boolean;
}
 
const ShareButton = (props: ShareButtonProps) => {
    const isActive = useSelector((state: RootState) => state.uiState.active);
    const windowWidth = useSelector((state: RootState) => state.windowWidth.width);
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
      <Button sx={{ 
        bgcolor: isActive ? theme["palette"]["grayishBlue"]["dark"] : theme["palette"]["grayishBlue"]["light"],
        borderRadius: "9999px", minWidth: "45px", height: "45px", display: props.isVisible ? "flex" : "none",
      }}
      onMouseEnter={() => {
        dispatch(makeActive());
      }}
      onMouseLeave={() => {
        if (windowWidth >= 900) {
          dispatch(makeInactive());
        }
      }}>
        <img src={isActive ? shareIconActive : shareIcon} alt="click" className=""/>
      </Button>
    );
};

export default ShareButton;