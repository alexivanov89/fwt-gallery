import { FC } from 'react';
import { BASE_URL } from '../../utils/api';
import { Image } from '../UI/Image';
import styles from './Card.module.scss';

interface IImage {
  imageUrl: string;
  name: string;
  authorId: number;
  author: string;
  created: string;
  locationId: number;
  location: string;
}

interface ICardProps {
  imgData: IImage;
}

const Card: FC<ICardProps> = (props) => {
  const { imgData } = props;
  const { imageUrl, name, authorId, author, created, locationId, location } = imgData;

  return (
    <div className={styles.card}>
      <Image src={`${BASE_URL}${imageUrl}`} alt={name} />
      <div className={styles.infoPainting}>
        <div className={styles.name}>{name}</div>
        <div className={styles.author}>{author}</div>
        <div className={styles.created}>{created}</div>
        <div className={styles.location}>{location}</div>
      </div>
    </div>
  );
};

export default Card;
