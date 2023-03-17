 
  import { createEditor, DecoratorNode } from "lexical";
  import * as React from "react";
  import { Suspense } from "react";
  
  const ImageComponent = React.lazy(
    // @ts-ignore
    () => import("./ImageComponent")
  );
  
  
  function convertImageElement(domNode) {
    if (domNode instanceof HTMLImageElement) {
      const { alt: altText, src } = domNode;
      const node = $createImageNode({ altText, src });
      return { node };
    }
    return null;
  }
  
  
  export class ImageNode extends DecoratorNode {
    // __src: string;
    // __altText: string;
    // __width: "inherit" | number;
    // __height: "inherit" | number;
    // __maxWidth: number;
    // __showCaption: boolean;
    // __caption: LexicalEditor;
    // // Captions cannot yet be used within editor cells
    // __captionsEnabled: boolean;
  
    static getType() {
      return "image";
    }
  
    static clone(node) {
      return new ImageNode(
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
      const node = $createImageNode({
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
      const element = document.createElement("img");
      element.setAttribute("src", this.__src);
      element.setAttribute("alt", this.__altText);
      return { element };
    }
  
    static importDOM() {
      return {
        img: (node) => ({
          conversion: convertImageElement,
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
        type: "image",
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
  
    // View
  
    createDOM(config) {
      const span = document.createElement("span");
      const theme = config.theme;
      const className = theme.image;
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
        <Suspense fallback={null}>
          <ImageComponent
            src={this.__src}
            altText={this.__altText}
            width={this.__width}
            height={this.__height}
            maxWidth={this.__maxWidth}
            nodeKey={this.getKey()}
            showCaption={this.__showCaption}
            caption={this.__caption}
            captionsEnabled={this.__captionsEnabled}
            resizable={true}
          />
        </Suspense>
      );
    }
  }
  
  export function $createImageNode({
    altText,
    height,
    maxWidth="100%",
    captionsEnabled,
    src,
    width,
    showCaption,
    caption,
    key
  }) {
    return new ImageNode(
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
  
  export function $isImageNode(
    node
  ) {
    return node instanceof ImageNode;
  }
  