import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    IconButton,
    
    Card,
    CardActions,
    CardContent,
    Grid,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import UndoIcon from '@mui/icons-material/Undo';
import { setMediaBlobUrl } from "../../ducks";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

export default function VideoPreview() {
    const mediaBlobUrl = useSelector((state) => state.mediaBlobUrl);
    
    const dispatch = useDispatch();

  

    useEffect(()=>{
        if(mediaBlobUrl === ""){
           
        }
    }, [mediaBlobUrl])

  
    

    const handleDelete = () => {
        dispatch(setMediaBlobUrl(''))
    }

   


    return mediaBlobUrl ? (
        <Card
            component={Grid}
            item
            xs={12}
            sx={{ margin: "1rem" }}
            variant="outlined"
        >
            <Grid container spacing={0}>

                <Grid item xs={11}>
                    <CardContent>
                       
                        </CardContent>
                </Grid>
                <Grid item xs={1}>
                    <CardActions disableSpacing>
                    <IconButton onClick={handleUndo} sx={{ marginLeft: "auto" }}>
                            <UndoIcon color="primary" fontSize="large"/>
                        </IconButton>
                        <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
                            <Cancel  color="error"  fontSize="small" />
                        </IconButton>
                        
                    </CardActions>
                </Grid>
            </Grid>


        </Card>
    ) : (
        <span />
    );
}