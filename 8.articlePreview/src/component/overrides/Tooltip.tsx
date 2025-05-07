import { Tooltip } from '@mui/material';
import { ReactElement } from 'react';
import { useTheme } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import TooltipContent from '../common/TooltipContent';

interface OverrideTooltipProps {
    children: ReactElement;
}

const OverrideTooltip = (props: OverrideTooltipProps) => {
    const theme = useTheme();
    return (
      <Tooltip title={<TooltipContent/>} placement="top" arrow slots={{
        transition: Zoom,
      }} componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: theme["palette"]["grayishBlue"]["very_dark"]
          }
        },
        arrow: {
          sx: {
            color: theme["palette"]["grayishBlue"]["very_dark"]
          }
        },
      }}>
        {props.children}
      </Tooltip>
    );
};

export default OverrideTooltip;
