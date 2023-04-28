import { createEditor, DecoratorNode } from "lexical";
import React, { Suspense } from "react";

const VideoSource = React.lazy(() => import("./VideoSourceComponent"));

function convertVideoElement(domNode) {
  if (domNode instanceof HTMLVideoElement) {
    const { altText, src } = domNode;
    const node = $createVideoNode({ altText, src });
    return { node };
  }
  return null;
}

export class VideoNode extends DecoratorNode {
  constructor(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key,
    fileKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
    this.__fileKey = fileKey;
  }

  static getType() {
    return "video";
  }

  static clone(node) {
    return new VideoNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key,
      node.__fileKey
    );
  }

  static importJSON(serializedNode) {
    const {
      altText,
      height,
      width,
      maxWidth,
      caption,
      src,
      showCaption,
      fileKey,
    } = serializedNode;

    const node = $createVideoNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
      fileKey,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  exportDOM() {
    const element = document.createElement("video");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    element.setAttribute("width", this.__width);
    element.setAttribute("height", this.__height);
    return { element };
  }

  static importDOM() {
    return {
      video: (node) => ({
        conversion: convertVideoElement,
        priority: 0,
      }),
    };
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: "video",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width,
      fileKey: this.__fileKey,
    };
  }

  setWidthAndHeight(width, height) {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  setShowCaption(showCaption) {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  createDOM(config) {
    const video = document.createElement("video");
    const theme = config.theme;
    const className = theme.video;
    if (className !== undefined) {
      video.className = className;
    }
    video.setAttribute("width", this.__width);
    video.setAttribute("height", this.__height);
    video.setAttribute("preload", "metadata");
    video.setAttribute("controls", true)
    video.setAttribute('controllist', 'nodownload');
    return video;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getAltText() {
    return this.__altText;
  }

  getFileKey() {
    return this.__fileKey;
  }

  decorate() {
    return (
        <Suspense fallback={null}>
          <VideoSource
            src={this.__src}
            width={this.__width}
            height={this.__height}
            fileKey={this.__fileKey}
          />
        </Suspense>
    );
  }
}

export function $createVideoNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
  fileKey,
}) {
  return new VideoNode(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key,
    fileKey
  );
}

export function $isVideoNode(node) {
  return node instanceof VideoNode;
}
