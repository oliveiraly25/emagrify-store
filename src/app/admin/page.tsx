"use client";

export default function AdminPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Painel Administrativo
      </h1>

      <p style={{ marginBottom: "20px" }}>
        Bem-vindo ao painel administrativo da Emagrify Store.
      </p>

      <div style={{ lineHeight: 2 }}>
        <p>- Gerenciar usuários</p>
        <p>- Gerenciar produtos</p>
        <p>- Sistema de pontos</p>
        <p>- Gerenciar pedidos</p>
        <p>- Timeline do admin</p>
        <p>- Configurações gerais</p>
      </div>

      <p style={{ marginTop: 20, opacity: 0.6 }}>
        (Este painel será expandido com todas as funções reais.)
      </p>
    </div>
  );
}
