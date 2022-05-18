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
    const [crop, setCrop] = useState({ width: 0, height: 0 });
    const [completedCrop, setCompletedCrop] = useState(0);
    const [snip, setSnip] = useState("");
    const [displayCrop, setDisplayCrop] = useState(true);
    const [finalSnip, setFinalSnip] = useState("");
    const [imageDynamicWidth, setImageDynamicWidth] = useState(200);
    const [imageDynamicHeight, setImageDynamicHeight] = useState(100);
    const [hover, setHover] = useState(false);


    const dispatch = useDispatch();

    const snipImgWidth = 800;
    const snipImgHeight = 464;
    var imageNH = 1100;
    var imageNW = 1900;
    var imageH = 464;
    var imageW = 800;

    useEffect(() => {
        if (mediaBlobUrl === "") {
            setCrop({ width: 0, height: 0 });
            setCompletedCrop(0);
            setSnip("");
            setDisplayCrop(true);
            setFinalSnip("");
        }
    }, [mediaBlobUrl])

    useEffect(() => {

        const t = setTimeout(() => {
            // eslint-disable-next-line no-unused-expressions

            // We use canvasPreview as it's much faster than imgPreview.
            if (completedCrop) {

                onCompleteProcessImg();
            }

        }, 100)

        return () => {
            clearTimeout(t)
        }
    }, [completedCrop]);



    const handleDelete = () => {
        setFinalSnip("");
        setCrop({ width: 0, height: 0 });
        setDisplayCrop(true);
        dispatch(setMediaBlobUrl(''))
    }

    const handleUndo = () => {
        dispatch(setMediaBlobUrl(snip));
        setFinalSnip("");
        setCrop({ width: 0, height: 0 });
        setDisplayCrop(true)
    }



    function onCompleteProcessImg() {
        // create img element and set its source to the fullscreen screenshot stored in the mediaBlobUrl
        const image = document.createElement('img');
        image.srcset = mediaBlobUrl;

        //get the dynamic height and width of the screenshot-preview image and set them in the state
        const screenshotPreview = document.getElementById('screenshot-preview');
        console.log(screenshotPreview.width);
        console.log(screenshotPreview.naturalWidth);
        setImageDynamicWidth(screenshotPreview.width);
        setImageDynamicHeight(screenshotPreview.height);

        

        // create a canvas element which will be used to draw and scale the image to get a crop
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')

        // when we take a crop it is doing so from the 800x400 while the actual image is 1900 by 1200
        // to have a clear crop we need to scale the crop from the smaller image to the larger
        const scaleX = image.naturalWidth / screenshotPreview.width
        const scaleY = image.naturalHeight / screenshotPreview.height

        // we need to set the width of the canvas to the size of the crop after the crop has been scaled
        canvas.width = Math.floor(crop.width * scaleX)
        canvas.height = Math.floor(crop.height * scaleY)

        ctx.imageSmoothingQuality = 'high'

        // we then position the crop on the canvas 
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY
        const centerX = image.naturalWidth / 2
        const centerY = image.naturalHeight / 2
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.translate(-cropX, -cropY)
        ctx.translate(-centerX, -centerY)

        // draw the image on the canvas and set it on the img tag
        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

        setDisplayCrop(false);
        setFinalSnip(canvas.toDataURL());
        canvas.toBlob((blob) => {
            setSnip(mediaBlobUrl);
            const url = URL.createObjectURL(blob);
            dispatch(setMediaBlobUrl(url));
            dispatch(setMediaType(MediaTypes.IMAGE))
        })
    }

    const handleOnMouseEnter = () => {
        setHover(true);
      }
      const handleOnMouseLeave = () => {
        setHover(false);
      }
    

    return mediaBlobUrl ? (

        <Grid container spacing={0}>
            <Grid 
                item 
                xs={12} 
                display="inline-flex" 
                justifyContent="right" 
                alignItems="center" 
            >
                <Grid item xs={1} >
                    <IconButton 
                        onClick={handleUndo} 
                        sx={{ marginLeft: "auto" }}
                    >
                        <UndoIcon color="primary" fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={1} >
                    <IconButton 
                        onClick={handleDelete} 
                        sx={{ marginLeft: "auto" }}  
                        onMouseEnter={handleOnMouseEnter} 
                        onMouseLeave={handleOnMouseLeave}
                    >
                        <Cancel 
                            color="error" 
                            fontSize="small"
                            color={hover ? "error" : "disabled"}  
                        />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item xs={12}>

                {mediaBlobUrl && displayCrop &&
                    <ReactCrop 
                        crop={crop} 
                        onChange={c => { setCrop(c) }}
                        onComplete={(c) => setCompletedCrop(c)}
                    >
                        <img 
                            id="screenshot-preview" 
                            src={mediaBlobUrl} 
                            objectFit="contain" 
                            alt="test"
                            //width={snipImgWidth} height={snipImgHeight}
                        />
                    </ReactCrop>
                }
                
                {finalSnip &&
                    <img 
                        id="cropedImg" 
                        src={finalSnip} 
                        alt="test" 
                        style={{ maxWidth: imageDynamicWidth }} 
                        
                    />
                }

            </Grid>
        </Grid>
    ) : (
        <span />
    );
}