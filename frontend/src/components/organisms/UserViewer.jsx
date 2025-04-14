// Node module Imports
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PreLoaderMini } from "@/components/atoms/PreLoader";
import GeneralPlaceholders from "@/components/molecules/GeneralPlaceholders";
import LoadMoreData from "@/components/molecules/LoadMoreData";
import {
  NoResultsFoundPlaceholder,
  NoMoreResultsPlaceholder,
} from "@/components/molecules/Placeholders";
import UserDetailedCard from "@/components/molecules/UserCard";
import DeleteUserAction_enhancer from "@/components/molecules/actions/DeleteUserAction";
import BlogList from "@/components/organisms/BlogList";
import OwnerControls, {
  EditButton,
  DeleteButton,
} from "@/components/organisms/OwnerControls";
import ResultPage from "@/components/organisms/ResultPage";
import {
  HorizontallyCenteredLayout,
  DynamicLayout_Tabs$TwoColumns,
} from "@/components/templates/DynamicLayouts";
import { usePreLoader } from "@/contexts/PreLoaderContext";
import userApis from "@/apis/userApis";

function OwnerControls_internal({ owner, setDeletionResult }) {
  const { userId } = useParams();

  const DeleteButton_with_DeleteUserAction = DeleteUserAction_enhancer(
    DeleteButton,
    userId,
    setDeletionResult,
  );

  return (
    <>
      <OwnerControls owner={owner}>
        <EditButton route={`/user/update/${userId}`}>Edit Profile</EditButton>
        <DeleteButton_with_DeleteUserAction>
          Delete Account
        </DeleteButton_with_DeleteUserAction>
      </OwnerControls>
    </>
  );
}

const Div_sc = styled.div`
  margin: 10px;
  position: sticky;
  top: 46px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

function ProfilePart_internal({ result, owner, setDeletionResult }) {
  const profile = result?.profile || {};

  return (
    <Div_sc>
      <div>
        <UserDetailedCard
          name={profile?.name}
          about={profile?.about}
          image={profile?.image}
          postsCount={profile.postsCount}
          readsCount={profile.readsCount}
          socialMediaProfiles={profile?.socialMediaProfiles}
          joined={result?.createdAt}
        />

        <OwnerControls_internal
          owner={owner}
          setDeletionResult={setDeletionResult}
        />
      </div>
    </Div_sc>
  );
}

function BlogsPart_internal({ result = {}, fetchNextPage }) {
  const { loading, blogs, hasMore, noResult } = result;

  return (
    <HorizontallyCenteredLayout
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingInline: "10px",
      }}
    >
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
    </HorizontallyCenteredLayout>
  );
}

function UserViewer() {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.security.currentUser);
  const showPreLoader = usePreLoader();

  const [result, setResult] = useState(null);
  const [userResult, setUserResult] = useState(null);
  const [blogsResult, setBlogsResult] = useState({
    loading: false,
    blogs: [],
    totalPages: 0,
    currentPage: 0,
    hasMore: true,
    noResult: false,
  });
  const [deletionResult, setDeletionResult] = useState(null);

  const { totalPages, currentPage } = blogsResult;

  const fetchHandler = useCallback(
    async (page = 1) => {
      setBlogsResult((p) => ({
        ...p,
        loading: true,
        blogs: page === 1 ? [] : p.blogs,
      }));

      const apiData =
        (await userApis.getUser({
          userId,
          queries: {
            blogs: {
              page,
            },
          },
        })) || {};

      const { status, message, result: { user } = {} } = apiData || {};
      const { blogs: apiBlogsResult = {}, ...apiUserResult } = user || {};

      setResult({ status, message });

      if (!userResult) setUserResult(apiUserResult);

      setBlogsResult((p) => ({
        ...p,
        loading: false,
        blogs: [...(p?.blogs || []), ...(apiBlogsResult?.blogList || [])],
        totalPages: apiBlogsResult?.totalPages,
        // totalResults: apiBlogsResult?.totalResults,
        currentPage: page,
        hasMore: page < apiBlogsResult?.totalPages,
        noResult: apiBlogsResult?.blogsCount === 0,
      }));
    },
    [userId, userResult],
  );

  const fetchNextPage = useCallback(async () => {
    const nextPage = currentPage + 1;

    if (currentPage && nextPage <= totalPages)
      await fetchHandler(nextPage); // Load the next page
    else setBlogsResult((p) => ({ ...p, hasMore: false }));
  }, [currentPage, totalPages, fetchHandler]);

  useEffect(() => {
    const initialFetch = async () => {
      showPreLoader(true);

      await fetchHandler();

      showPreLoader(false);
    };

    initialFetch();
  }, [showPreLoader, fetchHandler]);

  if (deletionResult)
    return (
      <ResultPage
        type={deletionResult?.status}
        message={deletionResult?.message}
        redirectionButton={{
          name:
            deletionResult?.status === "error"
              ? "Back to Profile Page"
              : "Go to Home",
          icon: deletionResult?.status === "error" ? "user-tie" : "home",
          redirect:
            deletionResult?.status === "error"
              ? () => setDeletionResult(null)
              : "/",
        }}
      />
    );

  if (result?.status === "error")
    return (
      <ResultPage
        type={result?.status}
        message={result?.message}
        redirectionButton={{
          name: "Go to Home",
          icon: "home",
          redirect: "/",
        }}
      />
    );

  return (
    <DynamicLayout_Tabs$TwoColumns
      elements={{
        element1: {
          label: (
            <GeneralPlaceholders.Text icon="user-tie">
              User Profile
            </GeneralPlaceholders.Text>
          ),
          element: (
            <ProfilePart_internal
              result={userResult}
              owner={currentUser?._id === userId}
              setDeletionResult={setDeletionResult}
            />
          ),
        },
        element2: {
          label: (
            <GeneralPlaceholders.Text icon="feather-pointed">
              Blogs by User
            </GeneralPlaceholders.Text>
          ),
          element: (
            <BlogsPart_internal
              result={blogsResult}
              fetchNextPage={fetchNextPage}
            />
          ),
        },
      }}
      twoColumns_props={{
        gridColumns: "1fr 2fr",
      }}
    />
  );
}

export default UserViewer;
