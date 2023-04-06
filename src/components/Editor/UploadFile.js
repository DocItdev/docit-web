import React from 'react'

import{ useEffect, useState, useCallback, useMemo, CSSProperties } from "react";
import { useDropzone } from 'react-dropzone'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Cancel from "@mui/icons-material/Cancel";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { INSERT_FILE_COMMAND } from "./plugins/FilePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const baseStyle = {
    flex: 1,
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



function UploadFile() {
    const [editor] = useLexicalComposerContext();
    const [mediaBlobUrl, setMediaBlobUrl] = useState("")
    const [showDropzone, setShowDropzone] = useState(true);
    const [fileObject, setFileObject] = useState(null);
    const [fileName, setFileName] = useState("")
    

    useEffect(() => {
        if (mediaBlobUrl !== "") {
            setShowDropzone(false)
        }
    }, [mediaBlobUrl])

    const handleDelete = () => {
       setMediaBlobUrl('')
    }

    const onDrop = useCallback(acceptedFile => {
        // Do something with the files
        setFileObject(acceptedFile[0]);
        setFileName(acceptedFile[0].name)
        //take the first file 
        const url = URL.createObjectURL(acceptedFile[0]);
        setMediaBlobUrl(url);
        setShowDropzone(false);
    }, [])

    const { getRootProps, getInputProps, isFocused, isDragAccept,
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
            <button onClick={()=>{
                
                editor.dispatchCommand(INSERT_FILE_COMMAND, {
                  url: mediaBlobUrl,
                  name: fileName
                })
            }}>Save</button>
            {showDropzone && < div >
                Upload File
                < div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>{"Drag 'n' drop a file here, or click to select a file"}</p>
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
                        <Grid item xs={11}>
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

export default UploadFile