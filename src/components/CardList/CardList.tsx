import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { usePagination } from '../../hooks/usePagination';
import {
  fetchAuthors,
  fetchLocations,
  fetchPaintings,
  selectAuthors,
  selectLocations,
  selectPaintings,
} from '../../store/slices/paintingsSlice';
import { getPageCount } from '../../utils/pages';
import { Card } from '../Card';
import Button from '../UI/Button/Button';
import styles from './CardList.module.scss';

const CardList = () => {
  const dispatch = useAppDispatch();
  const paintings = useAppSelector(selectPaintings);
  const authors = useAppSelector(selectAuthors);
  const locations = useAppSelector(selectLocations);
  const { total: totalPages } = paintings;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalCount = useMemo(() => getPageCount(totalPages, limit), [totalPages, limit]);
  let pagesArray = usePagination(totalCount);
  const preparePaintings = useMemo(
    () =>
      paintings.values.map((paint) => {
        const { authorId, locationId } = paint;
        return {
          ...paint,
          author: authors.values.find(({ id }) => id === authorId)?.name,
          location: locations.values.find(({ id }) => id === locationId)?.location,
        };
      }),
    [paintings, authors, locations],
  );
  useEffect(() => {
    dispatch(fetchPaintings({ _page: page, _limit: limit }));
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [page, limit]);

  const isLoading = paintings.isLoading && authors.isLoading && locations.isLoading;

  return (
    <div className={styles.cardList}>
      <div className={styles.filters}>filters</div>

      <div className={styles.cards}>
        {isLoading && <div> Loading...</div>}
        {!isLoading &&
          paintings.values.length > 0 &&
          preparePaintings.map((paint) => <Card key={paint?.id} imgData={paint} />)}
      </div>
      <div className={styles.pagination}>
        <div className={styles.wrapper}>
          {pagesArray.length > 0 &&
            pagesArray.map((page) => (
              <Button
                onClick={() => {
                  setPage(page);
                }}
              >
                {page}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
