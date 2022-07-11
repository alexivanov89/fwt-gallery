import { FC, useEffect, useRef, useState } from 'react';

interface IImageProps {
  fallback?: any;
  src: string | undefined;
  alt: string;
}

const Image: FC<IImageProps> = ({ fallback, src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgEl = useRef<HTMLImageElement>(null);
  const onImageLoaded = () => setIsLoaded(true);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded);
      return () => imgElCurrent.removeEventListener('load', onImageLoaded);
    }
  }, [imgEl]);

  const onError = () => setImgSrc(undefined);

  return (
    <>
      <div
        style={
          !isLoaded
            ? { display: 'flex', justifyContent: 'center', alignItems: 'center' }
            : { display: 'none' }
        }
      >
        <p>Загрузка</p>
      </div>
      <img
        ref={imgEl}
        src={imgSrc ? imgSrc : fallback}
        alt={alt}
        onError={onError}
        style={isLoaded ? { display: 'inline-block' } : { display: 'none' }}
        {...props}
      />
    </>
  );
};

export default Image;
