/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useFile from "../../../hooks/useFile";

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth,
}) {
  return (
    <LazyLoadImage
      className={className}
      src={src}
      alt={altText}
      ref={imageRef}
      effect="blur"
      style={{
        height,
        maxWidth,
        width,
      }}
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
  fileKey,
}) {
  const imageRef = useRef(null);
  const { data } = useFile(fileKey);
  return (
    <>
      {data?.mediaDownloadUrl ? (
        <LazyImage
          className="refreshed"
          src={data.mediaDownloadUrl}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
        />
      ) : (
        <LazyImage
          className=""
          src={src}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
        />
      )}
    </>
  );
}
