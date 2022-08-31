import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMediaBlobUrl, setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

export interface SnipBarProps {
    start: boolean;
    resetTriggerFeature: () => void;
  }
/**
 * 
 * 1. initiate screenshot
 * 2. render screenshot to userscreen 
 * 3. useDispatch url (might need to change to blob url)
 * 4. save to backend
 */

export default function SnipBar({ start, resetTriggerFeature }: SnipBarProps) {
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


    function getDisplayMedia(options: DisplayMediaStreamConstraints) {
        if (navigator?.mediaDevices?.getDisplayMedia) {
            return navigator.mediaDevices.getDisplayMedia(options)
        }
        throw new Error('getDisplayMedia is not defined')
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
        const result: HTMLCanvasElement = await new Promise((resolve) => {
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

