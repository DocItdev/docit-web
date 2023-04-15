import { createEditor, DecoratorNode } from "lexical";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Cancel from "@mui/icons-material/Cancel";
import FilePresentIcon from "@mui/icons-material/FilePresent";

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
    console.log("url: ", url);
    console.log("name: ", name);
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
      <Card
        component={Grid}
        item
        xs={12}
        sx={{ margin: "1rem" }}
        variant="outlined"
      >
        <Grid container>
          <Grid item xs={11}>
            <CardContent>
              <FilePresentIcon style={{ color: "#1F5980", fontSize: "35px" }} />
              <p>{this.__name}</p>
              <p>{this.__url}</p>
            </CardContent>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <a href={this.__url} target="_blank" rel="noreferrer" download>
            <Grid item>
              <CardContent>
                <FilePresentIcon
                  style={{ color: "#1F5980", fontSize: "35px" }}
                />
                {this.__name}
              </CardContent>
            </Grid>
          </a>
        </Grid>
      </Card>
    );
  }
}

export function $createFileNode({ url, name, key }) {
  return new FileNode(url, name, key);
}

export function $isFileNode(node) {
  return node instanceof FileNode;
}
