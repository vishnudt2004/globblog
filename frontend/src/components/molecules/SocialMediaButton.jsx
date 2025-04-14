// Node module Imports
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";
import { checkFAIconLoaded } from "@/utils/cssUtils";
import { capitalize } from "@/utils/jsUtils";

const usualPlatforms = config.UI_ELEMENTS.PREDEFINED_PLATFORMS;

function checkUsualPlatform_internal(platform) {
  const oneOfUsual = usualPlatforms.find(
    (p) => p.platform.toLowerCase() === platform.toLowerCase(),
  );

  const name = oneOfUsual && oneOfUsual.platform;
  const color = oneOfUsual && oneOfUsual.color;
  const icon = oneOfUsual && oneOfUsual?.icon;

  return { name, color, icon };
}

function SocialMediaButton({
  children,
  link,
  color,
  icon,
  radius = "50px",
  ...attr
}) {
  const iconRef = useRef(null);

  const {
    name,
    color: UPColor,
    icon: UPIcon,
  } = checkUsualPlatform_internal(children || "");

  const platformName = name || capitalize(children || "");
  const platformColor = UPColor || color;
  const platformIcon = UPIcon || icon;

  useEffect(() => {
    if (iconRef.current) {
      const iconElement = iconRef.current.querySelector("i");
      if (iconElement) {
        if (!checkFAIconLoaded(iconElement)) {
          iconRef.current.style.display = "none";
        }
      }
    }
  }, []);

  return (
    <a target="_blank" href={link}>
      <Button
        radius={radius}
        color={platformColor}
        icon={
          <span ref={iconRef}>
            <FAIcon type="brands" icon={platformIcon} mods="" />
          </span>
        }
        style={{ color: "#fff" }}
        {...attr}
      >
        {platformName}
      </Button>
    </a>
  );
}

const A_sc = styled.a`
  --hover-color: gray;

  display: inline-block;

  .platform-icon,
  .platform-name {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: var(--color-2d);
    color: var(--color);
    font-size: 1.5rem;
    border-radius: 60px;
    transition: background 0.4s;
  }

  .platform-name {
    font-size: 0.6rem;
    overflow: hidden;
  }

  &:hover {
    .platform-icon,
    .platform-name {
      background: ${({ $color }) => $color};
    }
  }
`;

function SocialMediaIconButton({
  children,
  icon,
  link,
  color = "var(--hover-color)",
}) {
  const [noIcon, setNoIcon] = useState(false);

  const iconRef = useRef(null);

  const {
    name,
    color: UPColor,
    icon: UPIcon,
  } = checkUsualPlatform_internal(children || "");

  const platformName = name || capitalize(children || "");
  const platformColor = UPColor || color;
  const platformIcon = UPIcon || icon;

  useEffect(() => {
    if (iconRef.current) {
      const iconElement = iconRef.current.querySelector("i");
      if (iconElement) {
        if (!checkFAIconLoaded(iconElement)) setNoIcon(true);
        else setNoIcon(false);
      }
    }
  }, [platformIcon]);

  return (
    <A_sc href={link} target="_blank" $color={platformColor}>
      {!noIcon ? (
        <span className="platform-icon" ref={iconRef}>
          <FAIcon icon={platformIcon} type="brands" mods="" />
        </span>
      ) : (
        <span className="platform-name">{platformName}</span>
      )}
    </A_sc>
  );
}

export default SocialMediaButton;
export { SocialMediaIconButton };
