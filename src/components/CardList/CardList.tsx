import { useEffect, useMemo, useState } from 'react';
import {
  LeftArrowIcon,
  LeftDoubleArrowIcon,
  RightArrowIcon,
  RightDoubleArrowIcon,
} from '../../assets/icons';
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
  const [limit, setLimit] = useState(8);
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
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    dispatch(fetchPaintings({ _page: page, _limit: limit }));
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
        <div
          className={styles.wrapper}
          style={{ gridTemplateColumns: `repeat(${totalCount + 4}, 1fr)` }}
        >
          <Button
            classes={styles.firstPageBtn}
            disabled={page === 1}
            onClick={() => {
              setPage(1);
            }}
          >
            <LeftDoubleArrowIcon />
          </Button>
          <Button
            classes={styles.prevPageBtn}
            disabled={page === 1}
            onClick={() => {
              setPage((prevPage) => --prevPage);
            }}
          >
            <LeftArrowIcon />
          </Button>
          {pagesArray.length > 0 &&
            pagesArray.map((pageItem) => (
              <Button
                active={pageItem === page}
                onClick={() => {
                  setPage(pageItem);
                }}
              >
                {pageItem}
              </Button>
            ))}
          <Button
            classes={styles.nextPageBtn}
            disabled={page === totalCount}
            onClick={() => {
              setPage((prevPage) => ++prevPage);
            }}
          >
            <RightArrowIcon />
          </Button>
          <Button
            classes={styles.lastPageBtn}
            disabled={page === totalCount}
            onClick={() => {
              setPage(totalCount);
            }}
          >
            <RightDoubleArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardList;
