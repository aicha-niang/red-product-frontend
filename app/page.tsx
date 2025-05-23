'use client';

import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Hero />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Nos Hôtels</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          <ProductCard title="Hôtel Renaissance" description="Un hôtel moderne au cœur de la ville." />
          <ProductCard title="Hôtel Soleil" description="Détendez-vous au bord de la mer avec tout confort." />
          <ProductCard title="Hôtel Atlas" description="Luxe, calme et nature au rendez-vous." />
        </div>
      </section>
    </div>
  );
}
