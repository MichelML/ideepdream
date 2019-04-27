module.exports = function dateSuffix() {
  const date = new Date();

  return (
    "_" +
    date.getDate().toString() +
    "_" +
    date.getMonth().toString() +
    "_" +
    date.getFullYear().toString() +
    "_" +
    date.getTime().toString()
  );
};
