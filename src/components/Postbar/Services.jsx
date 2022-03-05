const draft = {
    //All icons are from bootstrap: https://icons.getbootstrap.com/ 
    INLINE_TYPES: [
        { label: "B", style: "BOLD" , icon:"bi bi-type-bold"},
        { label: "I", style: "ITALIC" , icon:"bi bi-type-italic"},
        { label: "U", style: "UNDERLINE", icon:"bi bi-type-underline" },
        { label: "Monospace", style: "CODE", icon:"bi bi-code-slash" },
    ],
    BLOCK_TYPES: [
        { label: "Code Block", style: "code-block" , icon:"bi bi-file-code" },
        { label: "UL", style: "unordered-list-item", icon:"bi bi-list-ul" },
        { label: "OL", style: "ordered-list-item", icon:"bi bi-list-ol"  },
        { label: "Blockquote", style: "blockquote", icon:"bi bi-blockquote-left" },
        { label: "H1", style: "header-one", icon:"bi bi-type-h1"  },
        { label: "H2", style: "header-two", icon:"bi bi-type-h2"  },
        { label: "H3", style: "header-three", icon:"bi bi-type-h3"  },
        
    ],
    HEADER_TYPES: [
        { label: "H1", style: "header-one", icon:"bi bi-type-h1"  },
        { label: "H2", style: "header-two", icon:"bi bi-type-h2"  },
        { label: "H3", style: "header-three", icon:"bi bi-type-h3"  },
    ],
    getBlockStyle(block) {
        switch (block.getType()) {
          case "blockquote":
            return "blockquote";
          case "code-block":
            return "code-block";
          default:
            return null;
        }
      },
    // Custom overrides for "code" style.
    styleMap: {
        CODE: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
            color: "red"
        },
    }
}

export default draft;