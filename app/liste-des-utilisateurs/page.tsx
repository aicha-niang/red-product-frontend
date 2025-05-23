'use client';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

export default function ListeDesUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/users');
        const data = await res.json();
        setUsers(data.users);
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
          <p><strong>Total :</strong> {users.length} utilisateurs</p>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                👤 {user.name} — <em>{user.email}</em>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
