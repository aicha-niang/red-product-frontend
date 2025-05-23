// components/Header.tsx
'use client';

import styles from '../styles/Header.module.css';
import Link from 'next/link';


type HeaderProps = {
  onSearchChange?: (value: string) => void;
};

const Header = ({ onSearchChange }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Rechercher..."
        className={styles.search}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
      <div className={styles.icons}>
        <span className={styles.icon}>🔔</span>
        <Link href="/profile" className={styles.icon}>
  👤
</Link>
      </div>
    </header>
  );
};

export default Header;
