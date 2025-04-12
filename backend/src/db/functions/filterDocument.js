const filterFields = (doc, fields) => {
  const docObj = doc.toObject();
  const filter = {};
  fields.forEach((field) => {
    if (docObj.hasOwnProperty(field)) filter[field] = docObj[field];
  });
  return filter;
};

const removeFields = (doc, fields) => {
  const docObj = doc.toObject();
  fields.forEach((field) => delete docObj[field]);
  return docObj;
};

module.exports = { filterFields, removeFields };
