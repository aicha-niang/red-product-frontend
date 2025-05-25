'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: 'include', // 🔐 pour envoyer les cookies (token)
        });

        if (!res.ok) {
          router.push('/login'); // 🚫 Redirige si pas connecté
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    // Supprime le cookie JWT
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Utilisateur non connecté.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profil</h1>

      {user.avatar ? (
        <img
          src={user.avatar}
          alt="Avatar"
          style={{ width: '120px', height: '120px', borderRadius: '50%' }}
        />
      ) : (
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}

      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>ID :</strong> {user._id}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#d00',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}
