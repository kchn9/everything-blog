const truncate = (str, end) => {
  if (str.length > end) {
    return str.substring(0, end) + "...";
  }
  return str;
};

export default truncate;
