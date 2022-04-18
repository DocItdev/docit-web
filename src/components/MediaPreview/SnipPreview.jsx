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
import { setSnipDataUri } from "../../ducks";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export default function VideoPreview() {
    const snipDataUri = useSelector((state) => state.snipDataUri);
    const [crop, setCrop] = useState({ width: 0, height: 0 });
    const [completedCrop, setCompletedCrop] = useState(0);
    const [snip, setSnip] = useState("");
    const [displayCrop, setDisplayCrop] = useState(true);
    const [finalSnip, setFinalSnip] = useState("");
    const dispatch = useDispatch();

    const snipImgWidth = 800;
    const snipImgHeight = 464;
    var imageNH = 1100;
    var imageNW = 1900;
    var imageH = 464;
    var imageW = 800;

    const handleDelete = () => {
        setFinalSnip("");
        setCrop({ width: 0, height: 0 });
        setDisplayCrop(true);
        dispatch(setSnipDataUri(''))
    }

    useEffect(() => {

        const t = setTimeout(() => {
            console.log("something")
            // eslint-disable-next-line no-unused-expressions

            // We use canvasPreview as it's much faster than imgPreview.
            if (completedCrop) {

                console.log("hit");
                onCompleteProcessImg();
            }

        }, 100)

        return () => {
            clearTimeout(t)
        }
    }, [completedCrop]);

    function onCompleteProcessImg() {
        const image = document.createElement('img');
        image.srcset = snipDataUri;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')

        const scale = 1;
        const scaleX = imageNW / imageW
        const scaleY = imageNH / imageH
        const pixelRatio = window.devicePixelRatio
        canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
        ctx.imageSmoothingQuality = 'high'
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY
        const centerX = image.naturalWidth / 2
        const centerY = image.naturalHeight / 2
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.translate(-cropX, -cropY)
        ctx.scale(scale, scale)
        ctx.translate(-centerX, -centerY)

        ctx.drawImage(image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight);

        setDisplayCrop(false);
        setFinalSnip(canvas.toDataURL());
    }


    return snipDataUri ? (
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
                        {snipDataUri && displayCrop &&
                            <ReactCrop crop={crop} onChange={c => { setCrop(c) }}
                                onComplete={(c) => setCompletedCrop(c)}
                            >
                                <img id="screenshot-preview" src={snipDataUri} objectFit="contain" alt="test" width="100%" height="100%" />
                            </ReactCrop>
                        }
                        <br />
                        <img id="cropedImg" src={finalSnip} alt="test" width={completedCrop.width * 1.2} height={completedCrop.height * 1.2} />
                    </CardContent>
                </Grid>
                <Grid item xs={1}>
                    <CardActions disableSpacing>
                        <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
                            <Cancel />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>


        </Card>
    ) : (
        <span />
    );
}