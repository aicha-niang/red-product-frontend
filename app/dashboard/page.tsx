'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);

  // 🔁 Charger le nombre d’utilisateurs depuis l’API
 useEffect(() => {
  const fetchStats = async () => {
    try {
      const [userRes, hotelRes] = await Promise.all([
        fetch('http://localhost:5000/api/auth/users/count'),
        fetch('http://localhost:5000/api/hotels/count'),
      ]);

      const userData = await userRes.json();
      const hotelData = await hotelRes.json();

      setUserCount(userData.count);
      setHotelCount(hotelData.count);
    } catch (err) {
      console.error('Erreur lors de la récupération des statistiques', err);
    }
  };

  fetchStats();
}, []);


  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onSearchChange={setSearch} />

        <main style={{ padding: '24px', flexGrow: 1 }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Bienvenue sur <span style={{ color: '#e91e63' }}>RED Product</span>
            </h2>
            <p style={{ marginTop: '8px', color: '#666' }}>
              Voici un aperçu rapide de vos statistiques actuelles.
            </p>
          </section>

          {search && (
            <p style={{ fontStyle: 'italic', color: '#888' }}>
              Résultat pour: "<strong>{search}</strong>"
            </p>
          )}

          <section
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'space-between',
              marginTop: '32px',
            }}
          >
            <StatCard title="Formulaires" value={125} color="#e91e63" icon="📝" link="/formulaires" />
            <StatCard title="E-mails" value={25} color="#2196f3" icon="📧" link="/emails" />
            <StatCard title="Messages" value={40} color="#4caf50" icon="💬" link="/messages" />
            {/* 👇 Valeur dynamique ici */}
            <StatCard
  title="Utilisateurs"
  value={userCount || 0}
  color="#ff9800"
  icon="👥"
  link="/liste-des-utilisateurs"
/>

           <StatCard
  title="Hôtels"
  value={hotelCount || 0}
  color="#9c27b0"
  icon="🏨"
  link="/hotels"
/>
            <StatCard title="Entités" value={2} color="#009688" icon="🏢" link="/entites" />
          </section>
        </main>
      </div>
    </div>
  );
}
