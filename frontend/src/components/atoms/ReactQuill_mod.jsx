// Node module Imports
import { useEffect, useRef } from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter-mobile/dist/BlotFormatter"; // CJS module – default import not supported in ESM, so using direct path
import "react-quill/dist/quill.snow.css";

const BaseImageFormat = Quill.import("formats/image");
const ImageFormatAttributesList = ["alt", "height", "width", "style"];

// Custom Modules
Quill.register("modules/blotFormatter", BlotFormatter);

// to fix 'persistence of image modifications after publish a post'
// https://github.com/kensnyder/quill-image-resize-module/issues/10#issuecomment-317747389

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Quill.register(ImageFormat, true);
// ----- //

const Div_sc = styled.div`
  --toolbar-bg-color: var(--input-color);
  --toolbar-icons-color: var(--color);
  --toolbar-icons-bg-color: transparent;
  --toolbar-icons-bg-color_hover: var(--color-2d);
  --toolbar-dropdown-text-color_hover: var(--color);
  --toolbar-icons-color_hover: var(--color);
  --toolbar-icons-border-radius: 0;
  --toolbar-dropdown-items-container-border-color: var(--border-color);
  --toolbar-dropdown-text-color: var(--toolbar-icons-color);
  --toolbar-dropdown-items-bg-color: var(--background-color);
  --toolbar-dropdown-items-color: var(--color);
  --editor-bg-color: ${({ $type }) =>
    $type === "editor" ? "var(--input-color)" : "var(--background-color)"};
  --editor-placeholder-color: var(--color2);
  --editor-bg-color_focus: var(--background-color);
  --editor-border-color_focus: var(--color);
  --editor-font-size: 1rem;
  --editor-placeholder-font-size: var(--editor-font-size);
  --border-radius: ${({ $radius }) => $radius};

  width: 100%;
  max-width: 95vw;

  .quill {
    /* Toolbar & Editor */
    & > * {
      font-family: var(--font-family_light);
      border: 0px;
    }

    /* Toolbar */
    & > .ql-toolbar {
      background: var(--toolbar-bg-color);
      margin-bottom: 3px;
      display: flex;
      flex-wrap: wrap;
      column-gap: 0.3rem;
      row-gap: 0.6rem;
      padding: 5px 1rem;
      border-radius: var(--border-radius) var(--border-radius) 0 0;

      .ql-formats {
        margin-right: 0;
        display: inline-flex;
        gap: 0.3rem;
        padding: 0.3rem;
        background: var(--toolbar-icons-bg-color);
        border-radius: var(--toolbar-icons-border-radius);

        & > :is(button, .ql-picker):hover {
          background: var(--toolbar-icons-bg-color_hover);
          transition: background 0.4s;

          & .ql-stroke {
            stroke: var(--toolbar-icons-color_hover);
          }

          & .ql-fill {
            fill: var(--toolbar-icons-color_hover);
          }
        }

        /* & > *:hover {
        } */

        /* @media screen and (min-width: 1024px) {
          &:not(:last-child) {
            border-right: 1px solid var(--border-color);
          }
        } */

        & .ql-stroke {
          stroke: var(--toolbar-icons-color);
        }

        & .ql-fill {
          fill: var(--toolbar-icons-color);
        }

        .ql-picker {
          .ql-picker-label {
            color: var(--toolbar-dropdown-text-color);
            border: 0px;
            font-weight: bold;
            letter-spacing: 1;

            &:hover {
              color: var(--toolbar-dropdown-text-color_hover);
            }
          }

          .ql-picker-options {
            background: var(--toolbar-dropdown-items-bg-color);
            color: var(--toolbar-dropdown-items-color);
            box-shadow: 0 0 0 1px
              var(--toolbar-dropdown-items-container-border-color);
            border: 0px;
          }
        }
      }
    }

    /* Editor */
    & > .ql-container .ql-editor {
      height: ${({ $autoExpandEditor, $height }) =>
        $autoExpandEditor ? "auto" : $height};
      min-height: ${({ $height }) => $height};
      resize: ${({ $autoExpandEditor }) => !$autoExpandEditor && "vertical"};

      font-size: var(--editor-font-size);
      background: var(--editor-bg-color);
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      transition:
        background 0.4s,
        box-shadow 0.4s;

      & > p {
        hyphens: none;
      }

      &.ql-blank::before {
        // placeholder
        text-align: left;
        font-style: normal;
        font-size: var(--editor-placeholder-font-size);
        color: var(--editor-placeholder-color);
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--editor-border-color_focus); // 'inset' affects the scrollbar. So, removed
        background: var(--editor-bg-color_focus);
      }

      /*
      quill-blot-formatter care about this.
      custom floating feature.
      & > *:not(.ql-align-center) > img {
        float: left;
        margin-right: 15px;
      }

      & > *.ql-align-center > img {
        padding: 10px;
      }

      & > *.ql-align-right > img {
        float: right;
        margin-left: 15px;
      }
      custom floating feature. */
    }
  }
`;

function ReactQuill_mod({
  type = "editor", // editor, viewer
  height = "300px",
  radius = 0,
  autoExpandEditor = false,
  ...attr
}) {
  const quillRef = useRef(null);

  useEffect(() => {
    const quill = quillRef.current;

    if (quill && quill.getEditor) {
      const editor = quill.getEditor();

      const pickers = editor.theme.pickers;

      editor.root.classList.add("secondary-scrollbar"); // custom scrollbar class

      if (pickers && pickers.length > 0) {
        pickers.forEach((picker) => {
          picker.container.addEventListener("mousedown", handleMouseDown);
        });

        return () => {
          pickers.forEach((picker) => {
            picker.container.removeEventListener("mousedown", handleMouseDown);
          });
        };
      }
    }
  }, []);

  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Div_sc
      $type={type}
      $height={height}
      $radius={radius}
      $autoExpandEditor={autoExpandEditor}
    >
      <ReactQuill ref={quillRef} {...attr} />
    </Div_sc>
  );
}

export default ReactQuill_mod;
