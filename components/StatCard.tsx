// components/StatCard.tsx
'use client';
import Link from 'next/link';
import styles from '../styles/StatCard.module.css';

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  icon: string;
  link: string;
}

const StatCard = ({ title, value, color, icon, link }: StatCardProps) => {
  return (
    <Link href={link} className={styles.linkWrapper}>
      <div className={styles.card} style={{ backgroundColor: color }}>
        <div className={styles.icon}>{icon}</div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </Link>
  );
};

export default StatCard;
