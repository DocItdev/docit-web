import { 
  Modal as MuiModal,
  Box,
  Typography,
  IconButton,
  Grid,
 } from '@mui/material';
 import { Navbar } from 'react-bootstrap';
 import styles from '../../styles/Modal.module.css';

 export default function Modal({title, onClose, children, ...props}) {
   return (
     <MuiModal {...props} onClose={onClose}>
       <Box className={styles.root}>
        <Navbar bg="light" expand="lg">
          <Grid container spacing={2} className={styles.header}>
            <Grid item xs={11}>
              <Typography component="span" variant="h5">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
            <IconButton onClick={onClose} className={styles.iconButton}>
            <i className="bi bi-x-circle"></i>
            </IconButton>
            </Grid>
          </Grid>
        </Navbar>
        <div className={styles.container}>
          {children}
        </div>
       </Box>
     </MuiModal>
   );
 }
