exports.convertNumberLessThanTen = (number) => {
  if (+number >= 10) return number;
  else return `0${number}`;
};
