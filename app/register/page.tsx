"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const form = e.currentTarget;
  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password }),
});

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Erreur d'inscription");
      return;
    }

    // Redirection après inscription réussie
    router.push("/login");
  } catch (err) {
    setError("Erreur serveur");
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>RED PRODUCT</div>
        <p className={styles.title}>Inscrivez-vous en tant que Admin</p>

       
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" type="text" placeholder="Nom" className={styles.input} required />
          <input name="email" type="email" placeholder="E-mail" className={styles.input} required />
          
          {/* 👇 Champ mot de passe dynamique */}
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            className={styles.input}
            required
          />

          {/* 👇 Case pour afficher ou masquer */}
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Afficher le mot de passe</label>
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">Accepter les termes et la politique</label>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className={styles.button}>S'inscrire</button>

          <div className={styles.links}>
            Vous avez déjà un compte? <a href="/login">Se connecter</a>
          </div>
        </form>
      </div>
    </div>
  );
}
