import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDropzone } from 'react-dropzone'
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { FolderOpen } from "@mui/icons-material";

import { useDispatch } from "react-redux";

import { setMediaBlobUrl, setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
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

export default function FileUploadBar({ start, resetTriggerFeature }) {

    const [show, setShow] = useState(false);// defualt should be false

    const dispatch = useDispatch();

    useEffect(() => {
        if (start) {
            setShow(true);
        } else {
            setShow(false);
            resetTriggerFeature();
        }
    }, [start]);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        //take the first file 
        dispatch(setMediaBlobUrl(acceptedFiles));
        dispatch(setMediaType(MediaTypes.FILE))
        setShow(false);
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

    return !show ? (
        <div />
    ) : (
        <div>
            Upload File
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </div>
    );
}

//TODO look into propTypes
// RecorderBar.propTypes = {
//   start: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func,
// };

// RecorderBar.defaultProps = {
//   setOpen: () => {},
// };
