'use client';

import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du profil', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Erreur lors de la déconnexion', err);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>RED Product</div>

      <nav className={styles.nav}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/liste-des-hotels">Liste des hôtels</Link>
        {user && <Link href="/profile">Mon profil</Link>}
        {user && <Link href="/liste-des-utilisateurs">utilisateurs</Link>}
      </nav>

      <div className={styles.user}>
        <p>{user ? user.name : 'Invité'}</p>
        <span className={styles.status}>{user ? 'En ligne' : 'Hors ligne'}</span>
        {user && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Se déconnecter
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
