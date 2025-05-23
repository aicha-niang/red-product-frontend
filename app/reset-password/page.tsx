"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Lien de réinitialisation invalide.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur lors de la réinitialisation.");
        return;
      }

      setMessage("Mot de passe mis à jour avec succès.");
    } catch (err) {
      setError("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 8, marginBottom: 12, width: "100%" }}
        />
        <button type="submit" style={{ padding: 10 }}>Valider</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
