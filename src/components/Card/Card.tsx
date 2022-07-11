import { FC, memo } from 'react';
import { BASE_URL } from '../../utils/api';
import { Image } from '../UI/Image';
import styles from './Card.module.scss';

interface IImage {
  imageUrl: string;
  name: string;
  authorId: number;
  author: string | undefined;
  created: string;
  locationId: number;
  location: string | undefined;
  id: number;
}

interface ICardProps {
  imgData: IImage;
}

const Card: FC<ICardProps> = (props) => {
  const { imgData } = props;
  const { imageUrl, name, authorId, author, created, locationId, location, id } = imgData;

  return (
    <div className={styles.card}>
      <Image src={`${BASE_URL}${imageUrl}`} alt={name} />
      <div className={styles.infoPainting}>
        <div className={styles.name}>{name}</div>
        <div className={styles.author}>
          <span className={styles.title}>Author:</span>
          <span className={styles.value}>{author}</span>
        </div>
        <div className={styles.created}>
          <span className={styles.title}>Created:</span>
          <span className={styles.value}>{created}</span>
        </div>
        <div className={styles.location}>
          <span className={styles.title}>Location:</span>
          <span className={styles.value}>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Card, (prevProps, nextProps) => prevProps.imgData.id === nextProps.imgData.id);
