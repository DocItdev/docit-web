import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from "react-redux";
import {
    IconButton,

    Card,
    CardActions,
    CardContent,
    Grid,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { setFileName, setMediaBlobUrl } from "../../ducks";
import { setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};



export default function FilePreview(show) {
    const mediaBlobUrl = useSelector((state) => state.mediaBlobUrl);
    const [showDropzone, setShowDropzone] = useState(true);
    const [fileObject, setFileObject] = useState(null);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (show) {
    //         setShowDropzone(true)
    //     }
    // }, [show])

    useEffect(() => {
        if (mediaBlobUrl === "") {
            
        } else {
            setShowDropzone(false)
        }
    }, [mediaBlobUrl])

    const handleDelete = () => {
        dispatch(setMediaBlobUrl(''))
    }

    const onDrop = useCallback(acceptedFile => {
        // Do something with the files
        setFileObject(acceptedFile[0]);
        //take the first file 
        const url = URL.createObjectURL(acceptedFile[0]);
        dispatch(setMediaBlobUrl(url));
        dispatch(setMediaType(MediaTypes.FILE))
        dispatch(setFileName(acceptedFile[0].name));
        console.log(url);
        setShowDropzone(false);
    }, [])

    const { getRootProps, getInputProps, isFocused, isDragActive, isDragAccept,
        isDragReject } = useDropzone({ onDrop })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div>
            {showDropzone && < div >
                Upload File
                < div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a file here, or click to select a file</p>
                </div >
            </div >}

            {
                mediaBlobUrl &&
                <Card
                    component={Grid}
                    item
                    xs={12}
                    sx={{ margin: "1rem" }}
                    variant="outlined"
                >
                    <Grid container>
                        <Grid item xs={11} justify="center" direction="row" align="center">
                            <CardContent>
                                <FilePresentIcon style={{ color: "#1F5980", fontSize: "35px" }} />
                                {fileObject.name}
                            </CardContent>
                        </Grid>
                        <Grid item xs={1}>
                            <CardActions disableSpacing>
                                <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
                                    <Cancel color="error" fontSize="small" />
                                </IconButton>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            }
        </div>
    )
}



