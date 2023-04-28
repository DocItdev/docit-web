import { DecoratorNode } from "lexical";
import React, { Suspense } from "react";

const FileComponent = React.lazy(() => import('./FileComponent'));

/**
 * A node is just a class
 */
export class FileNode extends DecoratorNode {
  static getType() {
    return "file";
  }

  static clone(node) {
    return new FileNode(node.__url, node.__name);
  }

  constructor(url, name, key) {
    super(key);
    this.__url = url;
    this.__name = name;
  }

  createDOM() {
    const dom = document.createElement("div");
    return dom;
  }

  // why is this false in all the nodes I have seen thus far?
  updateDOM() {
    return false;
  }

  exportJSON() {
    return {
      url: this.getUrl(),
      name: this.getName(),
      type: "file",
      version: 1,
    };
  }

  static importJSON(serializedNode) {
    const { url, name } = serializedNode;

    const node = $createFileNode({
      url,
      name,
    });

    return node;
  }

  getUrl() {
    return this.__url;
  }

  getName() {
    return this.__name;
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <FileComponent name={this.__name} url={this.__url} />
      </Suspense>
    );
  }
}

export function $createFileNode({ url, name, key }) {
  return new FileNode(url, name, key);
}

export function $isFileNode(node) {
  return node instanceof FileNode;
}
