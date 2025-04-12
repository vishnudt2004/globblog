// Node module Imports
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Configuration Imports
import config from "../../config/config";

// Static Imports
import messages from "../../config/messages";

import {
  // Atoms
  BorderX,
  Button,
  FAIcon,
  Highlighter,
  Image,
  MessageMini,
  ReactQuill_mod,
  VisibilityControl,

  // Templates
  HorizontallyCenteredLayout,

  // Molecules
  GeneralPlaceholders,
  InfoModal,
  OrphanBlogPlaceholder,
  UserCardMini,
  // actions
  DeleteBlogAction_enhancer,

  // Organisms
  OwnerControls,
  EditButton,
  DeleteButton,
  ResultPage,

  // Helpers
  formatBlogCoverImageUrl,
  BlogReadTracker,

  // Utilities
  getCookie,
} from "../../config/exports";

const { title, additionalTitle, infos } = messages.BLOG.BLOG_READCOUNT_CALCINFO;

const pointColours = [
  "orangered",
  "dodgerblue",
  "deeppink",
  "blueviolet",
  "darkred",
];

function InfoModal_internal({ visible, setVisible }) {
  return (
    <InfoModal visible={visible} setVisible={setVisible}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <GeneralPlaceholders.Text icon="book-open-reader">
          {additionalTitle}
        </GeneralPlaceholders.Text>
        <ol
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingLeft: "10px",
          }}
        >
          {infos.map((info, index) => {
            const clipped = info.split(":");
            const label = clipped[0];
            const desc = clipped[1];

            return (
              <li key={index}>
                {label && (
                  <Highlighter
                    fancy
                    radius={index === infos.length - 1 ? 0 : undefined}
                    bgColor={pointColours[index] || "var(--info-color)"}
                  >
                    {label}
                  </Highlighter>
                )}
                {desc}
              </li>
            );
          })}
        </ol>
      </div>
    </InfoModal>
  );
}

function BorderX_mod({ ...attr }) {
  return (
    <BorderX
      width="100%"
      height="1px"
      color="var(--color)"
      style={{ opacity: 0.5 }}
      {...attr}
    />
  );
}

function OwnerControls_internal({ owner, setDeletionResult }) {
  const { blogId } = useParams();

  const DeleteButton_with_DeleteBlogAction = DeleteBlogAction_enhancer(
    DeleteButton,
    blogId,
    setDeletionResult
  );

  return (
    <>
      <OwnerControls owner={owner} style={{ alignSelf: "end" }}>
        <DeleteButton_with_DeleteBlogAction>
          Delete Blog
        </DeleteButton_with_DeleteBlogAction>
        <EditButton route={`/blog/update/${blogId}`}>Edit Blog</EditButton>
      </OwnerControls>
    </>
  );
}

const Section_sc = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  gap: 1rem;

  .info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
    padding: 10px 0;

    & span:first-child {
      font-size: 0.9rem;
    }
  }

  .blog-container {
    display: flex;
    flex-direction: column;
    letter-spacing: 0.8;
    line-height: 1.8;
    gap: 1rem;

    .blog-info-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      button {
        color: var(--color2);
      }
    }
  }

  img.cover-image {
    aspect-ratio: 16 / 9; /* wider image */
    border: 1px solid var(--border-color);
  }

  p {
    font-family: var(--font-family_light);
  }

  div.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media screen and (max-width: 480px) {
    .info-container {
      flex-direction: column-reverse;
      align-items: end;
      text-align: right;
    }
  }
`;

function BlogViewer({ blog, owner, onReadComplete }) {
  const { blogId } = useParams();

  const categories = config.UI_ELEMENTS.BLOG.CATEGORIES;

  const [visibleInfoModal, setVisibleInfoModal] = useState(false);

  const [deletionResult, setDeletionResult] = useState(null);

  const blogContentRef = useRef(null);

  const [myval, setMyval] = useState(false);

  useEffect(() => {
    const alreadyCounted = getCookie(`read_client_${blogId}`);
    const element = blogContentRef.current;

    if (alreadyCounted || !element) return;

    const tracker = new BlogReadTracker(
      element,
      undefined, // default options: { wordsPerMinute: 250, requiredReadingTimePercent: 80, requiredScrollPercent: 80 }
      (readCompletionStatus) => {
        onReadComplete(readCompletionStatus);
      }
    );

    tracker.startTracking();

    return () => tracker.stopTracking();
  }, [onReadComplete, blog, blogId]);

  if (deletionResult)
    return (
      <ResultPage
        type={deletionResult?.status}
        message={deletionResult?.message}
        redirectionButton={{
          name:
            deletionResult?.status === "error"
              ? "Back to Blog Post"
              : "Go to Home",
          icon: deletionResult?.status === "error" ? "newspaper" : "home",
          redirect:
            deletionResult?.status === "error"
              ? () => setDeletionResult(null)
              : "/",
        }}
      />
    );

  return (
    <HorizontallyCenteredLayout>
      <Section_sc>
        <div className="info-container">
          {blog.updatedAt ? (
            <span>Updated On: {blog.updatedAt}</span>
          ) : (
            <span>Published On: {blog?.createdAt}</span>
          )}

          <VisibilityControl
            visible={!blog?.orphan}
            fallback={<OrphanBlogPlaceholder />}
          >
            <UserCardMini
              size="50px"
              name={blog?.author?.profile.name}
              image={blog?.author?.profile?.image}
              userId={blog?.author?._id}
            />
          </VisibilityControl>
        </div>
        <div className="blog-container">
          <OwnerControls_internal
            owner={owner}
            setDeletionResult={setDeletionResult}
          />

          <Image
            key={blog?.image}
            className="cover-image"
            src={blog?.image && formatBlogCoverImageUrl(blog.image)}
          />

          <h2>{blog?.title}</h2>

          <BorderX_mod />

          <div className="quill-container" ref={blogContentRef}>
            <ReactQuill_mod
              type="viewer"
              modules={{ toolbar: false }}
              autoExpandEditor={true}
              readOnly
              value={blog?.content}
            />
          </div>

          <BorderX_mod />

          <h4>SUMMARY</h4>
          <pre>{blog?.summary}</pre>

          <BorderX_mod />

          <h4>TAGS / KEYWORDS</h4>
          <div className="tags">
            {blog.tags &&
              blog.tags.map((tag) => {
                const icon = categories.find(
                  (cat) => cat.category.toLowerCase() === tag.toLowerCase()
                )?.icon;

                return (
                  <GeneralPlaceholders.Button key={tag} icon={icon}>
                    {tag}
                  </GeneralPlaceholders.Button>
                );
              })}
          </div>

          <BorderX_mod />

          <div className="blog-info-container">
            <Button
              type="secondary"
              color="var(--color2)"
              icon={<FAIcon icon="book-open-reader" />}
              radius="30px"
              hoverStyle={{
                background: "var(--color2)",
                color: "var(--background-color)",
              }}
              title={title}
              onClick={() => setVisibleInfoModal(true)}
            >
              {blog?.readsCount} Reads
            </Button>
            {/* <Button
                type="secondary"
                color="var(--color2)"
                icon={<FAIcon icon="heart" />}
                radius="30px"
                hoverStyle={{}}
              >
                {blog.likesCount} Likes
              </Button> */}
          </div>
        </div>
      </Section_sc>

      <InfoModal_internal
        visible={visibleInfoModal}
        setVisible={setVisibleInfoModal}
      />

      <MessageMini visible={myval} resetMessage={() => setMyval(false)}>
        children
      </MessageMini>
    </HorizontallyCenteredLayout>
  );
}

export default BlogViewer;
