// * info: This function adds a prefix to fields and formats data to be used with the MongoDB $set operator when storing object values in the database.
const formatObjectData = async (
  fieldName, // e.g. "profile" or "profile.socialMediaProfiles"
  fieldsObject // e.g. {name: "F-NAME L-NAME", about: "ABOUT ME", image: "IMAGE.JPG"}
) => {
  let formattedObject = {};
  let emptyFieldsObject = {};

  for (const [key, value] of Object.entries(fieldsObject)) {
    if (value === null) {
      delete formattedObject[`${fieldName}.${key}`];
    } else if (value === "") {
      emptyFieldsObject[`${fieldName}.${key}`] = "";
    } else {
      formattedObject[`${fieldName}.${key}`] = value;
    }
  }

  return {
    formattedObject, // use $set operator
    emptyFieldsObject, // use $unset operator
  };
};

module.exports = formatObjectData;
