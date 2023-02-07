import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Cancel from "@mui/icons-material/Cancel";
import UndoIcon from "@mui/icons-material/Undo";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { INSERT_IMAGE_COMMAND } from "./plugins/ImagePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import axios from "axios";


export default function ScreenShot(props) {
  const [start, setStart] = useState(false);


  const [editor] = useLexicalComposerContext();

  const [mediaBlobUrl, setMediaBlobUrl] = useState("");
  const [crop, setCrop] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    unit: "px",
  });
  const [completedCrop, setCompletedCrop] = useState();
  const [snip, setSnip] = useState("");
  const [displayCrop, setDisplayCrop] = useState(true);
  const [finalSnip, setFinalSnip] = useState("");
  const [hover, setHover] = useState(false);
  const [imageDynamicWidth, setImageDynamicWidth] = useState(200);

  useEffect(() => {
    const handleStart = async () => {
      const canvas = await takeScreenshotCanvas();
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setMediaBlobUrl(url);
        console.log(url);
        // dispatch(setMediaBlobUrl(url));
        // dispatch(setMediaType(MediaTypes.IMAGE));
      });
    };
    if (start) {
      handleStart();
    }
  }, [start]);

  useEffect(() => {
    if (mediaBlobUrl === "") {
      setCrop({ width: 0, height: 0, x: 0, y: 0, unit: "px" });
      setCompletedCrop(null);
      setSnip("");
      setDisplayCrop(true);
      setFinalSnip("");
    }
  }, [mediaBlobUrl]);

  useEffect(() => {
    const t = setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions

      // We use canvasPreview as it's much faster than imgPreview.
      if (completedCrop) {
        onCompleteProcessImg();
      }
    }, 100);

    return () => {
      clearTimeout(t);
    };
  }, [completedCrop]);


  function getDisplayMedia(options) {
    if (navigator?.mediaDevices?.getDisplayMedia) {
      return navigator.mediaDevices.getDisplayMedia(options);
    }
    throw new Error("getDisplayMedia is not defined");
  }

  async function takeScreenshotStream() {
    const width = 1920;
    const height = 1080;

    const errors = [];
    let stream;
    const mediaStreamConstraints = {
      audio: false,
      video: {
        width,
        height,
        frameRate: 50,
      },
    };

    try {
      stream = await getDisplayMedia(mediaStreamConstraints);
    } catch (ex) {
      errors.push(ex);
    }

    if (errors.length) {
      console.debug(...errors);
      if (!stream) {
        throw errors[errors.length - 1];
      }
    }

    return stream;
  }

  async function takeScreenshotCanvas() {
    const stream = await takeScreenshotStream();
    const video = document.createElement("video");
    const result = await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        video.pause();
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        resolve(canvas);
      };
      video.srcObject = stream;
    });

    stream.getTracks().forEach(function (track) {
      track.stop();
    });

    if (result == null) {
      throw new Error("Cannot take canvas screenshot");
    }

    return result;
  }

  function handleStartScreenshot() {
    setStart(true);
  }

  const handleDelete = () => {
    setFinalSnip("");
    setCrop({ width: 0, height: 0, x: 0, y: 0, unit: "px" });
    setDisplayCrop(true);
    setMediaBlobUrl("");
  };

  const handleUndo = () => {
    setMediaBlobUrl(snip);
    setFinalSnip("");
    setCrop({ width: 0, height: 0, x: 0, y: 0, unit: "px" });
    setDisplayCrop(true);
  };

  function onCompleteProcessImg() {
    // create img element and set its source to the fullscreen screenshot stored in the mediaBlobUrl
    const image = document.createElement("img");
    image.srcset = mediaBlobUrl;

    //get the dynamic height and width of the screenshot-preview image and set them in the state
    const screenshotPreview = document.getElementById(
      "screenshot-preview"
    );
    setImageDynamicWidth(screenshotPreview.width);
    // create a canvas element which will be used to draw and scale the image to get a crop
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // when we take a crop it is doing so from the 800x400 while the actual image is 1900 by 1200
    // to have a clear crop we need to scale the crop from the smaller image to the larger
    const scaleX = image.naturalWidth / screenshotPreview.width;
    const scaleY = image.naturalHeight / screenshotPreview.height;

    // we need to set the width of the canvas to the size of the crop after the crop has been scaled
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    ctx.imageSmoothingQuality = "high";

    // we then position the crop on the canvas
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.translate(-cropX, -cropY);
    ctx.translate(-centerX, -centerY);

    // draw the image on the canvas and set it on the img tag
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    setDisplayCrop(false);
    setFinalSnip(canvas.toDataURL());
    canvas.toBlob((blob) => {
      setSnip(mediaBlobUrl);
      const url = URL.createObjectURL(blob);
      setMediaBlobUrl(url);
    });
  }

  const handleOnMouseEnter = () => {
    setHover(true);
  };
  const handleOnMouseLeave = () => {
    setHover(false);
  };

  async function getFile(filePath){
    const response = await axios.get(`http://localhost:8081/api/storage?filePath=${filePath}`);
    return response.data;
  }

  async function uploadMediaFile(
    mediaBlobUrl,
    fileName = "blob"
  ) {
      const localRes = await fetch(mediaBlobUrl);
      const blob = await localRes.blob();
      const formData = new FormData();
      formData.append("media_file", blob, fileName);
      const opts = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(`http://localhost:8081/api/storage`, formData, opts);
  
      return response.data;
    }

  return (
    <>
      <div>
        <h3>Take Screenshot</h3>
        <button onClick={handleStartScreenshot}>Take Screenshot</button>
      </div>
      {mediaBlobUrl ? (
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          display="inline-flex"
          justifyContent="right"
          alignItems="center"
        >
            <button onClick={async ()=>{
                let respon = await uploadMediaFile(mediaBlobUrl)
                console.log(respon.path)
                let image = await getFile(respon.path)
                console.log(image.mediaDownloadUrl)

                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    altText: "Screenshot",
                    src: image.mediaDownloadUrl
                });
            }}>Save</button>
          <Grid item xs={1}>
            <IconButton onClick={handleUndo} sx={{ marginLeft: "auto" }}>
              <UndoIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={handleDelete}
              sx={{ marginLeft: "auto" }}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            >
              <Cancel fontSize="small" color={hover ? "error" : "disabled"} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {mediaBlobUrl && displayCrop && (
            <ReactCrop
              crop={crop}
              onChange={(c) => {
                setCrop(c);
              }}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                id="screenshot-preview"
                src={mediaBlobUrl}
                style={{ objectFit: "contain" }}
                alt="test"
              />
            </ReactCrop>
          )}
          {finalSnip && (
            <img
              id="cropedImg"
              src={finalSnip}
              alt="test"
              style={{ maxWidth: imageDynamicWidth }}
            />
          )}
        </Grid>
      </Grid>
      ) : (
      <span />
      )}

    </>
  );
}
