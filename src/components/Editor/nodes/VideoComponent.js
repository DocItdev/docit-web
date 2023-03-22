/* eslint-disable react/prop-types */
import * as React from "react";
import { Suspense, useRef } from "react";

function LazyVideo({
  altText,
  className,
  videoRef,
  src,
  width,
  height,
  maxWidth,
}) {
  return (
    <video
      controls
      className={className}
      alt={altText}
      ref={videoRef}
      style={{
        height,
        maxWidth,
        width,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function VideoComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
}) {
  const videoRef = useRef(null);

  return (
    <Suspense fallback={null}>
      <LazyVideo
        className=""
        src={src}
        altText={altText}
        videoRef={videoRef}
        width={width}
        height={height}
        maxWidth={maxWidth}
      />
    </Suspense>
  );
}
