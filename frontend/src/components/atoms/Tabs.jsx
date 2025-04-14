// Node module Imports
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";

import { getCssVarValue } from "@/utils/cssUtils";

const Div_sc = styled.div`
  --tab-header-bottom-border-height: 2px;
  --tab-header-bottom-border-color: var(--border-color);
  --active-tab-bottom-border-color: var(--color);
  --active-tab-font-color: var(--color);
  --tab-header-border-radius: 3px;
  --tab-header-height: 3.5rem;
  --tab-header-zindex: 1;
  --gap-between-scrollbar-tab-header-bottom-border: 5px;

  display: flex;
  flex-direction: column;

  .tab-headers {
    height: var(--tab-header-height);
    display: flex;
    align-items: end;
    gap: 1rem;
    padding: 1rem 1rem var(--gap-between-scrollbar-tab-header-bottom-border)
      1rem;
    position: sticky;
    top: 0;
    background: var(--background-color);
    z-index: var(--tab-header-zindex);
    word-wrap: nowrap;
    text-wrap: nowrap;
    white-space: nowrap;
    overflow-x: auto;

    &::before {
      content: "";
      width: 99%;
      height: var(--tab-header-bottom-border-height);
      margin: auto;
      position: absolute;
      bottom: var(--gap-between-scrollbar-tab-header-bottom-border);
      left: 0;
      right: 0;
      background: var(--tab-header-bottom-border-color);
      border-radius: var(--tab-header-border-radius);
    }

    .tab-button {
      padding-bottom: 10px;
      position: relative;
      letter-spacing: 1;
      cursor: pointer;
      color: var(--color2);

      &::before {
        content: "";
        position: absolute;
        width: 0;
        height: var(--tab-header-bottom-border-height);
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
        transition:
          width 0.4s,
          background 0.4s;
      }

      &.active {
        font-weight: bold;

        &::before {
          width: 100%;
          background: var(--active-tab-bottom-border-color);
          color: var(--active-tab-font-color);
        }

        & > * {
          color: var(--active-tab-font-color);
        }
      }
    }
  }

  .tab-element {
    min-height: 75vh; // Prevents swipe issues (even with less content)
  }

  @media screen and (max-width: ${() =>
      getCssVarValue("--navbar-mutation-breakpoint")}) {
    .tab-headers {
      top: var(--padding-top); // fixed-top search-bar
    }
  }
`;

function Tabs({ tabs, initTabNumber = 1 }) {
  const [activeTab, setActiveTab] = useState(tabs[initTabNumber - 1].id);

  useEffect(() => window.scrollTo(0, 0), [activeTab]);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleSwipe = (direction) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    let newIndex;

    if (direction === "left" && currentIndex < tabs.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "right" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex !== undefined) {
      setActiveTab(tabs[newIndex].id);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
  });

  return (
    <Div_sc>
      <div className="secondary-scrollbar tab-headers">
        {tabs.map(({ id, label }) => (
          <span
            key={id}
            className={`tab-button ${activeTab === id ? "active" : ""}`}
            onClick={() => handleTabClick(id)}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="tab-element" {...swipeHandlers}>
        {tabs.map(({ id, element }) =>
          activeTab === id ? (
            <div key={id} className="tab-panel">
              {element}
            </div>
          ) : null,
        )}
      </div>
    </Div_sc>
  );
}

export default Tabs;
