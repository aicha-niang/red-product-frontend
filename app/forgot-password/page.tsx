"use client";

import { useState } from "react";
import styles from "@/styles/login.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur lors de la requête");
      } else {
        setMessage("Un lien de réinitialisation a été envoyé à votre e-mail.");
      }
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>RED PRODUCT</div>
        <p className={styles.title}>Mot de passe oublié</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Entrez votre e-mail"
            className={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Réinitialiser
          </button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={styles.links}>
            Vous souvenez-vous de votre mot de passe ?{" "}
            <a href="/login">Se connecter</a>
          </div>
        </form>
      </div>
    </div>
  );
}
