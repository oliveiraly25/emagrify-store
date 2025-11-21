"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    const resposta = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await resposta.json();

    if (data.ok) {
      window.location.href = "/admin";
    } else {
      setErro("Email ou senha incorretos");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Entrar</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        {erro && (
          <p style={{ color: "red", marginBottom: 10 }}>{erro}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background:
              "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
