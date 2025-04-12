import {
  // Atoms
  Center,
  FAIcon,

  // Molecules
  BorderWithText,
  GeneralPlaceholders,
} from "../../config/exports";

function OrphanBlogPlaceholder() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <span>Orphan</span>
      <FAIcon
        icon="user-xmark"
        mods=""
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-2d)",
          borderRadius: "40px",
        }}
      />
    </div>
  );
}

function NoPostPlaceholder() {
  return (
    <GeneralPlaceholders.Button icon="folder-open">
      No Posts Yet.
    </GeneralPlaceholders.Button>
  );
}

function NoMoreResultsPlaceholder() {
  return (
    <Center style={{ height: "30px" }}>
      <BorderWithText
        color="var(--border-color)"
        style={{ color: "var(--color)" }}
      >
        No More Results
        <FAIcon icon="box-open" />
      </BorderWithText>
    </Center>
  );
}

function NoResultsFoundPlaceholder() {
  return (
    <Center style={{ height: "50vh" }}>
      <GeneralPlaceholders.Button icon="folder-open">
        No Results Found
      </GeneralPlaceholders.Button>
    </Center>
  );
}

export {
  OrphanBlogPlaceholder,
  NoPostPlaceholder,
  NoMoreResultsPlaceholder,
  NoResultsFoundPlaceholder,
};
