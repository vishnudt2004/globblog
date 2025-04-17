// Node module Imports
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import FAIcon from "@/components/atoms/FAIcon";
import Image from "@/components/atoms/Image";
import { OrphanBlogPlaceholder } from "./Placeholders";
import { UserCardMini } from "./UserCard";
import { clipText } from "@/utils/jsUtils";
import { multipleMediaQueries } from "@/utils/cssUtils";
import { formatBlogCoverImageUrl } from "@/helpers/apiHelpers";

const Div_sc = styled.div`
  width: 100%;
  max-width: 900px;
  min-height: 210px;
  display: inline-flex;
  gap: 0.5rem;
  letter-spacing: 0.8;
  line-height: 1.5;
  transition: all 0.4s;
  align-items: stretch;
  cursor: pointer;
  overflow: hidden;
  /* background: var(--color-2d); */
  /* box-shadow: inset 0 0 0 3px var(--border-color); */
  /* border: 1px solid var(--border-color); */
  /* border-radius: 20px; */

  &:hover:not(:has(.user-info:hover)) {
    background: var(--color-2d);
    /* box-shadow: 0 0 0 3px var(--border-color); */
    /* background: var(--background-color); */
  }

  .info-container {
    flex: 1 1 0;
    padding: 0.8rem;
  }

  .published-info {
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border-color);
    font-family: var(--font-family_light);
    font-size: 0.8rem;
  }

  .blog-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;

    p {
      font-family: var(--font-family_light);
    }
  }

  .cover-image-container {
    width: 350px !important;
    position: relative;
    overflow: hidden;
    /* box-shadow: 3px 0 10px 2px var(--border-color); */
    /* border-radius: 5px; */
    /* z-index: 0; */

    img {
      width: 100% !important;
      height: 100%;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      /* z-index: -1; */
    }

    .counts {
      display: flex;
      /* flex-direction: column; */
      gap: 10px;
      position: absolute;
      /* bottom: 0;
      left: 0; */
      bottom: 0;
      left: 0;
      padding: 5px;

      span {
        width: 45px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: var(--background-color);
        font-size: 0.8rem;
        border: 1px solid var(--border-color);
        /* border-radius: 50px; */
        /* border-radius: 5px; */
      }
    }
  }

  ${({ $mutationBreakpoints }) =>
    multipleMediaQueries(
      $mutationBreakpoints,
      `
        width: 450px;
        max-width: 95vw;
        flex-direction: column;

        .cover-image-container {
          width: 100% !important;
          height: 230px;
        }
      `
    )}/* @media screen and (max-width: 480px) {
    .published-info {
      flex-direction: column-reverse;
      align-items: end;

      .date-time{
        margin-right: 10px;
      }
    }
  } */
`;

function BlogCard({
  image,
  title,
  summary,
  publishedOn,
  author,
  orphan,
  blogId,
  readsCount,
  withUserCard = true,
  mutationBreakpoints = [
    "(max-width: 800px)",
    "(min-width: 1024px) and (max-width: 1200px)",
  ], // breakpoints for vertical mutation. (smaller screens view)
}) {
  const { TITLE_MAXLENGTH, SUMMARY_MAXLENGTH } =
    config.UI_ELEMENTS.BLOG.BLOG_CARD;

  const userCardRef = useRef(null);
  const navigate = useNavigate();

  return (
    <Div_sc
      $mutationBreakpoints={mutationBreakpoints}
      onClick={(e) => {
        if (userCardRef.current) {
          if (!userCardRef.current.contains(e.target))
            navigate("/blog/" + blogId);
        } else navigate("/blog/" + blogId);
      }}
    >
      <div className="cover-image-container">
        <Image key={image} src={formatBlogCoverImageUrl(image)} />
        <div className="counts">
          <span title="Total Reads">
            <FAIcon icon="book-open-reader" />
            {readsCount}
          </span>
          {/* <span>
            <FAIcon icon="heart" />
            {likesCount}
          </span>
          <span>
            <FAIcon icon="comment" />
            {commentsCount}
          </span> */}
        </div>
      </div>

      <div className="info-container">
        <div className="published-info">
          <span className="date-time">{publishedOn}</span>
          {withUserCard && author !== null && (
            <span className="user-info" ref={userCardRef}>
              <UserCardMini
                name={author.name}
                image={author.image}
                userId={author.userId}
              />
            </span>
          )}
          {withUserCard && (author === null || orphan) && (
            <OrphanBlogPlaceholder />
          )}
        </div>

        <div className="blog-info">
          <h4>{clipText(title, TITLE_MAXLENGTH)}</h4>
          <p>{clipText(summary, SUMMARY_MAXLENGTH)}</p>
        </div>
      </div>
    </Div_sc>
  );
}

const Div_sc2 = styled.div`
  max-width: 600px;
  min-height: 80px;
  padding: 10px;
  display: flex;
  /* flex-wrap: wrap; */
  gap: 10px;
  transition: background 0.4s;
  cursor: pointer;

  &:hover {
    background: var(--color-2d);
  }

  span.index {
    flex-shrink: 0;
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    background: var(--color-2d);
    border-radius: 50px;
    font-size: 1.5rem;
    word-break: normal;
  }

  div.inner {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  div.info {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 0.8rem;

    span.author-name:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    span {
      display: flex;
      align-items: center;
      gap: 5px;
      padding-block: 5px;

      &:not(:last-child) {
        border-right: 1px solid var(--color);
        padding-right: 10px;
      }
    }
  }
`;

function BlogCardMini({
  index,
  title,
  publishedOn,
  blogId,
  readsCount,
  author,
}) {
  const { TITLE_MAXLENGTH } = config.UI_ELEMENTS.BLOG.BLOG_CARD;

  const navigate = useNavigate();

  const authorNameRef = useRef(null);

  return (
    <Div_sc2
      className="mini-card"
      onClick={(e) => {
        if (authorNameRef.current) {
          if (!authorNameRef.current.contains(e.target))
            navigate("/blog/" + blogId);
        } else navigate("/blog/" + blogId);
      }}
    >
      {(index || index === 0) && (
        <span className="index">{`${index + 1}`.padStart(2, "0")}</span>
      )}
      <div className="inner">
        <h4>{clipText(title, TITLE_MAXLENGTH)}</h4>

        <div className="info">
          {author && (
            <span
              ref={authorNameRef}
              className="author-name"
              onClick={() => navigate("/user/" + author.userId)}
            >
              {author.name}
            </span>
          )}
          <span className="date-time">{publishedOn}</span>
          <span title="Total Reads">
            <FAIcon icon="book-open-reader" />
            {readsCount}
          </span>
          {/* <span>
            <FAIcon icon="heart" />
            {likesCount}
          </span>
          <span>
            <FAIcon icon="comment" />
            {commentsCount}
          </span> */}
        </div>
      </div>
    </Div_sc2>
  );
}

export default BlogCard;
export { BlogCardMini };
