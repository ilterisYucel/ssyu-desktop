import moment from "moment";

const isTrue = (value) => {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
};

const isFalse = (value) => {
  switch (value) {
    case false:
    case "false":
    case 0:
    case "0":
    case "off":
    case "no":
      return true;
    default:
      return false;
  }
};

const compareBoolableValues = (value, value1) => {
  return (
    (isFalse(value) && isFalse(value1)) || (isTrue(value) && isTrue(value1))
  );
};

const checkBoolableValue = (value) => {
  return isFalse(value) || isTrue(value);
};

const getCurrentDate = () => {
  const date = new Date();

  return moment(date, "DD/MM/YYYY").toDate();
};

const formatDate = (date) => {
  return moment(date, "DD/MM/YYYY").toDate();
};

const dateFormat = (date) => {
  date = new Date(date);

  return date.toLocaleDateString("tr-Tr", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const dateAddition = (date, duration) => {
  console.log(date);
  console.log(duration);
  return new Date(date.setMonth(date.getMonth() + duration));
};

export {
  isTrue,
  isFalse,
  compareBoolableValues,
  checkBoolableValue,
  getCurrentDate,
  formatDate,
  dateFormat,
  dateAddition,
};
