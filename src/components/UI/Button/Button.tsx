import cn from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
  children?: ReactNode;
  classes?: string;
  onClick: () => void;
  active?: boolean;
  filled?: boolean;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({ children, classes, onClick, active, filled, disabled }) => {
  return (
    <button
      id="btn"
      className={cn(styles.button, classes, {
        [styles.filled]: filled,
        [styles.active]: active,
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
