import * as React from "react";
import { Suspense, useRef } from "react";


function LazyVideo({
  altText,
  className,
  videoRef,
  src,
  width,
  height,
  maxWidth
}){

    return (
    <video
      controls
      className={className || undefined}
      
      alt={altText}
      ref={videoRef}
      style={{
        height,
        maxWidth,
        width
      }}
    >
        <source src={src} type="video/mp4"/>
    </video>
  );
}

export default function VideoComponent({
  src,
  altText,
  width,
  height,
  maxWidth
}) {
  const videoRef = useRef(null);

  return (
    <Suspense fallback={null}>
      <>
        <div>
          <LazyVideo
            className=""
            src={src}
            altText={altText}
            videoRef={videoRef}
            width={width}
            height={height}
            maxWidth={maxWidth}
          />
        </div>
      </>
    </Suspense>
  );
}
