export const getPageCount = (total: number, limit: number) => {
  return Math.ceil(total / limit);
};
