// Node module Imports
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Configuration Imports
import config from "../../config/config";

import {
  // Atoms
  VisibilityControl,

  // Organisms
  BlogViewer,
  ResultPage,

  // Contexts
  useMessageMini,
  usePreLoader,

  // APIs
  blogApis,

  // Utilities
  setCookie,
  durationToMs,
} from "../../config/exports";

function Blog() {
  const readCountExpireTime = config.BLOG.READ_COUNT_EXPIRE_TIME;

  const { blogId } = useParams();
  const showMessageMini = useMessageMini();
  const showPreLoader = usePreLoader();

  const [result, setResult] = useState({ status: "", message: "", blog: {} });
  const [readComplete, setReadComplete] = useState(false);

  const currentUser = useSelector((state) => state.security.currentUser);

  const fetchBlog = useCallback(
    async ({ partialUpdate } = {}) => {
      if (!partialUpdate) showPreLoader(true);

      const apiData = await blogApis.getBlog({ blogId, queries: {} });

      const { status, message, result: { blog } = {} } = apiData;

      if (!blog) {
        if (!partialUpdate) showPreLoader(false);

        setResult(apiData);
        return;
      }

      if (partialUpdate && blog[partialUpdate] !== undefined) {
        setResult((p) => ({
          ...p,
          blog: { ...p.blog, [partialUpdate]: blog[partialUpdate] },
        }));
      } else {
        setResult({ status, message, blog });
      }

      showPreLoader(false);
    },
    [showPreLoader, blogId]
  );

  const fetchReadCount = useCallback(async () => {
    const apiData = await blogApis.updateReadCount({ blogId });

    const { status, message } = apiData || {}; // eslint-disable-line no-unused-vars

    showMessageMini(status, message);

    if (status === "success") {
      setCookie(
        `read_client_${blogId}`,
        true,
        durationToMs(readCountExpireTime)
      );
      fetchBlog({ partialUpdate: "readsCount" });
    }
  }, [showMessageMini, fetchBlog, readCountExpireTime, blogId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    if (readComplete) fetchReadCount();
  }, [fetchReadCount, readComplete]);

  return (
    <VisibilityControl
      visible={result?.status !== "error"}
      element={
        <BlogViewer
          blog={result?.blog}
          owner={
            currentUser?._id &&
            result?.blog?.author?._id &&
            currentUser?._id === result?.blog?.author?._id
          }
          onReadComplete={setReadComplete}
        />
      }
      fallback={
        <ResultPage
          type="error"
          message={result?.message}
          redirectionButton={{
            name: "Go to Home",
            icon: "home",
            redirect: "/",
          }}
        />
      }
    />
  );
}

export default Blog;
