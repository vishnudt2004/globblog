// Node module Imports
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

// Configuration Imports
import config from "../../../config/config";

import {
  // Atoms
  Button,
  FAIcon,
} from "../../../config/exports";

const Section_sc = styled.section`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 95vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px dashed var(--border-color);
  background: var(--background-color);
  text-align: center;
  cursor: ${({ $image }) => ($image ? "default" : "pointer")};
  transition: background 0.4s;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    background: var(--input-color);
    transition: background 0.4s;
  }

  &:has(img) {
    border: 1px solid var(--border-color);
  }

  &:hover {
    background: var(--border-color);

    &::before {
      background: unset;
    }
  }

  .preview-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-button {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.8rem;
      border: 1px solid #ddd;
    }
  }

  .size-info {
    margin-top: 1rem;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 0.8rem;
  }

  p.inner-text {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 0;

    .placeholder {
      font-size: 3rem;
    }

    .drag-text {
      margin-top: 1rem;
      font-size: 0.7rem;
      color: #fff;
    }

    i {
      position: absolute;
      color: var(--color);
      font-size: 10rem;
      opacity: 0.2;
      z-index: -1;
    }
  }

  @media screen and (max-width: 480px) {
    p.inner-text {
      .placeholder {
        font-size: 2.5rem;
      }

      i {
        font-size: 7rem;
      }
    }
  }
`;

function CoverImageInput({ value, onFileChange }) {
  const [preview, setPreview] = useState(null);

  const { COVERIMAGE_MAXSIZE: maxSize, COVERIMAGE_TYPES: allowedTypes } =
    config.BLOG;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileChange(file);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      onDrop,
      accept: {
        ...allowedTypes,
      },
      maxSize,
      multiple: false,
      noClick: !!preview,
    });

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setPreview(value);
      } else if (value instanceof File) {
        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreview(null);
    }
  }, [value]);

  const removeImage = () => {
    onFileChange(null);
  };

  return (
    <Section_sc
      {...getRootProps()}
      $image={!!preview}
      title="Optional: You can leave this empty if you don't want to add a cover image."
    >
      {!preview && <input {...getInputProps()} />}

      <span className="size-info">
        (MAXIMUM FILE SIZE: {maxSize / (1024 * 1024)} MB)
      </span>

      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="Cover" />
          <Button
            className="remove-button"
            color="#fff"
            onClick={removeImage}
            icon={<FAIcon icon="trash" />}
          >
            Remove Image
          </Button>
        </div>
      ) : (
        <p className="inner-text">
          <FAIcon icon="image" />
          <span className="placeholder">COVER IMAGE</span>
          <span>Drag & Drop or Click to Upload Image</span>

          {isDragActive && (
            <Button
              className="drag-text"
              color={`var(--${isDragAccept ? "success" : "error"}-color)`}
              radius="20px"
            >
              {isDragAccept ? "FILE TYPE ACCEPTED." : "FILE TYPE NOT ALLOWED."}
            </Button>
          )}
        </p>
      )}
    </Section_sc>
  );
}

export default CoverImageInput;
