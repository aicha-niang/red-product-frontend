// components/ProductCard.tsx
'use client';
import React from 'react';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProductCard;
