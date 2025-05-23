// components/Hero.tsx
'use client';
import React from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1>Bienvenue sur RED Product</h1>
      <p>Gérez vos produits et hôtels facilement.</p>
    </section>
  );
};

export default Hero;
