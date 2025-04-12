// Node module Imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  InfoModal,
  GeneralPlaceholders,
  // inputs
  AboutInput,
  DiscardButton_enhancer,
  EmailInput,
  ProfileImageInput,
  ProfileNameInput,
  SocialMediaProfilesInput,
  SubmitButton,
  UsernameInput,

  // Organisms
  Form,
  ResultPage,

  // Templates
  HorizontallyCenteredLayout,

  // Contexts
  useMessage,
  usePreLoader,

  // APIs
  userApis,

  // Redux - actions
  securityActions,

  // Utilities
  removeElements,

  // Helpers
  formatUserProfileImageUrl,
} from "../../config/exports";

function TipsModal_internal() {
  const { title, tips } = messages.USER.USER_UPDATE_TIPS;

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
        icon={<FAIcon icon="user-tie" />}
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
          <GeneralPlaceholders.Text icon="user-tie">
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

function Inputs_internal({
  onChange,
  onFileChange,
  onProfilesChange,
  charsCount: { aboutCount },
  formData: { username, email, name, about, image, socialMediaProfiles = {} },
}) {
  const { ABOUT_MAXLENGTH } = config.UI_ELEMENTS.USER;

  return (
    <>
      <div className="container">
        <ProfileImageInput value={image} onFileChange={onFileChange} />
        <div className="inputs-group">
          <div className="input">
            <label htmlFor="">USER NAME</label>

            <UsernameInput
              disabled
              placeholder="e.g. John Doe"
              value={username}
            />
          </div>

          <div className="input">
            <label htmlFor="">EMAIL ADDRESS</label>
            <EmailInput
              disabled
              placeholder="e.g. example@email.com"
              value={email}
            />
          </div>

          <div className="input">
            <label htmlFor="">PROFILE NAME</label>

            <ProfileNameInput
              placeholder="e.g. John Doe"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="input">
            <label htmlFor="">ABOUT</label>

            <AboutInput
              value={about}
              onChange={onChange}
              charsCount={aboutCount}
              maxChars={ABOUT_MAXLENGTH}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <SocialMediaProfilesInput
          value={socialMediaProfiles}
          onChange={onProfilesChange}
        />
      </div>
    </>
  );
}

const Form_sc = styled(Form)`
  .inputs-group-container {
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
  }

  .container {
    flex: 1 1 auto;
    padding: 40px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    box-shadow: inset 0 0 0 3px var(--border-color);
  }

  .inputs-group {
    font-size: 0.8rem;
    align-items: center;

    & :is(input, textarea)::placeholder {
      text-align: left;
    }

    .input {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  @media screen and (max-width: 550px) {
    .inputs-group-container {
      gap: 0;
    }

    .container {
      padding: 20px;
      box-shadow: 0 0 0 0;
    }
  }
`;

function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const showMessage = useMessage();
  const showPreLoader = usePreLoader();

  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    about: "",
    image: "", // null causes for store "null" as string in DB.
    socialMediaProfiles: {},
  });
  const [charsCount, setCharsCount] = useState({
    aboutCount: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      showPreLoader(true);

      const apiData = await userApis.getUser({ userId });

      const { status, message, result: apiResult = {} } = apiData || {};

      const {
        username = "",
        email = "",
        profile: {
          name = "",
          about = "",
          image = "",
          socialMediaProfiles = {},
        } = {},
      } = apiResult?.user || {};

      setResult({ status, message });

      setFormData({
        username,
        email,
        name,
        about,
        image: formatUserProfileImageUrl(image),
        socialMediaProfiles,
      });

      setCharsCount({
        aboutCount: about.length,
      });

      showPreLoader(false);
    };

    fetchUser();
  }, [showPreLoader, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (name === "about") setCharsCount({ [`${name}Count`]: value.length });
  };

  const handleInputChange_profileImage = (image) =>
    setFormData((p) => ({ ...p, image }));

  const handleInputChange_smp = (profiles) =>
    setFormData((p) => ({ ...p, socialMediaProfiles: profiles })); // social media profiles input

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    showPreLoader(true);

    const formDataFormatted = removeElements(formData, ["username", "email"]);

    const result = await userApis.updateUser({
      userId,
      formData: formDataFormatted,
    });

    const { status, message } = result || {};

    showMessage(status, message);

    if (status === "success") {
      dispatch(securityActions.getCurrentUser());
      navigate(`/user/${userId}`);
    }

    showPreLoader(false);
  };

  const SubmitButton_with_DiscardButton = DiscardButton_enhancer(SubmitButton, {
    navigation: `/user/${userId}`,
    buttonText: "DISCARD EDIT",
  });

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
      width="100%"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "1rem",
      }}
    >
      <Form_sc onSubmit={handleFormSubmit}>
        <h1 className="page-heading">EDIT PROFILE</h1>

        <div className="inputs-group-container">
          <Inputs_internal
            onChange={handleInputChange}
            onFileChange={handleInputChange_profileImage}
            onProfilesChange={handleInputChange_smp}
            charsCount={charsCount}
            formData={formData}
          />
        </div>
        <SubmitButton_with_DiscardButton icon="upload">
          UPDATE PROFILE
        </SubmitButton_with_DiscardButton>
      </Form_sc>

      <BorderX width="95%" style={{ margin: "auto" }} />

      <TipsModal_internal />
    </HorizontallyCenteredLayout>
  );
}

export default UpdateUser;
