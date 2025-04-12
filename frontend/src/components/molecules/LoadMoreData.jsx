// Node module Imports
import InfiniteScroll from "react-infinite-scroll-component";

import {
  // Atoms
  Button,
  FAIcon,
} from "../../config/exports";

function LoadMoreData({
  method = "scroll", // scroll | button
  mainElement,
  children,
  dataLength,
  loading,
  hasMore,
  noResult,
  loaderElement,
  noResultElement,
  endMessageElement,
  fetchNextPageFunc,
  style,
  infiniteScroll_props,
}) {
  const containerStyle = {
    width: "100%",
    padding: "1rem",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    ...style,
  };

  if (method === "button") {
    return (
      <div style={containerStyle}>
        {dataLength > 0
          ? mainElement || children
          : !loading && noResult && noResultElement}
        {loading && loaderElement}
        {!hasMore && !noResult && endMessageElement}
        {!loading && hasMore && (
          <Button
            color="var(--color-2d)"
            radius="50px"
            icon={<FAIcon icon="chevron-down" />}
            style={{ color: "var(--color)", margin: "10px auto" }}
            onClick={fetchNextPageFunc}
          >
            Load More
          </Button>
        )}
      </div>
    );
  } else if (method === "scroll") {
    return (
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPageFunc}
        hasMore={hasMore}
        loader={loading && loaderElement}
        endMessage={!noResult && endMessageElement}
        style={containerStyle}
        {...infiniteScroll_props}
      >
        {dataLength > 0
          ? mainElement || children
          : !loading && noResult && noResultElement}
        {!loading && hasMore && <FAIcon icon="ellipsis" />}
      </InfiniteScroll>
    );
  }
}

export default LoadMoreData;
