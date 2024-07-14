function removeElementFromArray(element, array) {
  return array.filter((item) => item !== element);
}

function getNameByNumber(num) {
  // eslint-disable-next-line default-case
  switch (num) {
    case 1:
      return "First";
    case 2:
      return "Second";
    case 3:
      return "Third";
    case 4:
      return "Fourth";
  }
}

export { removeElementFromArray, getNameByNumber };
