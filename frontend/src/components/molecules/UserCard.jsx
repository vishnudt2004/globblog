// Node module Imports
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import FAIcon from "@/components/atoms/FAIcon";
import Image from "@/components/atoms/Image";
import { SocialMediaIconButton } from "@/components/molecules/SocialMediaButton";
import { cssUnitExtractor } from "@/utils/cssUtils";
import { clipText } from "@/utils/jsUtils";
import { formatUserProfileImageUrl } from "@/helpers/apiHelpers";

function Image_mod({ src, ...attr }) {
  return (
    <Image
      key={src}
      fallback="/images/placeholders/person.png"
      src={src}
      {...attr}
    />
  );
}

const Section_sc = styled.section`
  width: 450px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: auto;
  padding: 0.5rem;
  font-size: 0.9rem;

  & > * {
    padding-bottom: 1.5rem;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  }

  .profile-image-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .about {
    padding-right: 10px;
  }

  .counts {
    display: flex;
    gap: 1.5rem;
  }

  .social-media {
    ul {
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

function UserDetailedCard({
  name,
  about,
  image,
  postsCount,
  readsCount,
  socialMediaProfiles,
  joined,
  ...attr
}) {
  return (
    <Section_sc {...attr}>
      <div className="profile-image-name">
        <Image_mod
          className="image"
          width="120px"
          height="120px"
          src={formatUserProfileImageUrl(image)}
          circle
        />
        <h2 className="name">{name}</h2>
      </div>

      {about && <pre className="about">{about}</pre>}

      <div className="counts">
        <span>
          <FAIcon icon="file-pen" />
          &nbsp; {postsCount} Posts
        </span>
        <span>
          <FAIcon icon="book-open-reader" />
          &nbsp; {readsCount} Reads
        </span>
      </div>

      {socialMediaProfiles && !!Object.values(socialMediaProfiles).length && (
        <div className="social-media">
          <h4 style={{ marginBottom: "10px" }}>Social Media Profiles</h4>

          <ul>
            {Object.entries(socialMediaProfiles).map(([key, value], index) => (
              <li key={index}>
                <SocialMediaIconButton link={value} icon={key.toLowerCase()}>
                  {key}
                </SocialMediaIconButton>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="joined-on">Joined on: {joined}</div>
    </Section_sc>
  );
}

const Div_sc = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  text-align: center;
  transition: background 0.4s;
  font-size: ${({ $size }) => {
    const { value, unit } = cssUnitExtractor($size);
    return `${value / 5}${unit}`;
  }};
  cursor: pointer;
  /* border: 1px solid var(--border-color); */

  &:hover {
    background: var(--color-2d);
  }

  img {
    width: ${({ $size }) => $size} !important;
    height: ${({ $size }) => $size} !important;
  }
`;

function UserCard({
  name,
  image,
  userId,
  size = "100px",
  circleImage = true,
  ...attr
}) {
  const { NAME_MAXLENGTH } = config.UI_ELEMENTS.USER.USERCARD;

  const navigate = useNavigate();

  return (
    <Div_sc $size={size} onClick={() => navigate("/user/" + userId)} {...attr}>
      <Image_mod src={formatUserProfileImageUrl(image)} circle={circleImage} />
      <span>{clipText(name, NAME_MAXLENGTH)}</span>
    </Div_sc>
  );
}

const Span_sc = styled.span`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px;
  transition: background 0.4s;
  word-wrap: nowrap;
  white-space: nowrap;
  cursor: pointer;
  font-size: ${({ $size }) => {
    const { value, unit } = cssUnitExtractor($size);
    return `${parseInt(value / 3)}${unit}`;
  }};

  &:hover {
    background: var(--color-2d);
  }

  img {
    width: ${({ $size }) => $size} !important;
    height: ${({ $size }) => $size} !important;
  }
`;

function UserCardMini({
  name,
  image,
  userId,
  size = "40px",
  circleImage = true,
  ...attr
}) {
  const { NAME_MAXLENGTH } = config.UI_ELEMENTS.USER.USERCARDMINI;

  const navigate = useNavigate();

  return (
    <Span_sc onClick={() => navigate("/user/" + userId)} $size={size} {...attr}>
      {name && <span>{clipText(name, NAME_MAXLENGTH)}</span>}
      <Image_mod src={formatUserProfileImageUrl(image)} circle={circleImage} />
    </Span_sc>
  );
}

export default UserDetailedCard;
export { UserCard, UserCardMini };
