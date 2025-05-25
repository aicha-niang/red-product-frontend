"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ autorise les cookies cross-origin
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Erreur lors de la connexion");
        return;
      }

      router.push("/dashboard"); // ✅ redirection après succès
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
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            className={styles.input}
            required
          />

          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                color: "#666"
              }}
            >
              {showPassword ? "Cacher" : "Afficher"}
            </button>
          </div>

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
