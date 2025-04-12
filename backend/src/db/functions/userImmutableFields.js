// * info: This method sends an error message when the user specifies an immutable field (without { immutable: true } in the schema) in the request.
const userImmutableFields = (
  unnecessaryFields // e.g. [{field: postsCount, name: "postsCount"}, {field: readsCount, name: "readsCount"}]
) => {
  const unnecessaryFieldsFiltered = unnecessaryFields
    .filter(({ field }) => field || field === 0 || field === "")
    .map(({ name }) => name);

  if (unnecessaryFieldsFiltered.length) {
    const plural = unnecessaryFieldsFiltered.length > 1;
    const text = {
      fieldText: plural ? "fields are" : "field is",
      removeText: plural ? "those fields" : "that field",
    }; // corresponding-text-formation

    const message = `The following ${
      text.fieldText
    } immutable: ${unnecessaryFieldsFiltered.join(", ")}. Please remove ${
      text.removeText
    }.`;

    return message;
  }

  return null;
};

module.exports = userImmutableFields;
