'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import HotelCard from '../../components/HotelCard';

type Hotel = {
  _id: string;
  name: string;
  location: string;
  price: number;
  description?: string;
  image?: string;
};

export default function ListeDesHotels() {
  const [search, setSearch] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/hotels');
        const data = await res.json();
        setHotels(data);
        setFilteredHotels(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des hôtels', err);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const results = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(lowerSearch) ||
        hotel.location.toLowerCase().includes(lowerSearch) ||
        hotel.price.toString().includes(lowerSearch)
    );
    setFilteredHotels(results);
  }, [search, hotels]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onSearchChange={setSearch} />
        <main style={{ padding: '24px', flexGrow: 1 }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
            Liste des Hôtels
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'flex-start',
            }}
          >
            {filteredHotels.map((hotel, index) => (
              <HotelCard
                key={index}
                name={hotel.name}
                address={hotel.location}
                price={hotel.price}
                imageUrl={
                  hotel.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${hotel.image}`
                    : '/images/default.jpg'
                }
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
