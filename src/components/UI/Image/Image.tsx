import { FC, useEffect, useState } from 'react';

interface IImageProps {
  fallback?: any;
  src: string | undefined;
  alt: string;
}

const Image: FC<IImageProps> = ({ fallback, src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onError = () => setImgSrc(undefined);
  return <img src={imgSrc ? imgSrc : fallback} alt={alt} onError={onError} {...props} />;
};

export default Image;
