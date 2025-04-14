// Node module Imports
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import FAIcon from "@/components/atoms/FAIcon";
import Image from "@/components/atoms/Image";
import { useMessage } from "@/contexts/MessageContext";

const Figure_sc = styled.figure`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  font-size: 0.8rem;
  text-align: center;
  position: relative;

  img {
    padding: 2px;
    border: 2px dashed var(--border-color);
  }

  input {
    display: none;
  }

  label {
    display: grid;
    place-items: center;
    align-content: center;
    gap: 10px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 2rem;
    left: 0;
    background: var(--color2);
    color: var(--background-color);
    border-radius: 150px;
    opacity: 0;
    cursor: pointer;
    z-index: 0;
    transition: all 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  i {
    position: absolute;
    font-size: 2rem;
    opacity: 0.4;
    z-index: -1;
  }

  figcaption {
  }
`;

function ProfileImageInput({ value, onFileChange }) {
  const showMessage = useMessage();

  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const { PROFILEIMAGE_MAXSIZE: maxSize, PROFILEIMAGE_TYPES: allowedTypes } =
    config.USER;

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

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxSize) {
        showMessage(
          "error",
          `Maximum File Size: ${maxSize / (1024 * 1024)} MB`,
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        showMessage("error", "The file type is not allowed.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
    }

    onFileChange(file);
  };

  const removeImage = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileChange(""); // null will be store "null" string in DB
  };

  return (
    <Figure_sc>
      <Image
        key={preview}
        width="130px"
        height="130px"
        circle
        src={preview}
        fallback="/images/placeholders/person.png"
        alt="Profile Image Preview"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(" ")}
        id="profile_image"
        onChange={handleChange}
      />
      <label htmlFor="profile_image" onClick={preview && removeImage}>
        <FAIcon icon={!preview ? "upload" : "trash"} />{" "}
        {!preview ? "Upload Image" : "Remove Image"}
      </label>
      <figcaption>PROFILE IMAGE</figcaption>
    </Figure_sc>
  );
}

export default ProfileImageInput;
