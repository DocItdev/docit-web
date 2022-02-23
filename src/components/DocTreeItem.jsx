import React from 'react';
import { TreeItem } from '@mui/lab';
import {
  Box, 
  Typography,
} from '@mui/material';
import getTreeNodeId from '../utils/getTreeNodeId';
import styles from '../styles/DocTreeItem.module.css';

export default function DocTreeItem({ docName, ...props }) {
  return(
   <TreeItem
   {...props}
   nodeId={getTreeNodeId()}
   label={
     <Box className={styles.container}>
       <i className="bi bi-file-earmark-text"></i>
       <Typography className={styles.text} component="span">{docName}</Typography>
     </Box>
   }
   />
  )
}
