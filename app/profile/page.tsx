'use client';

import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          setMessage('Non connecté');
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur:', err);
        setMessage('Erreur lors de la récupération du profil');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        setMessage('Déconnecté');
      } else {
        setMessage('Erreur lors de la déconnexion');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur réseau');
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Page Profil</h1>
      {user ? (
        <>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <button onClick={handleLogout}>Se déconnecter</button>
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
