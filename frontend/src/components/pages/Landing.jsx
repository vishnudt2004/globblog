// Node module Imports
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import { BorderX } from "@/components/atoms/Border";
import Button from "@/components/atoms/Button";
import Center from "@/components/atoms/Center";
import FAIcon from "@/components/atoms/FAIcon";
import Image from "@/components/atoms/Image";
import ScrollDownButton from "@/components/atoms/ScrollDownButton";
import LandingPageBG from "@/components/molecules/LandingPageBG";
import Logo from "@/components/molecules/Logo";

function Part_internal({ children }) {
  return children;
}

const BorderX_mod = () => (
  <BorderX
    width="80%"
    height="2px"
    color="linear-gradient(45deg, var(--theme-color), var(--color))"
  />
);

const Category_internal = ({ children, icon }) => (
  <Button
    icon={<FAIcon>{icon}</FAIcon>}
    style={{
      flex: "1 1 0",
      padding: "5px 10px",
      whiteSpace: "nowrap",
      boxShadow: "3px 3px 0 0 var(--color)",
    }}
  >
    {children}
  </Button>
);

const Div_sc = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-block: 2.5rem;

  h1 {
    width: 450px;
    max-width: 90vw;
    position: relative;
    font-size: clamp(20px, 2vw, 24px);
    line-height: 2;
    letter-spacing: 1.5;
  }

  @media screen and (max-width: 1000px) {
    h1 {
      order: 2;
    }
  }
`;

Part_internal._1 = function _1() {
  const navigate = useNavigate();

  return (
    <Center
      style={{
        height: "100vh",
        gap: "1rem",
      }}
    >
      <Logo />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link to="/register">
          <Button
            icon={<FAIcon icon="users" />}
            radius="50px"
            style={{ width: "250px" }}
          >
            Let&apos;s Join Us
          </Button>
        </Link>

        <Button
          type="secondary"
          icon={<FAIcon icon="unlock" />}
          radius="50px"
          style={{ width: "250px" }}
          onClick={() => navigate("/")}
        >
          Read Anonymously
        </Button>
      </div>
    </Center>
  );
};

Part_internal._2 = function _2() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Connect with the World</h1>
      <Div_sc>
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            position: "relative",
            fontSize: "3rem",
            color: "#fff",
          }}
        >
          <Image
            className="image"
            width="500px"
            src="/images/landing-page/note-pen.webp"
            style={{ maxWidth: "90vw" }}
          />
          <span
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              background: "linear-gradient(45deg, #0000008d, transparent)",
              padding: "1rem",
            }}
          >
            Write.
            <br />
            Share.
            <br />
            Connect.
          </span>
        </div>

        <h1>
          <div
            className="icons"
            style={{
              fontSize: "2rem",
            }}
          >
            <FAIcon icon="feather-pointed" /> - <FAIcon icon="share-nodes" /> -{" "}
            <FAIcon icon="circle-nodes" />
          </div>
          Embark on a journey of discovery and inspiration, where every page
          unfolds new stories and perspectives.
        </h1>
      </Div_sc>
    </div>
  );
};

Part_internal._3 = function _3() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Share Your Story</h1>
      <Div_sc>
        <h1 style={{ textAlign: "center" }}>
          Share your passions, expertise, and stories with the world.
          Transforming ideas into words, we bring your thoughts to life and
          share them with everyone.
        </h1>
        <div
          style={{
            width: "500px",
            height: "500px",
            maxWidth: "90vw",
            maxHeight: "90vw",
            position: "relative",
            zIndex: 0,
          }}
        >
          <Image
            className="image"
            src="/images/landing-page/light-bulb.webp"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "90%",
              maxWidth: "90%",
            }}
            circle
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "90%",
              height: "90%",
              background: "var(--color-2d)",
              borderRadius: "50%",
              zIndex: -1,
            }}
          />
        </div>
      </Div_sc>
    </div>
  );
};

Part_internal._4 = function _4() {
  const categories = config.UI_ELEMENTS.BLOG.CATEGORIES;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Hundreds of Categories</h1>
      <Div_sc style={{ gap: "15px", width: "90vw" }}>
        {categories.map(({ category, icon }, index) => (
          <Category_internal key={index} icon={icon}>
            {category}
          </Category_internal>
        ))}
      </Div_sc>
    </div>
  );
};

function Landing() {
  const [reverseScroll, setReverseScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      setReverseScroll(documentHeight <= windowHeight + scrollTop);
    };

    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDownClick = () =>
    window.scrollBy({
      behavior: "smooth",
      left: 0,
      top: reverseScroll ? -window.scrollY : window.innerHeight,
    });

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "5rem",
      }}
    >
      <Part_internal._1 /> {/* HERO-main */}
      <BorderX_mod />
      <Part_internal._2 /> {/* HERO-sub */}
      <BorderX_mod />
      <Part_internal._3 /> {/* HERO-sub */}
      <BorderX_mod />
      <Part_internal._4 /> {/* CATEGORIES */}
      <ScrollDownButton
        reverseScroll={reverseScroll}
        onClick={handleScrollDownClick}
      />
      <LandingPageBG />
    </section>
  );
}

export default Landing;
