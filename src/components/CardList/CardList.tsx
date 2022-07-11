import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import {
  useAppDispatch,
  useAppSelector,
  useAxiosFetch,
  useDebounce,
  usePagination,
} from '../../hooks';
import {
  fetchPaintings,
  IAuthor,
  ILocation,
  selectPaintings,
} from '../../store/slices/paintingsSlice';
import { fwtService } from '../../utils/fwtService';
import { getPageCount } from '../../utils/pages';
import { useTheme } from '../../context/ThemeContext';
import { Select, Range, Input } from 'fwt-internship-uikit';
import { Card } from '../Card';
import Button from '../UI/Button/Button';
import {
  LeftArrowIcon,
  LeftDoubleArrowIcon,
  RightArrowIcon,
  RightDoubleArrowIcon,
} from '../../assets/icons';
import 'fwt-internship-uikit/dist/index.css';
import styles from './CardList.module.scss';

const CardList = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useTheme();

  const paintings = useAppSelector(selectPaintings);
  const [authors, setAuthors] = useState<IAuthor[] | null>(null);
  const [locations, setLocations] = useState<ILocation[] | null>(null);
  const { total: totalPages } = paintings;
  const isLoading = paintings.isLoading;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const totalCount = useMemo(() => getPageCount(totalPages, limit), [totalPages, limit]);
  let pagesArray = usePagination(totalCount);

  const preparePaintings = useMemo(
    () =>
      paintings.values?.map((paint) => {
        const { authorId, locationId } = paint;
        return {
          ...paint,
          author: authors?.find(({ id }) => id === authorId)?.name,
          location: locations?.find(({ id }) => id === locationId)?.location,
        };
      }),
    [paintings, authors, locations],
  );

  const [valueCreatedFrom, setValueCreatedFrom] = useQueryParam('createdFrom', StringParam);
  const [valueCreatedBefore, setValueCreatedBefore] = useQueryParam('createdBefore', StringParam);
  const [inputValueCreatedFrom, setInputValueCreatedFrom] = useState('');
  const [inputValueCreatedBefore, setInputValueCreatedBefore] = useState('');
  const [paintingName, setPaintingName] = useQueryParam('paintingName', StringParam);
  const [authorName, setAuthorName] = useQueryParam('authorName', StringParam);
  const [locationName, setLocationName] = useQueryParam('locationName', StringParam);
  const debouncedCreatedFrom = useDebounce(setValueCreatedFrom, 500);
  const debouncedCreatedBefore = useDebounce(setValueCreatedBefore, 500);

  const optionsPaintings = useAxiosFetch(fwtService.getPaintings)?.data;
  const optionsAuthors = authors;
  const optionsLocations = locations?.map(({ id, location }) => ({
    id,
    name: location,
  }));

  const paramsCallback = useCallback(() => {
    return {
      _page: page,
      _limit: limit,
      authorId: optionsAuthors?.find(({ name }) => name === authorName)?.id,
      locationId: optionsLocations?.find(({ name }) => name === locationName)?.id,
      id: optionsPaintings?.find(({ name }) => name === paintingName)?.id,
      created_gte: valueCreatedFrom,
      created_lte: valueCreatedBefore,
    };
  }, [page, limit, authorName, locationName, paintingName, valueCreatedFrom, valueCreatedBefore]);

  useLayoutEffect(() => {
    Promise.all([
      fwtService.getPaintings(),
      fwtService.getAuthors(),
      fwtService.getLocations(),
    ]).then((value) => {
      const [{ data: paintings }, { data: authors }, { data: locations }] = value;
      setAuthors(authors);
      setLocations(locations);
      dispatch(
        fetchPaintings({
          _page: page,
          _limit: limit,
          id: paintings.find(({ name }: { name: string }) => name === paintingName)?.id,
          authorId: authors.find(({ name }: { name: string }) => name === authorName)?.id,
          locationId: locations.find(
            ({ location }: { location: string }) => location === locationName,
          )?.id,
          created_gte: valueCreatedFrom,
          created_lte: valueCreatedBefore,
        }),
      );
    });
  }, []);

  useEffect(() => {
    dispatch(fetchPaintings(paramsCallback()));
  }, [page, limit, authorName, locationName, paintingName, valueCreatedFrom, valueCreatedBefore]);

  useEffect(() => {
    const placeholderSelectName = document.querySelector('.selectName span');
    const placeholderSelectAuthor = document.querySelector('.selectAuthor span');
    const placeholderSelectLocation = document.querySelector('.selectLocation span');
    const placeholderSelectCreated = document.querySelector('.Range span');

    placeholderSelectName!.textContent = paintingName
      ? (placeholderSelectAuthor!.textContent = `${paintingName}`)
      : 'Name';
    authorName
      ? (placeholderSelectAuthor!.textContent = `${authorName}`)
      : (placeholderSelectAuthor!.textContent = 'Author');
    locationName
      ? (placeholderSelectLocation!.textContent = `${locationName}`)
      : (placeholderSelectLocation!.textContent = 'Location');

    placeholderSelectCreated!.textContent = 'Created';
  }, []);

  return (
    <div className={styles.cardList}>
      <div className={styles.filters}>
        <Select
          className="selectName"
          disabled={false}
          options={optionsPaintings ?? []}
          isDarkTheme={isDark}
          value={paintingName ?? ''}
          onChange={(name) => {
            setPaintingName(name);
            setPage(1);
          }}
        />

        <Select
          className="selectAuthor"
          disabled={false}
          options={optionsAuthors ?? []}
          isDarkTheme={isDark}
          value={authorName ?? ''}
          onChange={(name) => {
            setAuthorName(name);
            setPage(1);
          }}
        />
        <Select
          className="selectLocation"
          disabled={false}
          options={optionsLocations ?? []}
          isDarkTheme={isDark}
          value={locationName ?? ''}
          onChange={(name) => {
            setLocationName(name);
            setPage(1);
          }}
        />
        {/* @ts-ignore */}
        <Range className="Range" isDarkTheme={isDark} onClose={() => null}>
          <Input
            placeholder="from"
            isDarkTheme={isDark}
            value={inputValueCreatedFrom}
            onChange={(e) => {
              setPage(1);
              setInputValueCreatedFrom(e.target.value);
              debouncedCreatedFrom(e.target.value !== '' ? e.target.value : undefined);
            }}
            className={styles.input}
          />
          <p style={{ margin: '0px 10px' }}>&mdash;</p>
          <Input
            placeholder="before"
            isDarkTheme={isDark}
            value={inputValueCreatedBefore}
            onChange={(e) => {
              setPage(1);
              setInputValueCreatedBefore(e.target.value);
              debouncedCreatedBefore(e.target.value !== '' ? e.target.value : undefined);
            }}
            className={styles.input}
          />
        </Range>
      </div>

      <div className={styles.cards}>
        {isLoading && <div> Загрузка...</div>}
        {!isLoading && paintings.values && paintings.total === 0 && <div>Таких картин нет</div>}
        {!isLoading &&
          paintings.values &&
          paintings.values.length > 0 &&
          preparePaintings?.map((paint) => <Card key={paint?.id} imgData={paint} />)}
      </div>
      {!!paintings.total && (
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
                  key={pageItem}
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
      )}
    </div>
  );
};

export default CardList;
