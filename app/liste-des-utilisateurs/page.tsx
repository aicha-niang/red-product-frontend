'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function ListeDesUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`, {
          credentials: 'include', // important si l'API est protégée par token via cookie
        });

        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Erreur lors du chargement des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Liste des utilisateurs inscrits</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <p><strong>Total :</strong> {users.length} utilisateur(s)</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((user) => (
              <li key={user._id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '10px',
                      fontWeight: 'bold',
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <strong>{user.name}</strong> — <span style={{ color: '#777' }}>{user.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
