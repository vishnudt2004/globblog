// Node module Imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  // Molecules
  Form,
  InfoModal,
  GeneralPlaceholders,
  // inputs
  ContentInput,
  CoverImageInput,
  DiscardButton_enhancer,
  SubmitButton,
  SummaryInput,
  TagsInput,
  TitleInput,

  // Organisms
  ResultPage,

  // Templates
  HorizontallyCenteredLayout,

  // Hooks
  useInterval,
  useLocalStorage,

  // Contexts
  useMessage,
  usePreLoader,

  // APIs
  blogApis,

  // Utilities
  filterTruthElements,

  // Helpers
  formatBlogCoverImageUrl,
} from "../../config/exports";

function TipsModal_internal() {
  const { title, tips } = messages.BLOG.BLOG_WRITING_TIPS;

  const [visibleTipsModal, setVisibleTipsModal] = useState(false);

  const pointColours = [
    "orangered",
    "dodgerblue",
    "deeppink",
    "seagreen",
    "darkred",
    "darkblue",
    "green",
  ];

  return (
    <>
      <Button
        type="secondary"
        color="var(--info-color)"
        icon={<FAIcon icon="feather-pointed" />}
        iconPosition="right"
        radius="50px"
        style={{
          fontFamily: "var(--font-family_medium)",
          width: "fit-content",
          marginLeft: "1rem",
        }}
        onClick={() => setVisibleTipsModal(true)}
      >
        {title}
      </Button>

      <InfoModal visible={visibleTipsModal} setVisible={setVisibleTipsModal}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <GeneralPlaceholders.Text icon="feather-pointed">
            {title}
          </GeneralPlaceholders.Text>
          <ol
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingLeft: "10px",
            }}
          >
            {tips.map((tip, index) => {
              const clipped = tip.split(":");
              const label = clipped[0];
              const desc = clipped[1];

              return (
                <li key={index}>
                  {label && (
                    <Highlighter
                      fancy
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
    </>
  );
}

const cleanHTML_internal = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  if (tempDiv.innerText.trim() === "") {
    return "";
  }
  return html;
};

function Inputs_internal({
  onChange,
  onChange_quill,
  onFileChange,
  onChange_tags,
  charsCount: { titleCount, summaryCount },
  formData: { title, content, summary, image, tags },
}) {
  const {
    TITLE_MINLENGTH,
    TITLE_MAXLENGTH,
    SUMMARY_MINLENGTH,
    SUMMARY_MAXLENGTH,
  } = config.UI_ELEMENTS.BLOG.EDITOR_FORM;

  return (
    <>
      <label htmlFor="title">BLOG TITLE</label>
      <TitleInput
        minLength={TITLE_MINLENGTH}
        value={title}
        onChange={onChange}
        charsCount={titleCount}
        maxChars={TITLE_MAXLENGTH} // also maxLength
      />

      <CoverImageInput key={image} value={image} onFileChange={onFileChange} />

      <label htmlFor="content">MAIN CONTENT</label>
      <ContentInput
        placeholder="Write the main content of your blog here..."
        required
        name="content"
        id="content"
        value={content}
        onChange={onChange_quill}
      />

      <label htmlFor="summary">BLOG SUMMARY</label>
      <SummaryInput
        minLength={SUMMARY_MINLENGTH}
        value={summary}
        onChange={onChange}
        charsCount={summaryCount}
        maxChars={SUMMARY_MAXLENGTH}
      />

      <label htmlFor="tags">TAGS / KEYWORDS</label>
      <TagsInput value={tags} onChange={onChange_tags} id="tags" />
    </>
  );
}

function SubmitButton_internal({ type }) {
  const { blogId } = useParams();

  const SubmitButton_with_DiscardButton = DiscardButton_enhancer(SubmitButton, {
    navigation: `/blog/${blogId}`,
    buttonText: "DISCARD EDIT",
  });

  return type === "create-blog" ? (
    <SubmitButton icon="paper-plane">PUBLISH BLOG POST</SubmitButton>
  ) : (
    type === "update-blog" && (
      <SubmitButton_with_DiscardButton icon="upload">
        UPDATE BLOG POST
      </SubmitButton_with_DiscardButton>
    )
  );
}

const Form_sc = styled(Form)`
  h1.page-heading {
    align-self: center;
  }

  .inputs-group {
    width: 100%;
    /* max-width: 95vw; */

    & :is(input, textarea) {
      font-size: 1rem !important;

      &::placeholder {
        text-align: left;
      }
    }
  }

  label {
    width: fit-content;
  }
`;

function EditorForm({
  type, // create-blog, update-blog
}) {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const showMessage = useMessage();
  const showPreLoader = usePreLoader();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    image: null,
    tags: [],
  });
  const { AUTOSAVE_INTERVAL: autoSaveInterval } = config.BLOG;

  const [charsCount, setCharsCount] = useState({
    titleCount: 0,
    summaryCount: 0,
  });
  const [result, setResult] = useState(null);

  const [lsData, setLSData, removeLSData] = useLocalStorage("post-data", {});

  useInterval(
    () => {
      const { image, content, tags, ...rest } = formData; // eslint-disable-line
      const autoSaveData = {
        ...(tags && !!tags.length && { tags }),
        ...rest,
        content: cleanHTML_internal(content),
      };
      setLSData(autoSaveData);
    },
    autoSaveInterval,
    type === "create-blog"
  );

  useEffect(() => {
    if (type === "create-blog") {
      const autoSavedData = Object.values(lsData);
      if (!autoSavedData.every((val) => !val)) {
        setFormData((p) => ({ ...p, ...lsData }));

        showMessage(
          "info",
          "Your work has been successfully restored from local storage."
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchBlog = async () => {
      showPreLoader(true);

      const apiData = await blogApis.getBlog({ blogId });

      const { status, message, result: apiResult = {} } = apiData || {};

      const {
        title = "",
        content = "",
        summary = "",
        image = null,
        tags = [],
      } = apiResult?.blog || {};

      setResult({ status, message });

      setFormData({
        title,
        content,
        summary,
        image: formatBlogCoverImageUrl(image),
        tags,
      });

      setCharsCount({
        titleCount: title.length,
        summaryCount: summary.length,
      });

      showPreLoader(false);
    };

    if (type === "update-blog") {
      fetchBlog();
    }
  }, [showPreLoader, type, blogId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (name === "title" || name === "summary") {
      setCharsCount((p) => ({
        ...p,
        [`${name}Count`]: value.length,
      }));
    }
  };

  const handleInputChange_quill = (content) =>
    setFormData((p) => ({ ...p, content }));

  const handleInputChange_coverImage = (image) =>
    setFormData((p) => ({ ...p, image }));

  const handleInputChange_tags = (tags) => {
    setFormData((p) => ({ ...p, tags }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    showPreLoader(true);

    const contentRequired = cleanHTML_internal(formData?.content).length;

    if (!contentRequired) {
      showPreLoader(false);

      showMessage("error", "Please write some content...");
      return;
    }

    const data = filterTruthElements(formData);

    const apiData =
      type === "create-blog"
        ? await blogApis.createBlog({ formData: data })
        : type === "update-blog" &&
          (await blogApis.updateBlog({
            type: "update",
            blogId,
            formData: data,
          }));

    const { status, message, result } = apiData || {};

    showMessage(status, message);

    if (status === "success") {
      if (type === "create-blog") {
        removeLSData();
        setFormData({
          title: "",
          content: "",
          summary: "",
          image: null,
          tags: [],
        });
        navigate(`/blog/${result?.createdBlog?._id}`);
      } else if (type === "update-blog") {
        setFormData({
          title: "",
          content: "",
          summary: "",
          image: null,
          tags: [],
        });
        navigate(`/blog/${blogId}`);
      }
    }

    showPreLoader(false);
  };

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
    <HorizontallyCenteredLayout
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "1rem",
      }}
    >
      <Form_sc onSubmit={handleFormSubmit}>
        <h1 className="page-heading">WRITE</h1>

        <div className="inputs-group">
          <Inputs_internal
            onChange={handleInputChange}
            onChange_quill={handleInputChange_quill}
            onFileChange={handleInputChange_coverImage}
            onChange_tags={handleInputChange_tags}
            charsCount={charsCount}
            formData={formData}
          />
        </div>

        <SubmitButton_internal type={type} />
      </Form_sc>

      <BorderX width="95%" style={{ margin: "auto" }} />

      <TipsModal_internal />
    </HorizontallyCenteredLayout>
  );
}

export default EditorForm;
