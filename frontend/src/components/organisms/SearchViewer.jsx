// Node module Imports
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  // Atoms
  BorderX,
  Highlighter,
  PreLoaderMini,
  ScrollDownButton,

  // Molecules
  GeneralPlaceholders,
  LoadMoreData,
  NoMoreResultsPlaceholder,
  NoResultsFoundPlaceholder,
  // inputs
  SearchInput,

  // Organisms
  BlogList,

  // Templates
  HorizontallyCenteredLayout,

  // APIs
  blogApis,
} from "../../config/exports";

function SearchViewer() {
  const navigate = useNavigate();

  const { searchQuery: urlQuery } = useParams();

  const [searchInput, setSearchInput] = useState(urlQuery || "");
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState({
    loading: false,
    blogs: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 0,
    hasMore: true,
    noResult: false,
  });

  const {
    loading,
    blogs,
    totalPages,
    totalResults,
    currentPage,
    hasMore,
    noResult,
  } = result;

  const searchHandler = useCallback(
    async (page = 1, resetSearch = false) => {
      if (!searchInput.trim()) return;

      setResult((p) => ({ ...p, loading: true }));

      if (resetSearch) {
        setResult((p) => ({
          ...p,
          loading: true,
          blogs: [],
          currentPage: 1,
          hasMore: true,
        }));
        setHasSearched(true);
      }

      const apiData =
        (await blogApis.getBlogs({
          queries: {
            filterType: "search",
            search: searchInput,
            page,
          },
        })) || {};

      setResult((p) => {
        const newPage = resetSearch ? 1 : page;
        const newHasMore = !!(
          apiData?.result?.totalPages && newPage < apiData?.result?.totalPages
        );

        return {
          ...p,
          loading: false,
          blogs: [...(p?.blogs || []), ...(apiData?.result?.blogs || [])],
          totalPages: apiData?.result?.totalPages,
          totalResults: apiData?.result?.totalResults,
          currentPage: newPage,
          hasMore: newHasMore,
          noResult: apiData?.result?.blogs.length === 0,
        };
      });
    },
    [searchInput]
  );

  const fetchNextPage = useCallback(async () => {
    const nextPage = currentPage + 1;

    if (currentPage && nextPage <= totalPages)
      await searchHandler(nextPage); // Load the next page
    else setResult((p) => ({ ...p, hasMore: false }));
  }, [currentPage, totalPages, searchHandler]);

  useEffect(() => {
    if (urlQuery && !hasSearched) {
      setSearchInput(urlQuery); // Sync searchInput with URL
      searchHandler(1, true); // Trigger search automatically
    }
  }, [urlQuery, hasSearched]); // eslint-disable-line

  const handleChange = (e) => setSearchInput(e.target.value);

  const handleSearch = () => {
    searchHandler(1, true); // Reset search results on new search
    navigate(`/search/${searchInput}`);
  };

  return (
    <>
      <HorizontallyCenteredLayout
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <SearchInput
          value={searchInput}
          onChange={handleChange}
          onSearch={handleSearch}
        />

        <BorderX width="100%" />

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <GeneralPlaceholders.Text
            style={{ letterSpacing: 1.5, fontSize: "1.3rem" }}
            icon="search"
          >
            Search Results
          </GeneralPlaceholders.Text>
          {totalResults ? (
            <Highlighter>
              Total Results: {blogs.length} / {totalResults}.
            </Highlighter>
          ) : null}
        </div>

        <LoadMoreData
          mainElement={
            <BlogList
              blogs={blogs}
              mutationBreakpoints={["(max-width: 768px)"]}
            />
          }
          dataLength={blogs.length}
          loading={loading}
          hasMore={hasMore}
          noResult={noResult}
          loaderElement={<PreLoaderMini />}
          noResultElement={<NoResultsFoundPlaceholder />}
          endMessageElement={hasSearched && <NoMoreResultsPlaceholder />}
          fetchNextPageFunc={fetchNextPage}
        />
      </HorizontallyCenteredLayout>

      <ScrollDownButton
        reverseScroll={true}
        onClick={() =>
          window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0,
          })
        }
      />
    </>
  );
}

export default SearchViewer;
