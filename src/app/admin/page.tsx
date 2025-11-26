// src/app/admin/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import supabase from "@/lib/supabaseClient";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { Card } from "./components/card";

type Section =
  | "dashboard"
  | "users"
  | "products"
  | "orders"
  | "points"
  | "timeline"
  | "support"
  | "settings";

type StoreUser = {
  id: string;
  name: string;
  email: string;
  points: number;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  active: boolean;
};

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

type TimelinePost = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

type Ticket = {
  id: string;
  user_email: string;
  subject: string;
  status: string;
  created_at: string;
};

const sectionConfig: Record<Section, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Visão geral da Emagrify Store.",
  },
  users: {
    title: "Usuários",
    subtitle: "Gerencie os clientes cadastrados na loja.",
  },
  products: {
    title: "Produtos",
    subtitle: "Cadastre e acompanhe o catálogo de produtos.",
  },
  orders: {
    title: "Pedidos",
    subtitle: "Histórico de pedidos realizados na loja.",
  },
  points: {
    title: "Sistema de pontos",
    subtitle: "Controle manual do saldo de pontos dos usuários.",
  },
  timeline: {
    title: "Timeline do admin",
    subtitle: "Registre notas internas e atualizações.",
  },
  support: {
    title: "Suporte",
    subtitle: "Tickets de suporte dos usuários.",
  },
  settings: {
    title: "Configurações",
    subtitle: "Ajustes gerais do painel administrativo.",
  },
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

