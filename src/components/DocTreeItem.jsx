import React from 'react';
import { TreeItem } from '@mui/lab';
import {
  Grid, 
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import getTreeNodeId from '../utils/common/getTreeNodeId';
import styles from '../styles/DocTreeItem.module.css';
import deleteDocument from '../utils/documents/deleteDocument';
import { setDocId } from '../ducks';

export default function DocTreeItem({ docName, docId, ...props }) {
  const { userToken, selectedDocId } = useSelector(state => state);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteDocument(docId, userToken), {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
    }
  })
  const dispatch = useDispatch();

  function handleClick(){
    dispatch(setDocId(docId));
    queryClient.invalidateQueries('posts');  
  }

  return (   
   <TreeItem
   {...props}
   onClick = {handleClick}
   nodeId={getTreeNodeId()}
   label={
     <Grid container spacing={2} className={styles.container}>
       <Grid item xs={10} className={styles.docTitle}>
        <i className="bi bi-file-earmark-text"></i>
        <Typography className={styles.text} component="span">{docName}</Typography>
       </Grid>
       <Grid item xs={2}>
         <div className={styles.iconButton} onClick={() => mutate()}>
          <i className="bi bi-trash"></i>
         </div>
       </Grid>
     </Grid>
   }
   />
  
  )
}
