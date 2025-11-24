// src/app/admin/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import supabase from "@/lib/supabaseClient";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { Card } from "./components/card";
import { Table } from "./components/table";

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

export default function AdminPage() {
  const [section, setSection] = useState<Section>("dashboard");

  const [users, setUsers] = useState<StoreUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeline, setTimeline] = useState<TimelinePost[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Form states
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
  const [feedback, setFeedback] = useState<string | null>(null);

  // Carrega dados de acordo com a seção
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

  // Criar usuário
  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("store_users").insert({
      name: newUserName,
      email: newUserEmail,
    });

    if (error) setFeedback("Erro ao criar usuário.");
    else {
      setFeedback("Usuário criado com sucesso!");
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

    if (error) setFeedback("Erro ao criar produto.");
    else {
      setFeedback("Produto criado com sucesso!");
      setNewProductName("");
      setNewProductPrice("");
      setNewProductStock("");
      loadProducts();
    }

    setLoading(false);
  }

  // Adicionar pontos para um usuário pelo email
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
      setFeedback("Usuário não encontrado.");
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

    setFeedback("Pontos adicionados com sucesso!");
    setPointsAmount("");
    setPointsUserEmail("");
    setLoading(false);
    loadUsers();
  }

  // Criar post na timeline
  async function handleCreateTimeline(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("admin_timeline").insert({
      title: timelineTitle,
      content: timelineContent,
    });

    if (error) setFeedback("Erro ao postar na timeline.");
    else {
      setFeedback("Post adicionado na timeline!");
      setTimelineTitle("");
      setTimelineContent("");
      loadTimeline();
    }
    setLoading(false);
  }

  // Criar ticket de suporte
  async function handleCreateTicket(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("support_tickets").insert({
      user_email: supportEmail,
      subject: supportSubject,
      message: supportMessage,
    });

    if (error) setFeedback("Erro ao criar ticket de suporte.");
    else {
      setFeedback("Ticket de suporte criado!");
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
    totalRevenue: orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      <Sidebar activeSection={section} onSectionChange={setSection} />

      <div className="flex-1 flex flex-col">
        <Header
          title={sectionConfig[section].title}
          subtitle={sectionConfig[section].subtitle}
        />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
            {feedback && (
              <div className="rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-2 text-sm text-slate-100">
                {feedback}
              </div>
            )}

            {/* DASHBOARD */}
            {section === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card title="Usuários" description="Total de clientes registrados.">
                    <p className="text-2xl font-semibold">
                      {summary.totalUsers}
                    </p>
                  </Card>
                  <Card title="Produtos" description="Itens cadastrados na loja.">
                    <p className="text-2xl font-semibold">
                      {summary.totalProducts}
                    </p>
                  </Card>
                  <Card title="Pedidos" description="Pedidos registrados.">
                    <p className="text-2xl font-semibold">
                      {summary.totalOrders}
                    </p>
                  </Card>
                  <Card title="Faturamento total" description="Soma de todos os pedidos.">
                    <p className="text-2xl font-semibold">
                      R$ {summary.totalRevenue.toFixed(2)}
                    </p>
                  </Card>
                </div>

                <Card
                  title="Bem-vinda ao painel da Emagrify Store"
                  description="Use o menu lateral para gerenciar cada parte da sua loja."
                >
                  <p className="text-sm text-slate-300">
                    Aqui você controla usuários, produtos, pedidos, pontos, timeline interna e suporte —
                    tudo em um único lugar, com o seu painel darkzinho chique. 💅
                  </p>
                </Card>
              </div>
            )}

            {/* USUÁRIOS */}
            {section === "users" && (
              <div className="space-y-4">
                <Card
                  title="Adicionar usuário"
                  description="Crie um novo usuário manualmente."
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
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <button
                      disabled={loading}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-sm font-medium transition-colors"
                    >
                      {loading ? "Salvando..." : "Adicionar usuário"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Lista de usuários"
                  description="Todos os usuários cadastrados na tabela store_users."
                >
                  <div className="mt-3 space-y-2">
                    {users.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-slate-400 text-xs">{u.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-slate-400">Pontos</p>
                          <p className="font-semibold">{u.points}</p>
                        </div>
                      </div>
                    ))}
                    {users.length === 0 && (
                      <p className="text-sm text-slate-400">
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
                >
                  <form
                    onSubmit={handleCreateProduct}
                    className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Preço (ex: 99.90)"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Estoque"
                      value={newProductStock}
                      onChange={(e) => setNewProductStock(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    />
                    <button
                      disabled={loading}
                      className="md:col-span-3 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-sm font-medium transition-colors"
                    >
                      {loading ? "Salvando..." : "Adicionar produto"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Produtos cadastrados"
                  description="Lista de produtos na tabela products."
                >
                  <div className="mt-3 space-y-2">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-slate-400 text-xs">
                            R$ {Number(p.price).toFixed(2)} • Estoque: {p.stock}
                          </p>
                        </div>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 text-slate-200">
                          {p.active ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <p className="text-sm text-slate-400">
                        Nenhum produto cadastrado ainda.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* PEDIDOS */}
            {section === "orders" && (
              <div className="space-y-4">
                <Card
                  title="Pedidos"
                  description="Pedidos registrados na tabela orders."
                >
                  {orders.length === 0 ? (
                    <p className="text-sm text-slate-400 mt-2">
                      Nenhum pedido registrado ainda.
                    </p>
                  ) : (
                    <div className="mt-3">
                      <Table headers={["Pedido", "Total", "Status", "Data"]}>
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-900/70">
                            <td className="px-4 py-2 text-sm text-slate-100">
                              #{o.id.slice(0, 8)}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              R$ {Number(o.total).toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-sm text-slate-200">
                              {o.status}
                            </td>
                            <td className="px-4 py-2 text-xs text-slate-400">
                              {new Date(o.created_at).toLocaleString("pt-BR")}
                            </td>
                          </tr>
                        ))}
                      </Table>
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
                  description="Ajuste manual de pontos para um usuário pelo email."
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
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Quantidade de pontos"
                      value={pointsAmount}
                      onChange={(e) => setPointsAmount(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <button
                      disabled={loading}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-sm font-medium transition-colors"
                    >
                      {loading ? "Salvando..." : "Adicionar pontos"}
                    </button>
                  </form>

                  <p className="mt-3 text-xs text-slate-400">
                    Os pontos são somados no cadastro do usuário e a movimentação é registrada na tabela{" "}
                    <code className="font-mono text-[11px] bg-slate-900 px-1.5 py-0.5 rounded">
                      points_transactions
                    </code>
                    .
                  </p>
                </Card>
              </div>
            )}

            {/* TIMELINE */}
            {section === "timeline" && (
              <div className="space-y-4">
                <Card
                  title="Novo post na timeline"
                  description="Use a timeline para registrar decisões, mudanças e observações internas."
                >
                  <form
                    onSubmit={handleCreateTimeline}
                    className="mt-3 space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Título do post"
                      value={timelineTitle}
                      onChange={(e) => setTimelineTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <textarea
                      placeholder="Conteúdo (opcional)"
                      value={timelineContent}
                      onChange={(e) => setTimelineContent(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none min-h-[90px] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    />
                    <button
                      disabled={loading}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-sm font-medium transition-colors"
                    >
                      {loading ? "Salvando..." : "Postar na timeline"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Histórico da timeline"
                  description="Posts registrados na tabela admin_timeline."
                >
                  <div className="mt-3 space-y-3">
                    {timeline.map((post) => (
                      <div
                        key={post.id}
                        className="border border-slate-800 rounded-lg bg-slate-950 px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm text-slate-50">
                            {post.title}
                          </p>
                          <span className="text-[11px] text-slate-500">
                            {new Date(post.created_at).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        {post.content && (
                          <p className="mt-2 text-sm text-slate-300">
                            {post.content}
                          </p>
                        )}
                      </div>
                    ))}
                    {timeline.length === 0 && (
                      <p className="text-sm text-slate-400">
                        Nenhum post na timeline ainda.
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
                  description="Registre uma solicitação de suporte em nome de um usuário."
                >
                  <form
                    onSubmit={handleCreateTicket}
                    className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <input
                      type="email"
                      placeholder="Email do usuário"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Assunto"
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <textarea
                      placeholder="Mensagem"
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      className="md:col-span-3 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm outline-none min-h-[90px] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                      required
                    />
                    <button
                      disabled={loading}
                      className="md:col-span-3 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-sm font-medium transition-colors"
                    >
                      {loading ? "Salvando..." : "Criar ticket"}
                    </button>
                  </form>
                </Card>

                <Card
                  title="Tickets de suporte"
                  description="Lista dos tickets na tabela support_tickets."
                >
                  <div className="mt-3 space-y-3">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="border border-slate-800 rounded-lg bg-slate-950 px-4 py-3 text-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-medium text-slate-50">
                              {t.subject}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {t.user_email}
                            </p>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {new Date(t.created_at).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                          Status: {t.status}
                        </p>
                      </div>
                    ))}
                    {tickets.length === 0 && (
                      <p className="text-sm text-slate-400">
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
                  description="Área reservada para ajustes futuros do painel admin da Emagrify Store."
                >
                  <p className="text-sm text-slate-300">
                    Aqui você poderá configurar temas, permissões e preferências
                    avançadas do painel. Por enquanto, esta seção é apenas um
                    placeholder, mas já deixa o layout pronto para crescer junto
                    com a sua lojinha. 💚
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
