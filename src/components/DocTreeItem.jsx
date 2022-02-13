import React from 'react';
import { TreeItem } from '@mui/lab';
import {
  Box, 
  Typography,
} from '@mui/material';
import getTreeNodeId from '../utils/getTreeNodeId';

export default function DocTreeItem({ docName, ...props }) {
  return(
   <TreeItem
   {...props}
   nodeId={getTreeNodeId()}
   label={
     <Box>
       <Typography component="span">{docName}</Typography>
     </Box>
   }
   />
  )
}