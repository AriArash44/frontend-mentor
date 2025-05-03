import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Togglable = ({header, children}) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" sx={{ fontWeight: 700, color: "#555555"}}>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{paddingTop: 0}}>
          {children}
        </AccordionDetails>
      </Accordion>
    );
}

export default Togglable;