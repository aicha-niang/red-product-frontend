"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Erreur lors de la connexion");
        return;
      }

      const data = await res.json();

      // ✅ Stocker le token dans un cookie pour que le middleware puisse le lire
      document.cookie = `token=${data.token}; path=/;`;

      router.push("/dashboard");
    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>RED PRODUCT</div>
        <p className={styles.title}>Connectez-vous</p>

        <form onSubmit={handleSubmit} className={styles.form}>
  <input name="email" type="email" placeholder="E-mail" className={styles.input} required />
  <input name="password" type="password" placeholder="Mot de passe" className={styles.input} required />

  {/* ✅ Lien vers la page de réinitialisation */}
  <div style={{ textAlign: "right", marginTop: "-10px", marginBottom: "12px" }}>
    <a href="/forgot-password" className={styles.forgotLink}>Mot de passe oublié ?</a>
  </div>

  {error && <p style={{ color: "red" }}>{error}</p>}

  <button type="submit" className={styles.button}>Se connecter</button>

  <div className={styles.links}>
    Vous n'avez pas de compte ? <a href="/register">S'inscrire</a>
  </div>
</form>

      </div>
    </div>
  );
}
