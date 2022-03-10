export const generateId = (array, field='id') => {
  return Math.max(...array.map((item) => item[field])) + 1;
}
