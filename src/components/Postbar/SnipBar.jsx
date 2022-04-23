import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import styles from "./Postbar.module.css";
import { setMediaBlobUrl, setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

/**
 * 
 * 1. initiate screenshot
 * 2. render screenshot to userscreen 
 * 3. useDispatch url (might need to change to blob url)
 * 4. save to backend
 */

export default function SnipBar({ start, resetTriggerFeature }) {
    const dispatch = useDispatch();


    useEffect(() => {
        const handleStart = async () => {
            const canvas = await takeScreenshotCanvas();
            canvas.toBlob((blob)=>{
                const url = URL.createObjectURL(blob);
                dispatch(setMediaBlobUrl(url));
                dispatch(setMediaType(MediaTypes.IMAGE))
            });
        };
        if (start) {
            handleStart();
            resetTriggerFeature();
        }
    }, [start]);


    function getDisplayMedia(options) {
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            return navigator.mediaDevices.getDisplayMedia(options)
        }
        if (navigator.getDisplayMedia) {
            return navigator.getDisplayMedia(options)
        }
        if (navigator.webkitGetDisplayMedia) {
            return navigator.webkitGetDisplayMedia(options)
        }
        if (navigator.mozGetDisplayMedia) {
            return navigator.mozGetDisplayMedia(options)
        }
        throw new Error('getDisplayMedia is not defined')
    }

    async function takeScreenshotStream() {
        const width = 1900;
        const height = 1100;

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
            stream = await getDisplayMedia(mediaStreamConstraints)
        } catch (ex) {
            errors.push(ex)
        }

        if (errors.length) {
            console.debug(...errors)
            if (!stream) {
                throw errors[errors.length - 1]
            }
        }

        return stream
    }

    async function takeScreenshotCanvas() {
        const stream = await takeScreenshotStream()
        const video = document.createElement('video')
        const result = await new Promise((resolve, reject) => {
            video.onloadedmetadata = () => {
                video.play()
                video.pause()
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d')
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
                resolve(canvas)
            }
            video.srcObject = stream
        })

        stream.getTracks().forEach(function (track) {
            track.stop()
        })

        if (result == null) {
            throw new Error('Cannot take canvas screenshot')
        }

        return result
    }

    return <div/>
}

