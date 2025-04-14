// Node module Imports
import { Fragment } from "react";
import styled from "styled-components";

import { BorderX } from "@/components/atoms/Border";
import BlogCard, { BlogCardMini } from "@/components/molecules/BlogCard";

const Div_sc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: 1rem;
`;

function BlogList({
  blogs,
  miniCards,
  ...blogCard_props // mainly for withUserCard, mutationBreakpoints
}) {
  return (
    <Div_sc>
      {blogs?.map(
        (
          { _id, title, image, summary, createdAt, author, orphan, readsCount },
          index,
        ) => {
          const profile = author?.profile || null;
          return (
            <Fragment key={index}>
              {!miniCards ? (
                <BlogCard
                  image={image}
                  title={title}
                  summary={summary}
                  publishedOn={createdAt}
                  author={
                    author
                      ? {
                          name: profile?.name,
                          image: profile?.image,
                          userId: author._id,
                        }
                      : null
                  }
                  orphan={orphan}
                  blogId={_id}
                  readsCount={readsCount}
                  {...blogCard_props}
                />
              ) : (
                <BlogCardMini
                  index={index < 5 && index}
                  title={title}
                  publishedOn={createdAt}
                  author={
                    author
                      ? {
                          name: profile?.name,
                          userId: author._id,
                        }
                      : null
                  }
                  blogId={_id}
                  readsCount={readsCount}
                  {...blogCard_props}
                />
              )}
              {index !== blogs.length - 1 && (
                <BorderX width="100%" height="1px" />
              )}
            </Fragment>
          );
        },
      )}
    </Div_sc>
  );
}

export default BlogList;
