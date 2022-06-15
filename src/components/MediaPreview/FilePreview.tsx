import { useEffect, useState, useCallback, useMemo, CSSProperties } from "react";
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Cancel from "@mui/icons-material/Cancel";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { setFileName, setMediaBlobUrl } from "../../ducks";
import { setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";
import { RootState } from "../../config/reduxConfig";

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



export default function FilePreview() {
    const mediaBlobUrl: string = useSelector((state: RootState) => state.mediaBlobUrl);
    const [showDropzone, setShowDropzone] = useState<boolean>(true);
    const [fileObject, setFileObject] = useState<File>(null);
    const dispatch = useDispatch();

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

    const style: CSSProperties = useMemo(() => ({
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



