import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchAuthors,
  fetchLocations,
  fetchPaintings,
  selectAuthors,
  selectLocations,
  selectPaintings,
} from '../../store/slices/paintingsSlice';
import { Card } from '../Card';
import styles from './CardList.module.scss';

const CardList = () => {
  const dispatch = useAppDispatch();
  const paintings = useAppSelector(selectPaintings);
  const authors = useAppSelector(selectAuthors);
  const locations = useAppSelector(selectLocations);

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
    dispatch(fetchPaintings());
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, []);

  return (
    <div className={styles.cardList}>
      <div className={styles.filters}>filters</div>

      <div className={styles.list}>
        {paintings.isLoading && authors.isLoading && locations.isLoading && <div> Loading...</div>}
        {paintings.values.length > 0 &&
          preparePaintings.map((paint) => <Card key={paint?.id} imgData={paint} />)}
      </div>
      <div>pagination</div>
    </div>
  );
};

export default CardList;
