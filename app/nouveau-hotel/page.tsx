'use client';
import React, { useState } from 'react';
import styles from "@/styles/nouveau-hotel.module.css";

export default function CreateHotelPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: 'XOF',
    photo: null as File | null,
  });

  const [hotelIdToDelete, setHotelIdToDelete] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'photo' && files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.address);
    data.append('price', formData.price);
    data.append('description', `${formData.email} - ${formData.phone}`);
    if (formData.photo) {
      data.append('image', formData.photo);
    }

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/hotels', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        alert("Hôtel créé avec succès !");
        setFormData({
          name: '',
          address: '',
          email: '',
          phone: '',
          price: '',
          currency: 'XOF',
          photo: null,
        });
      } else {
        const errorData = await res.json();
        alert("Erreur : " + errorData.message);
      }
    } catch (error) {
      alert("Erreur lors de l'envoi du formulaire.");
      console.error(error);
    }
  };

 const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errData = await res.json();
      alert("Erreur : " + errData.message);
      return;
    }

    alert("Hôtel supprimé !");
    // Optionnel : rafraîchir la liste des hôtels ici
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};


  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className={styles.title}>CRÉER UN NOUVEAU HÔTEL</h2>

        <div className={styles.row}>
          <input type="text" name="name" placeholder="Nom de l’hôtel" value={formData.name} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Numéro de téléphone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className={styles.row}>
          <input type="text" name="price" placeholder="Prix par nuit" value={formData.price} onChange={handleChange} required />
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="XOF">F XOF</option>
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
          </select>
        </div>

        <label className={styles.label}>Ajouter une photo</label>
        <div className={styles.uploadBox}>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>

        <button type="submit" className={styles.button}>Enregistrer</button>

        {/* 🗑️ Formulaire de suppression */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h3>Supprimer un hôtel</h3>
          <input
            type="text"
            placeholder="ID de l’hôtel"
            value={hotelIdToDelete}
            onChange={(e) => setHotelIdToDelete(e.target.value)}
            style={{ marginRight: '1rem' }}
          />
          <button
  type="button"
  className={styles.button}
  onClick={() => handleDelete(hotelIdToDelete)}
>
  Supprimer
</button>

        </div>
      </form>
    </div>
  );
}
