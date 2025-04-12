// Node module Imports
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  // Atoms
  Anchor,
  BorderX,
  FAIcon,

  // Molecules
  LogoMini,
  NavMenu,
  SocialMediaIconButton,
  ToggleModeCircle,
  // constant
  landingPageBGAttribution,
} from "../../config/exports";

function NavMenu_mod({ icon, children, link }) {
  return (
    <NavMenu
      icon={<FAIcon icon={icon} />}
      link={link}
      style={{
        width: "fit-content",
        fontSize: "0.9rem",
      }}
      color="var(--color)"
    >
      {children}
    </NavMenu>
  );
}

function Attribution_internal({ attribution }) {
  return (
    <Anchor
      href={attribution.link}
      style={{
        fontSize: "0.8rem",
        maxWidth: "250px",
        background: "var(--color-2d)",
        padding: "5px",
      }}
    >
      {attribution.text}
    </Anchor>
  );
}

const Div_sc = styled.div`
  flex: 1 1 0;
  min-width: 250px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0.8rem;
  /* background: var(--border-color); */
  box-shadow: inset 0 0 0 3px var(--border-color);
  /* border-radius: 5px; */

  & > h3 {
    text-wrap: nowrap;
    word-wrap: nowrap;
    white-space: nowrap;
    letter-spacing: 1;
  }

  & > ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

function Section_internal({ title, icon, items, style }) {
  return (
    <Div_sc>
      <h3>
        {title}&nbsp;{icon}
      </h3>
      <ul style={style}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Div_sc>
  );
}

const SectionTag_sc = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: var(--background-color);

  .main {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.8rem;
    padding: 2rem;
    position: relative;

    .logo {
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--theme-color);
      /* border-radius: 5px; */
    }
  }

  .copyright {
    text-align: center;
    font-family: var(--font-family_light);
    margin-block: 10px;
    color: var(--color2);
    font-size: 0.8rem;
  }

  @media screen and (min-width: 1024px) {
    .main {
      padding: 5rem;
    }
  }
`;

function Footer() {
  const navigationsSection = {
    title: "NAVIGATIONS",
    icon: <FAIcon icon="arrow-up-right-from-square" />,
    items: [
      <NavMenu_mod key={0} icon="home" link="/">
        HOME
      </NavMenu_mod>,
      <NavMenu_mod key={1} icon="feather-pointed" link="/write">
        WRITE
      </NavMenu_mod>,
    ],
  };

  const socialMediasSection = {
    title: "SOCIAL MEDIA LINKS",
    icon: <FAIcon icon="link" />,
    items: [
      <SocialMediaIconButton key={0} icon="instagram" link="">
        instagram
      </SocialMediaIconButton>,
      <SocialMediaIconButton key={1} icon="facebook" link="">
        facebook
      </SocialMediaIconButton>,
      <SocialMediaIconButton key={2} icon="github" link="">
        github
      </SocialMediaIconButton>,
    ],
  };

  const attributionsSection = {
    title: "ATTRIBUTIONS",
    icon: <FAIcon type="brands" icon="creative-commons-by" mods="" />,
    items: [
      <Attribution_internal key={0} attribution={landingPageBGAttribution} />,
    ],
  };

  return (
    <SectionTag_sc>
      <BorderX
        color="var(--border-color)"
        width="98%"
        style={{ alignSelf: "center" }}
      />

      <div className="main">
        <Link className="logo" to="/">
          <LogoMini
            color={{
              text: "var(--color)",
              circle: "var(--background-color)",
            }}
          />
        </Link>

        <Section_internal
          title={navigationsSection.title}
          icon={navigationsSection.icon}
          items={navigationsSection.items}
        />

        <Section_internal
          title={socialMediasSection.title}
          icon={socialMediasSection.icon}
          items={socialMediasSection.items}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: "15px" }}
        />

        <Section_internal
          title={attributionsSection.title}
          icon={attributionsSection.icon}
          items={attributionsSection.items}
        />

        <ToggleModeCircle
          key={10}
          style={{ position: "absolute", bottom: "20px", right: "2rem" }}
        />
      </div>

      <BorderX
        color="var(--border-color)"
        width="80%"
        style={{ alignSelf: "center" }}
      />

      <span className="copyright">
        &copy; {new Date().getFullYear()} GLOB BLOG. All rights reserved.
      </span>
    </SectionTag_sc>
  );
}

export default Footer;
