// Node module Imports
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  // Atoms
  CircleButton,
  FAIcon,
  PreLoaderMini,

  // Molecules
  GeneralPlaceholders,
  LoadMoreData,
  NoResultsFoundPlaceholder,
  NoMoreResultsPlaceholder,

  // Organisms
  BlogList,
  ResultPage,

  // Templates
  DynamicLayout_Tabs$TwoColumns,

  // APIs
  blogApis,

  // Redux - reducers
  blogReducers,
} from "../../config/exports";

function TabLabel_internal({ children, onRefresh }) {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = (e) => {
    e.stopPropagation(); // Prevent tab switch

    setRefresh(true);
    onRefresh();

    setTimeout(() => {
      setRefresh(false);
    }, 1000); // Keep spinning for 2 seconds
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <GeneralPlaceholders.Text icon="clock">
        {children}
      </GeneralPlaceholders.Text>
      <CircleButton
        size="25px"
        color="var(--color-2d)"
        style={{ color: "var(--color)" }}
        onClick={handleRefresh}
      >
        <FAIcon
          mods={refresh ? "spin" : ""}
          style={{
            padding: "1px 0 0 1px",
          }}
        >
          refresh
        </FAIcon>
      </CircleButton>
    </div>
  );
}

// eslint-disable-next-line react/display-name
const LatestBlogs_internal = forwardRef(function ({ setResult }, ref) {
  const dispatch = useDispatch();

  const { blogs, currentPage, totalPages } = useSelector(
    (state) => state.blog?.latest
  );

  const [blogsResult, setBlogsResult] = useState({
    loading: false,
    hasMore: true,
    noResult: false,
  });

  const { loading, hasMore, noResult } = blogsResult;

  const fetchHandler = useCallback(
    async (page = 1) => {
      setBlogsResult((p) => ({
        ...p,
        loading: true,
      }));

      const apiData =
        (await blogApis.getBlogs({
          queries: {
            filterType: "latest",
            page,
          },
        })) || {};

      const { status, message, result: apiResult = {} } = apiData || {};

      setResult({ status, message });

      dispatch((_, getState) => {
        const prevState = getState().blog?.latest;

        dispatch(
          blogReducers.result({
            latest: {
              blogs:
                page === 1
                  ? apiResult?.blogs || []
                  : [...prevState.blogs, ...(apiResult?.blogs || [])],
              totalPages: apiResult?.totalPages ?? prevState.totalPages,
              currentPage: page ?? prevState.currentPage,
            },
          })
        );
      });

      setBlogsResult((p) => ({
        ...p,
        loading: false,
        // totalResults: apiResult?.totalResults,
        hasMore: page < apiResult?.totalPages,
        noResult: apiResult?.blogsCount === 0,
      }));
    },
    [dispatch, setResult]
  );

  const fetchNextPage = useCallback(async () => {
    const nextPage = currentPage + 1;

    if (currentPage && nextPage <= totalPages)
      await fetchHandler(nextPage); // Load the next page
    else setBlogsResult((p) => ({ ...p, hasMore: false }));
  }, [currentPage, totalPages, fetchHandler]);

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      fetchHandler();
    }
  }, []); // eslint-disable-line

  useImperativeHandle(ref, () => ({
    refreshBlogs: () => fetchHandler(1),
  }));

  return (
    <LoadMoreData
      mainElement={<BlogList blogs={blogs} />}
      dataLength={blogs.length}
      loading={loading}
      hasMore={hasMore}
      noResult={noResult}
      loaderElement={<PreLoaderMini />}
      noResultElement={<NoResultsFoundPlaceholder />}
      endMessageElement={<NoMoreResultsPlaceholder />}
      fetchNextPageFunc={fetchNextPage}
    />
  );
});

// eslint-disable-next-line react/display-name
const TrendingBlogs_internal = forwardRef(function ({ setResult }, ref) {
  const [blogsResult, setBlogsResult] = useState({
    loading: false,
    blogs: [],
    totalPages: 0,
    currentPage: 0,
    hasMore: true,
    noResult: false,
  });

  const { loading, blogs, totalPages, currentPage, hasMore, noResult } =
    blogsResult;

  const fetchHandler = useCallback(
    async (page = 1) => {
      setBlogsResult((p) => ({
        ...p,
        loading: true,
        blogs: page === 1 ? [] : p.blogs,
      }));

      const apiData =
        (await blogApis.getBlogs({
          queries: {
            filterType: "trending",
            page,
          },
        })) || {};

      const { status, message, result: apiResult = {} } = apiData || {};

      setResult({ status, message });

      setBlogsResult((p) => ({
        ...p,
        loading: false,
        blogs: [...(p?.blogs || []), ...(apiResult?.blogs || [])],
        totalPages: apiResult?.totalPages,
        // totalResults: apiResult?.totalResults,
        currentPage: page,
        hasMore: page < apiResult?.totalPages,
        noResult: apiResult?.blogsCount === 0,
      }));
    },
    [setResult]
  );

  const fetchNextPage = useCallback(async () => {
    const nextPage = currentPage + 1;

    if (currentPage && nextPage <= totalPages)
      await fetchHandler(nextPage); // Load the next page
    else setBlogsResult((p) => ({ ...p, hasMore: false }));
  }, [currentPage, totalPages, fetchHandler]);

  useEffect(() => {
    const initialFetch = async () => await fetchHandler();
    initialFetch();
  }, [fetchHandler]);

  useImperativeHandle(ref, () => ({
    refreshBlogs: () => fetchHandler(1),
  }));

  return (
    <LoadMoreData
      method="button"
      mainElement={<BlogList blogs={blogs} miniCards />}
      dataLength={blogs.length}
      loading={loading}
      hasMore={hasMore}
      noResult={noResult}
      loaderElement={<PreLoaderMini />}
      noResultElement={<NoResultsFoundPlaceholder />}
      endMessageElement={<NoMoreResultsPlaceholder />}
      fetchNextPageFunc={fetchNextPage}
    />
  );
});

function Home() {
  const [result, setResult] = useState(null);

  const latestBlogsRef = useRef(null);
  const trendingBlogsRef = useRef(null);

  if (result?.status === "error")
    return <ResultPage type={result?.status} message={result?.message} />;

  return (
    <DynamicLayout_Tabs$TwoColumns
      elements={{
        element1: {
          label: (
            <TabLabel_internal
              onRefresh={() => latestBlogsRef.current?.refreshBlogs()}
            >
              Latest Blogs
            </TabLabel_internal>
          ),
          element: (
            <LatestBlogs_internal ref={latestBlogsRef} setResult={setResult} />
          ),
        },
        element2: {
          label: (
            <TabLabel_internal
              onRefresh={() => trendingBlogsRef.current?.refreshBlogs()}
            >
              Trending Blogs
            </TabLabel_internal>
          ),
          element: (
            <TrendingBlogs_internal
              ref={trendingBlogsRef}
              setResult={setResult}
            />
          ),
        },
      }}
    />
  );
}

export default Home;
