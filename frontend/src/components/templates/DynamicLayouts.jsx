// Node module Imports
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import Tabs from "@/components/atoms/Tabs";
import useMediaQuery from "@/hooks/useMediaQuery";
import { getCssVarValue } from "@/utils/cssUtils";

const Div_sc = styled.div`
  max-width: ${({ $width }) => $width};
  margin: auto;

  @media screen and (max-width: 1024px) {
    padding-inline: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding-inline: 0.6rem;
  }

  ${({ style }) =>
    style &&
    css`
      ${style}
    `}
`;

function HorizontallyCenteredLayout({ children, width = "900px", ...attr }) {
  return (
    <Div_sc {...attr} $width={width}>
      {children}
    </Div_sc>
  );
}

// prettier-ignore
const Div_sc2 = styled.div`
  --labels-height: fit-content;
  --labels-zindex: 1;

  width: 100vw;
  display: grid;
  grid-template-columns: ${({ $gridColumns }) => $gridColumns && $gridColumns};
  grid-template-rows: auto;
  gap: 5px;

  & > div:first-child {
    border-right: 1px solid var(--border-color);
  }

  h4.label {
    height: var(--labels-height);
    padding-block: 10px;
    padding-left: 10px;
    position: sticky;
    top: 0;
    z-index: var(--labels-zindex);
    background: var(--background-color);
    border-bottom: 1px solid var(--border-color);
  }

  ${({ $wrapBreakpoint }) =>
    $wrapBreakpoint &&
    css`
      @media screen and (max-width: ${`${$wrapBreakpoint}px`}) {
        grid-template-columns: 1fr;

        & > * {
          grid-column: span 1;
        }

        & > div:first-child {
          border-left: 0;
        }

        h4.label {
          border-top: 1px solid var(--border-color);
        }
      }
    `}

  @media screen and (max-width: ${() => getCssVarValue("--navbar-mutation-breakpoint")}) {
    h4.label {
      top: var(--padding-top); // fixed-top search-bar
    }
  }

  ${({ style }) =>
    style &&
    css`
      ${style}
    `}
`;

function MultiColumnsLayout({
  children,
  columns,
  gridColumns = "repeat(2, 1fr)",
  wrapBreakpoint = 768,
  ...attr
}) {
  return (
    <Div_sc2
      $gridColumns={gridColumns}
      $wrapBreakpoint={wrapBreakpoint}
      {...attr}
    >
      {!children
        ? columns.map(({ label, element }, index) => {
            return (
              <div key={index}>
                <h4 className="label">{label}</h4>
                {element}
              </div>
            );
          })
        : children}
    </Div_sc2>
  );
}

const Div_sc3 = styled.div`
  --labels-height: fit-content;
  --labels-zindex: 1;

  display: flex;
  flex-direction: column;
  gap: 10px;

  h4.label {
    height: var(--labels-height);
    padding-block: 10px;
    padding-left: 10px;
    position: sticky;
    top: 0;
    z-index: var(--labels-zindex);
    background: var(--background-color);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  ${({ style }) =>
    style &&
    css`
      ${style}
    `}
`;

function MultiRowsLayout({ children, rows, ...attr }) {
  return (
    <Div_sc3 {...attr}>
      {!children
        ? rows.map(({ label, element }, index) => {
            return (
              <div key={index}>
                <h4 className="label">{label}</h4>
                {element}
              </div>
            );
          })
        : children}
    </Div_sc3>
  );
}

function DynamicLayout_Tabs$TwoColumns({
  mutation = {
    initialLayout: "tabs", // tabs / two_columns
    breakpoint: 1024,
  },
  elements = {},
  tabs_props = {},
  twoColumns_props = { gridColumns: "1fr 0.5fr" },
}) {
  const {
    element1: { label: label1, element: element1 },
    element2: { label: label2, element: element2 },
  } = elements;
  const { initialLayout, breakpoint } = mutation;

  const breakpointMatched = useMediaQuery(`(min-width: ${breakpoint}px)`);

  const [currentLayout, setCurrentLayout] = useState(null);

  useEffect(() => {
    if (breakpointMatched) {
      setCurrentLayout(
        initialLayout === "tabs"
          ? "two_columns"
          : initialLayout === "two_columns" && "tabs",
      );
    } else setCurrentLayout(initialLayout);
  }, [initialLayout, breakpointMatched]);

  if (currentLayout === "tabs")
    return (
      <Tabs
        tabs={[
          { id: "element1", label: label1, element: element1 },
          { id: "element2", label: label2, element: element2 },
        ]}
        {...tabs_props}
      />
    );
  else if (currentLayout === "two_columns")
    return (
      <MultiColumnsLayout
        wrapBreakpoint={null}
        columns={[
          { label: label1, element: element1 },
          { label: label2, element: element2 },
        ]}
        {...twoColumns_props}
      />
    );
}

export {
  HorizontallyCenteredLayout,
  MultiColumnsLayout,
  MultiRowsLayout,
  DynamicLayout_Tabs$TwoColumns,
};
