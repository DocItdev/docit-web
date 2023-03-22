import { createEditor, DecoratorNode } from "lexical";
import * as React from "react";

function convertVideoElement(domNode) {
  if (domNode instanceof HTMLVideoElement) {
    const { altText, src } = domNode;
    const node = $createVideoNode({ altText, src });
    return { node };
  }
  return null;
}

export class VideoNode extends DecoratorNode {
  
    static getType() {
      return 'video';
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
        node.__key
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
        showCaption
      } = serializedNode;

      const node = $createVideoNode({
        altText,
        height,
        maxWidth,
        showCaption,
        src,
        width
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
      return { element };
    }
  
    static importDOM() {
      return {
        img: (node) => ({
          conversion: convertVideoElement,
          priority: 0
        })
      };
    }

    constructor(
      src,
      altText,
      maxWidth,
      width,
      height,
      showCaption,
      caption,
      captionsEnabled,
      key
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
        width: this.__width === "inherit" ? 0 : this.__width
      };
    }

    setWidthAndHeight(
      width,
      height
    ) {
      const writable = this.getWritable();
      writable.__width = width;
      writable.__height = height;
    }
  
    setShowCaption(showCaption) {
      const writable = this.getWritable();
      writable.__showCaption = showCaption;
    }

    createDOM(config) {
      const span = document.createElement("span");
      const theme = config.theme;
      const className = theme.video;
      if (className !== undefined) {
        span.className = className;
      }
      return span;
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

    decorate() {
      return (
        
          <video
            controls
            width={this.__width}
            height={this.__height}
            
          >
            <source src={this.__src} type="video/mp4"/>
            </video>
        
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
    key
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
      key
    );
  }
  
  export function $isVideoNode(
    node
  ) {
    return node instanceof VideoNode;
  }
  

