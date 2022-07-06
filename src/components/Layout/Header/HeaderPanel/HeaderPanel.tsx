import { ThemeIcon } from '../../../../assets/icons';
import { useTheme } from '../../../../context/ThemeContext';
import Button from '../../../UI/Button/Button';
import styles from './HeaderPanel.module.scss';

const HeaderPanel = () => {
  const { toggleTheme } = useTheme();
  return (
    <Button classes={styles.toggleBtn} onClick={toggleTheme}>
      <ThemeIcon className={styles.themeIcon} />
    </Button>
  );
};

export default HeaderPanel;
