const RequirementNorma = {
  id: Number,
  chapter: String,
  sub_chapter: String,
  requirement: String,
  topic: String,
  type: String,
  note: String,
  images: String,
};

module.exports = function () {
  return { ...RequirementNorma };
};
