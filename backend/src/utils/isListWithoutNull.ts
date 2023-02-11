export const isListWithoutNull = <T>(list: (T | null)[]): list is T[] => {
  const nullValueFound = list.find((value) => value === null);

  if (nullValueFound) {
    return false;
  }

  return true;
};
