// Node module Imports
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Image({
  width = "100%",
  height,
  src,
  alt,
  fallback = "/images/placeholders/image-broken.png",
  customFallback = false,
  circle = false,
  rounded = false,
  ...attributes
}) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src || src?.length === 0 || src === "" || src === true) setError(true);
  }, [src]);

  return (
    <>
      {customFallback && error ? (
        fallback
      ) : (
        <LazyLoadImage
          src={error ? fallback : src}
          alt={alt}
          onError={() => setError(true)}
          {...attributes}
          style={{
            width,
            height,
            borderRadius: rounded ? "25px" : circle ? "500px" : "",
            objectFit: "cover",
            ...attributes.style,
          }}
        />
      )}
    </>
  );
}

export default Image;
