export const removeEmptySearchParam = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};
