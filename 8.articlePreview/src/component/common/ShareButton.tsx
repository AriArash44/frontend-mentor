import { useEffect, useRef } from "react";
import { Button, useTheme } from "@mui/material";
import { RootState } from "../../stores/store";
import { makeActive, makeInactive } from "../../stores/slices/uiStateSlice";
import { setComponent } from "../../stores/slices/shareButtonSlice";
import { useSelector, useDispatch } from "react-redux";
import shareIcon from "../../assets/images/icon-share.svg";
import shareIconActive from "../../assets/images/icon-share-white.svg";
 
const ShareButton = () => {
    const isActive = useSelector((state: RootState) => state.uiState.active);
    const windowWidth = useSelector((state: RootState) => state.windowWidth.width);
    const dispatch = useDispatch();
    const theme = useTheme();
    const sharedButtonRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (isActive && sharedButtonRef.current && !sharedButtonRef.current.contains(event.target as Node)) {
                dispatch(makeInactive());
            }
        };
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, [isActive, dispatch]);
    return (
      <Button ref={sharedButtonRef} sx={{ 
          bgcolor: isActive ? theme["palette"]["grayishBlue"]["dark"] : theme["palette"]["grayishBlue"]["light"],
          borderRadius: "9999px", minWidth: "40px", height: "40px"
        }}
      onClick={() => {
        dispatch(makeActive());
        if(windowWidth < 900) {
          dispatch(setComponent("tooltipContent"));
        }
      }}>
        <img src={isActive ? shareIconActive : shareIcon} alt="click" className=""/>
      </Button>
    );
};

export default ShareButton;