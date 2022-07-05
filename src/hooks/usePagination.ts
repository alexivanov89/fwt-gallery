import { useMemo } from 'react';

export const usePagination = (totalPages: number) => {
  return useMemo(() => {
    let result = [];
    for (let index = 0; index < totalPages; index++) {
      result.push(index + 1);
    }
    return result;
  }, [totalPages]);
};
