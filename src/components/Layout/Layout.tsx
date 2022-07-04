import { FC, ReactNode } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { Header } from './Header';
import styles from './Layout.module.scss';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
