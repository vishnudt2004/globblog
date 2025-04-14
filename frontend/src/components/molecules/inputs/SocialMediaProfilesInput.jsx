// Node module Imports
import { useState } from "react";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import Anchor from "@/components/atoms/Anchor";
import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";
import Modal from "@/components/atoms/Modal";
import GeneralPlaceholders from "@/components/molecules/GeneralPlaceholders";
import { useMessage } from "@/contexts/MessageContext";

const {
  PREDEFINED_PLATFORMS,
  USER: { SOCIALMEDIAPROFILES_MAXCOUNT },
} = config.UI_ELEMENTS;

const predefinedPlatforms = PREDEFINED_PLATFORMS.map(
  ({ platform }) => platform,
);

const Div_sc = styled.div`
  width: 450px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .inner-container {
    &,
    .inputs-container {
      display: flex;
      gap: 5px;
    }

    .inputs-container {
      flex-wrap: wrap;

      input {
        &::placeholder {
          text-align: left;
        }
      }
    }

    .fa-plus {
      flex: 0 0 30px;
      height: 30px;
      display: grid;
      place-items: center;
      background: var(--info-color);
      color: #fff;
      cursor: pointer;
    }
  }

  ol {
    list-style-type: none;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);

    li {
      display: flex;
      align-items: center;
      gap: 10px;

      &:not(:last-child) {
        padding-bottom: 10px;
        border-bottom: 1px solid var(--border-color);
      }

      a {
      }

      span {
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        background: var(--color-2d);
        border-radius: 25px;
      }

      & > i {
        width: 20px;
        height: 20px;
        display: grid;
        place-items: center;
        border-radius: 20px;
        background: var(--color-2d);
        cursor: pointer;
      }
    }
  }
`;

const SocialMediaProfilesInput = ({
  maxProfiles = SOCIALMEDIAPROFILES_MAXCOUNT,
  value,
  onChange,
}) => {
  const showMessage = useMessage();

  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

  const validateSocialMediaProfiles = (url) =>
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
      url,
    );

  const handleAddProfile = () => {
    if (
      predefinedPlatforms
        .map((platform) => platform.toLowerCase())
        .includes(platform.toLowerCase()) &&
      validateSocialMediaProfiles(link)
    ) {
      const newProfiles = { ...value, [platform.toLowerCase()]: link };
      if (
        Object.values(newProfiles).filter((val) => val !== "").length <=
        maxProfiles
      ) {
        onChange(newProfiles);
        setPlatform("");
        setLink("");
      } else {
        showMessage(
          "error",
          `You can only add up to ${maxProfiles} platforms.`,
        );
      }
    } else {
      showMessage("error", "Please enter a valid platform and URL.");
    }
  };

  const handleRemoveProfile = (platformToRemove) => {
    const updatedProfiles = { ...value };
    updatedProfiles[platformToRemove] = "";
    onChange(updatedProfiles);
  };

  // const handleMoveProfile = (platformToMove, direction) => {
  //   const platformsArray = Object.entries(value);
  //   const index = platformsArray.findIndex(
  //     ([platform]) => platform === platformToMove
  //   );

  //   if (index === -1) return;

  //   const swapIndex = direction === "up" ? index - 1 : index + 1;

  //   if (swapIndex < 0 || swapIndex >= platformsArray.length) return;

  //   [platformsArray[index], platformsArray[swapIndex]] = [
  //     platformsArray[swapIndex],
  //     platformsArray[index],
  //   ];

  //   const newProfiles = Object.fromEntries(platformsArray);
  //   onChange(newProfiles);
  // };

  return (
    <Div_sc>
      <h3>SOCIAL MEDIA PROFILES</h3>

      <div className="inner-container">
        <div className="inputs-container">
          <Input
            width="200px"
            height="30px"
            placeholder="Platform Name"
            icon={<FAIcon icon="star" mods="xs" />}
            style={{ flex: "1 1 0" }}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
          <Input
            width="200px"
            height="30px"
            placeholder="Profile Link"
            icon={<FAIcon icon="link" mods="xs" />}
            style={{ flex: "1 1 0" }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <FAIcon icon="plus" onClick={handleAddProfile} />
      </div>

      <ol>
        {Object.entries(value).map(([platform, link], index) => {
          const pf = predefinedPlatforms.find(
            (pf) => pf.toLowerCase() === platform.toLowerCase(),
          );

          return (
            link !== "" && (
              <li key={platform}>
                <span>{index + 1}</span>
                <Anchor href={link} style={{ flexGrow: 1 }}>
                  {pf}
                </Anchor>
                {/* <FAIcon
                  icon="arrow-up"
                  onClick={() => handleMoveProfile(platform, "up")}
                />
                <FAIcon
                  icon="arrow-down"
                  onClick={() => handleMoveProfile(platform, "down")}
                /> */}
                <FAIcon
                  icon="xmark"
                  mods=""
                  onClick={() => handleRemoveProfile(platform)}
                />
              </li>
            )
          );
        })}
      </ol>

      <Button
        color="var(--success-color)"
        style={{ width: "fit-content", fontSize: "0.8rem" }}
        icon={<FAIcon icon="shapes" />}
        iconPosition="right"
        onClick={() => setVisibleModal(true)}
      >
        Supported Platforms
      </Button>

      <Modal visible={visibleModal} setVisible={setVisibleModal}>
        <GeneralPlaceholders.Text icon="shapes">
          Supported Platforms
        </GeneralPlaceholders.Text>
        <div
          style={{
            padding: "10px",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {predefinedPlatforms.map((platform) => (
            <GeneralPlaceholders.Button
              key={platform}
              radius="30px"
              style={{
                height: "25px",
                fontSize: "0.8rem",
                color: "var(--color)",
                pointerEvents: "none",
              }}
              iconType="brands"
              icon={platform.toLowerCase()}
            >
              {platform}
            </GeneralPlaceholders.Button>
          ))}
        </div>
      </Modal>
    </Div_sc>
  );
};

export default SocialMediaProfilesInput;
