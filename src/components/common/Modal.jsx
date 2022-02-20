import { 
  Modal as MuiModal,
  Box,
  Typography,
  IconButton
 } from '@mui/material';
 import { Navbar } from 'react-bootstrap';
 import styles from '../../styles/Modal.module.css';

 export default function Modal({title, onClose, children, ...props}) {
   return (
     <MuiModal {...props} onClose={onClose}>
       <Box className={styles.root}>
        <Navbar bg="light" expand="lg">
          <Box component="span">
            <Typography component="span" variant="h5">
              {title}
            </Typography>
            <span className={styles.closeButton}>
            <IconButton onClick={onClose}>
            <i className="bi bi-x-circle"></i>
            </IconButton>
            </span>
          </Box>
        </Navbar>
        <div className={styles.container}>
          {children}
        </div>
       </Box>
     </MuiModal>
   );
 }
 