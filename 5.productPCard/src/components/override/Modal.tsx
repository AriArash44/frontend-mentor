import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface ModalProps {
    title: string,
    message: string
}

interface ModalRef {
    handleOpen: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Override_Modal = React.forwardRef<ModalRef, ModalProps>(({ 
    title, 
    message 
}, ref) => {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useImperativeHandle(ref, () => ({
        handleOpen,
    }));
    
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
            <Typography variant="h6" component="h2">
                {title}
            </Typography>
            <Typography sx={{ mt: 2 }}>
                {message}
            </Typography>
            </Box>
        </Modal>
        </div>
    );
});

export default Override_Modal;