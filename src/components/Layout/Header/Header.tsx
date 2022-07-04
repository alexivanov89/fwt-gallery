import { HeaderPanel } from './HeaderPanel';
import { Logo } from './Logo';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <HeaderPanel />
    </header>
  );
};

export default Header;