export default function AdminPage() {
  const [section, setSection] = useState<Section>("dashboard");

  const [users, setUsers] = useState<StoreUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeline, setTimeline] = useState<TimelinePost[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("");

  const [pointsUserEmail, setPointsUserEmail] = useState("");
  const [pointsAmount, setPointsAmount] = useState("");

  const [timelineTitle, setTimelineTitle] = useState("");
  const [timelineContent, setTimelineContent] = useState("");

  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  useEffect(() => {
    setFeedback(null);

    if (section === "dashboard") {
      loadUsers();
      loadProducts();
      loadOrders();
    }
    if (section === "users") loadUsers();
    if (section === "products") loadProducts();
    if (section === "orders") loadOrders();
    if (section === "timeline") loadTimeline();
    if (section === "support") loadTickets();
  }, [section]);

  // some feedback after alguns segundos
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function loadUsers() {
    const { data, error } = await supabase
      .from("store_users")
      .select("id, name, email, points")
      .order("created_at", { ascending: false });

    if (!error && data) setUsers(data as StoreUser[]);
  }

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setProducts(data as Product[]);
  }

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("id, total, status, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data as Order[]);
  }

  async function loadTimeline() {
    const { data, error } = await supabase
      .from("admin_timeline")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setTimeline(data as TimelinePost[]);
  }

  async function loadTickets() {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setTickets(data as Ticket[]);
  }

  // helpers de estilo
  const inputBase =
    "px-3 py-2 rounded-lg border border-[#D9D9D9] text-sm outline-none " +
    "bg-white text-black placeholder-gray-500 " +
    "focus:border-[#406945] focus:ring-1 focus:ring-[#406945]/40 transition";

  const buttonBase =
    "inline-flex items-center justify-center px-3 py-2 rounded-lg border " +
    "border-black bg-white text-black text-sm font-medium " +
    "hover:bg-black hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed";

  // Criar usuário
  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("store_users").insert({
      name: newUserName,
      email: newUserEmail,
    });

    if (error) {
      setFeedback({
        type: "error",
        message: "Erro ao criar usuário.",
      });
    } else {
      setFeedback({
        type: "success",
        message: "Usuário criado com sucesso!",
      });
      setNewUserName("");
      setNewUserEmail("");
      loadUsers();
    }

    setLoading(false);
  }

  // Criar produto
  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const priceNumber = Number(newProductPrice.replace(",", "."));
    const stockNumber = Number(newProductStock || "0");

    const { error } = await supabase.from("products").insert({
      name: newProductName,
      price: priceNumber,
      stock: stockNumber,
    });

    if (error) {
      setFeedback({
        type: "error",
        message: "Erro ao criar produto.",
      });
    } else {
      setFeedback({
        type: "success",
        message: "Produto criado com sucesso!",
      });
      setNewProductName("");
      setNewProductPrice("");
      setNewProductStock("");
      loadProducts();
    }

    setLoading(false);
  }

  // Adicionar pontos
  async function handleAddPoints(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const pts = Number(pointsAmount);

    const { data: userFound, error: userError } = await supabase
      .from("store_users")
      .select("id, points")
      .eq("email", pointsUserEmail)
      .maybeSingle();

    if (userError || !userFound) {
      setFeedback({
        type: "error",
        message: "Usuário não encontrado.",
      });
      setLoading(false);
      return;
    }

    const userId = (userFound as any).id;
    const currentPoints = (userFound as any).points || 0;

    await supabase.from("points_transactions").insert({
      user_id: userId,
      points: pts,
      reason: "Ajuste manual pelo admin",
    });

    await supabase
      .from("store_users")
      .update({ points: currentPoints + pts })
      .eq("id", userId);

    setFeedback({
      type: "success",
      message: "Pontos adicionados com sucesso!",
    });
    setPointsAmount("");
    setPointsUserEmail("");
    setLoading(false);
    loadUsers();
  }

  // Timeline
  async function handleCreateTimeline(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("admin_timeline").insert({
      title: timelineTitle,
      content: timelineContent,
    });

    if (error) {
      setFeedback({
        type: "error",
        message: "Erro ao postar na timeline.",
      });
    } else {
      setFeedback({
        type: "success",
        message: "Post adicionado!",
      });
      setTimelineTitle("");
      setTimelineContent("");
      loadTimeline();
    }
    setLoading(false);
  }

  // Suporte
  async function handleCreateTicket(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("support_tickets").insert({
      user_email: supportEmail,
      subject: supportSubject,
      message: supportMessage,
    });

    if (error) {
      setFeedback({
        type: "error",
        message: "Erro ao criar ticket.",
      });
    } else {
      setFeedback({
        type: "success",
        message: "Ticket criado!",
      });
      setSupportEmail("");
      setSupportSubject("");
      setSupportMessage("");
      loadTickets();
    }
    setLoading(false);
  }

  const summary = {
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    ),
  };

  return (
    <div className="min-h-screen flex bg-[#F7F7F7] text-black">
      <Sidebar activeSection={section} onSectionChange={setSection} />

      <div className="flex-1 flex flex-col">
        <Header
          title={sectionConfig[section].title}
          subtitle={sectionConfig[section].subtitle}
        />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
            {feedback && (
              <div
                className={`rounded-xl px-4 py-3 text-sm border ${
                  feedback.type === "success"
                    ? "bg-[#E9F5EE] border-[#B6DEC8] text-[#234231]"
                    : "bg-[#FCE8E8] border-[#F5B8B8] text-[#7B2525]"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* DASHBOARD */}
            {section === "dashboard" && (
              <div className="space-y-6">
                {/* Cards principais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card
                    title="Usuários"
                    description="Total de clientes registrados."
                    className="bg-white border border-[#E5E5E5]"
                  >
                    <p className="text-3xl font-semibold">
                      {summary.totalUsers}
                    </p>
                  </Card>

                  <Card
                    title="Produtos"
                    description="Itens cadastrados na loja."
                    className="bg-white border border-[#E5E5E5]"
                  >
                    <p className="text-3xl font-semibold">
                      {summary.totalProducts}
                    </p>
                  </Card>

                  <Card
                    title="Pedidos"
                    description="Pedidos registrados."
                    className="bg-white border border-[#E5E5E5]"
                  >
                    <p className="text-3xl font-semibold">
                      {summary.totalOrders}
                    </p>
                  </Card>

                  <Card
                    title="Faturamento total"
                    description="Soma de todos os pedidos."
                    className="bg-white border border-[#E5E5E5]"
                  >
                    <p className="text-2xl font-semibold text-[#406945]">
                      R$ {summary.totalRevenue.toFixed(2)}
                    </p>
                  </Card>
                </div>

                {/* Gráfico + texto */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card
                    title="Atividade recente"
                    description="Exemplo visual ilustrativo."
                    className="lg:col-span-2 bg-white border border-[#E5E5E5]"
                  >
                    <div className="mt-3 flex items-end gap-2 h-32">
                      {[
                        { label: "Seg", value: 40 },
                        { label: "Ter", value: 70 },
                        { label: "Qua", value: 55 },
                        { label: "Qui", value: 90 },
                        { label: "Sex", value: 65 },
                        { label: "Sáb", value: 30 },
                        { label: "Dom", value: 45 },
                      ].map((bar) => (
                        <div
                          key={bar.label}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <div className="relative w-full rounded-full bg-[#ECECEC] h-24 flex items-end overflow-hidden">
                            <div
                              className="w-full rounded-full bg-gradient-to-t from-[#406945] to-[#78b27a]"
                              style={{ height: `${bar.value}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-600">
                            {bar.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card
                    title="Bem-vinda ao painel da Emagrify Store"
                    description="Use o menu lateral para navegar."
                    className="bg-white border border-[#E5E5E5]"
                  >
                    <p className="text-sm text-gray-700">
                      Aqui você controla tudo da sua loja em um único lugar. 💅
                    </p>
                  </Card>
                </div>
              </div>
            )}

            {/* USUÁRIOS */}
            {section === "users" && (
              <div className="space-y-4">
                <Card
                  title="Adicionar usuário"
                  description="Crie um novo usuário manualmente."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <form
                    onSubmit={handleCreateUser}
                    className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <input
                      type="text"
                      placeholder="Nome"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={buttonBase + " w-full"}
                    >
                      {loading ? "Salvando..." : "Adicionar usuário"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Lista de usuários"
                  description="Todos os usuários cadastrados."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <div className="mt-3 space-y-2">
                    {users.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm shadow-sm"
                      >
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-gray-600">{u.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-gray-500">Pontos</p>
                          <p className="font-semibold">{u.points}</p>
                        </div>
                      </div>
                    ))}
                    {users.length === 0 && (
                      <p className="text-sm text-gray-600">
                        Nenhum usuário cadastrado ainda.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* PRODUTOS */}
            {section === "products" && (
              <div className="space-y-4">
                <Card
                  title="Cadastrar produto"
                  description="Adicione um novo produto ao catálogo."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <form
                    onSubmit={handleCreateProduct}
                    className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3"
                  >
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      className={inputBase + " md:col-span-2"}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Preço (ex: 99.90)"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Estoque"
                      value={newProductStock}
                      onChange={(e) => setNewProductStock(e.target.value)}
                      className={inputBase}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={buttonBase + " md:col-span-4 w-full"}
                    >
                      {loading ? "Salvando..." : "Adicionar produto"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Produtos cadastrados"
                  description="Lista de produtos na tabela."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <div className="mt-3 space-y-2">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm shadow-sm"
                      >
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-gray-600">
                            R$ {Number(p.price).toFixed(2)} • Estoque:{" "}
                            {p.stock}
                          </p>
                        </div>
                        <span
                          className={`text-[11px] px-2 py-1 rounded-full ${
                            p.active
                              ? "bg-[#E9F5EE] text-[#234231]"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {p.active ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <p className="text-sm text-gray-600">
                        Nenhum produto cadastrado ainda.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* PEDIDOS – estilo cartão */}
            {section === "orders" && (
              <div className="space-y-4">
                <Card
                  title="Pedidos"
                  description="Pedidos registrados."
                  className="bg-white border border-[#E5E5E5]"
                >
                  {orders.length === 0 ? (
                    <p className="text-sm text-gray-600 mt-2">
                      Nenhum pedido registrado ainda.
                    </p>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {orders.map((o) => (
                        <div
                          key={o.id}
                          className="bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm shadow-sm flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">
                              Pedido #{o.id.slice(0, 8)}
                            </p>
                            <span className="text-xs text-gray-500">
                              {new Date(o.created_at).toLocaleString("pt-BR")}
                            </span>
                          </div>
                          <p className="text-sm">
                            Total:{" "}
                            <span className="font-semibold text-[#406945]">
                              R$ {Number(o.total).toFixed(2)}
                            </span>
                          </p>
                          <p className="text-xs text-gray-600">
                            Status: <span>{o.status}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* PONTOS */}
            {section === "points" && (
              <div className="space-y-4">
                <Card
                  title="Adicionar pontos"
                  description="Ajuste manual de pontos para um usuário."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <form
                    onSubmit={handleAddPoints}
                    className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <input
                      type="email"
                      placeholder="Email do usuário"
                      value={pointsUserEmail}
                      onChange={(e) => setPointsUserEmail(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Quantidade"
                      value={pointsAmount}
                      onChange={(e) => setPointsAmount(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={buttonBase + " w-full"}
                    >
                      {loading ? "Salvando..." : "Adicionar pontos"}
                    </button>
                  </form>
                </Card>
              </div>
            )}

            {/* TIMELINE */}
            {section === "timeline" && (
              <div className="space-y-4">
                <Card
                  title="Novo post na timeline"
                  description="Registre observações internas."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <form
                    onSubmit={handleCreateTimeline}
                    className="mt-3 space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Título"
                      value={timelineTitle}
                      onChange={(e) => setTimelineTitle(e.target.value)}
                      className={inputBase + " w-full"}
                      required
                    />
                    <textarea
                      placeholder="Conteúdo (opcional)"
                      value={timelineContent}
                      onChange={(e) => setTimelineContent(e.target.value)}
                      className={inputBase + " w-full min-h-[90px] resize-vertical"}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={buttonBase}
                    >
                      {loading ? "Salvando..." : "Postar"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Histórico da timeline"
                  description="Posts registrados."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <div className="mt-3 space-y-3">
                    {timeline.map((post) => (
                      <div
                        key={post.id}
                        className="border border-[#E5E5E5] rounded-lg bg-white px-4 py-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{post.title}</p>
                          <span className="text-[11px] text-gray-500">
                            {new Date(post.created_at).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        {post.content && (
                          <p className="mt-2 text-sm text-gray-700">
                            {post.content}
                          </p>
                        )}
                      </div>
                    ))}
                    {timeline.length === 0 && (
                      <p className="text-sm text-gray-600">
                        Nenhum post ainda.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* SUPORTE */}
            {section === "support" && (
              <div className="space-y-4">
                <Card
                  title="Criar ticket manualmente"
                  description="Registre uma solicitação de suporte."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <form
                    onSubmit={handleCreateTicket}
                    className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Assunto"
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      className={inputBase}
                      required
                    />
                    <textarea
                      placeholder="Mensagem"
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      className={
                        inputBase + " md:col-span-3 min-h-[90px] resize-vertical"
                      }
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={buttonBase + " md:col-span-3 w-full"}
                    >
                      {loading ? "Salvando..." : "Criar ticket"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Tickets de suporte"
                  description="Lista dos tickets registrados."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <div className="mt-3 space-y-3">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="border border-[#E5E5E5] rounded-lg bg-white px-4 py-3 text-sm shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{t.subject}</p>
                            <p className="text-[11px] text-gray-600">
                              {t.user_email}
                            </p>
                          </div>
                          <span className="text-[11px] text-gray-500">
                            {new Date(t.created_at).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">
                          Status: {t.status}
                        </p>
                      </div>
                    ))}
                    {tickets.length === 0 && (
                      <p className="text-sm text-gray-600">
                        Nenhum ticket registrado ainda.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* CONFIGURAÇÕES */}
            {section === "settings" && (
              <div className="space-y-4">
                <Card
                  title="Configurações do painel"
                  description="Área reservada para ajustes futuros."
                  className="bg-white border border-[#E5E5E5]"
                >
                  <p className="text-sm text-gray-700">
                    Aqui você poderá configurar preferências avançadas do
                    painel. Ainda em desenvolvimento. 💚
                  </p>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
