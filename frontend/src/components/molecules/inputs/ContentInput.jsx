import {
  // Atoms
  ReactQuill_mod,

  // Molecules
  CheckButton,

  // Hooks
  useLocalStorage,
} from "../../../config/exports";

const colors = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

const blotFormatter = {
  align: {
    toolbar: {
      mainStyle: {
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      },
      buttonStyle: {
        background: "transparent",
        border: 0,
      },
      svgStyle: {
        boxShadow: "0 0 0 3px var(--color-2d)",
        padding: "3px",
        boxSizing: "content-box",
        stroke: "orange",
      },
      // addButtonSelectStyle: {},
    },
  },
  overlay: {
    style: {
      border: "3px dashed var(--color2)",
      borderRadius: "10px",
    },
  },
  resize: {
    handleStyle: {
      width: "20px",
      height: "20px",
      background: "var(--color-2d)",
      border: "5px solid var(--color2)",
    },
  },
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {
        color: colors,
      },
      { background: colors },
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["align", { align: "center" }, { align: "right" }],
    ["link", "code-block", "image", "video"],
    ["clean"],
  ],
  blotFormatter,
};

function ContentInput(attr) {
  const [autoExpandEditor, setAutoExpandEditor] = useLocalStorage(
    "auto_expand_editor",
    false
  );

  return (
    <div>
      <ReactQuill_mod
        modules={modules}
        height={autoExpandEditor ? "300px" : "70dvh"}
        autoExpandEditor={autoExpandEditor}
        {...attr}
      />
      <CheckButton check={autoExpandEditor} setCheck={setAutoExpandEditor}>
        Auto Expand Editor
      </CheckButton>
    </div>
  );
}

export default ContentInput;
