// app/components/Navbar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Le bon chemin vers le fichier CSS



const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/login" className={styles.link}>Login</Link>
      <Link href="/register" className={styles.link}>Register</Link>
      <Link href="/forgot-password" className={styles.link}>mot de passe oublié</Link>
      <Link href="/dashboard" className={styles.link}>Dashboard</Link>
      <Link href="/hotels" className={styles.link}>Hotels</Link>
      
      <Link href="/nouveau-hotel" className={styles.link}>creer un nouveau hotel</Link>
    </nav>
  );
};

export default Navbar;
